import path from 'path';
import fs from 'fs';
import Papa from 'papaparse';
import { Client } from 'pg';

export default async function handler(req, res) {

    const { id,num } = req.query;

    if (id == 0 && num == 0) {
		return JSON.stringify({data:"none"});
    }

    const client = new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 5432
    });

    await client.connect();
    const result = await client.query("SELECT * FROM datasets WHERE id = $1;",[id]);
    const dataset = result.rows[0];
    const name = dataset.source_path[num];

	//console.log(name);
    if (name.endsWith('.csv') || name.endsWith('.json')) {

        await client.end();

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

        try {
            const result = await client.query(`SELECT * FROM ${name}`);
            await client.end();
            return res.status(200).json(result.rows);
        } catch (err) {
            await client.end();
            return res.status(500).json({ error: 'SQL load failed', detail: err.message });
        }

    }
}

