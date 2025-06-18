import path from 'path';
import fs from 'fs';
import Papa from 'papaparse';
import { Client } from 'pg';

export default async function handler(req, res) {
    const { name } = req.query;

	console.log(name);
    if (name.endsWith('.csv') || name.endsWith('.json')) {
        const filePath = path.join(process.cwd(), 'datafiles', name);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found' });
        }

        const ext = path.extname(name).toLowerCase();
        const file = fs.readFileSync(filePath, 'utf8');

        if (ext === '.json') {
            try {
                const data = JSON.parse(file);
                return res.status(200).json(data);
            } catch (err) {
                return res.status(500).json({ error: 'Invalid JSON format' });
            }
        }

        Papa.parse(file, {
            header: true,
            complete: (results) => {
                res.status(200).json(results.data);
            },
            error: (err) => {
                res.status(500).json({ error: err.message });
            },
        });

    } else {

        // where's the jelly for my peanut butter?
        // SQL table fallback
        const client = new Client({
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT || 5432
        });

        try {
            await client.connect();
            const result = await client.query(`SELECT * FROM ${name}`);
            await client.end();
            return res.status(200).json(result.rows);
        } catch (err) {
            return res.status(500).json({ error: 'SQL load failed', detail: err.message });
        }

    }
}

