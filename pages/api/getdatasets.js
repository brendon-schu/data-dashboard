// pages/api/getuser.js
import { Client } from 'pg';
import path from 'path';
import Papa from 'papaparse';
import fs from 'fs';

export default async function handler(req, res) {
	if (req.method !== 'GET') return res.status(405).end();

	const client = new Client({
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		port: process.env.DB_PORT || 5432
	});

	try {
		await client.connect();
		const result = await client.query("SELECT * FROM datasets ORDER BY id;");
		if (result.rows.length === 0) {
			return res.status(404).json({ error: 'User not found' });
		}
        let rows = result.rows;
        for (let i=0; i<rows.length; i++) {
            if (rows[i].source_type.includes("sql")) {
                let point = rows[i].source_type.indexOf("sql");
                let table_name = rows[i].source_path[point];
                const check = await client.query( 
                    `SELECT to_regclass($1) AS exists`, [table_name]
                );
                if (check.rows[0].exists) {
                    const r2 = await client.query("SELECT count(*) FROM "+table_name+";");
                    rows[i].row_count = r2.rows[0].count;
                } else {
                    rows[i].row_count = "NO TABLE";
                }
            }
			if (rows[i].source_type.includes("csv")) {
				const point = rows[i].source_type.indexOf("csv");
				const filename = rows[i].source_path[point];
				const filePath = path.join(process.cwd(), 'datafiles', filename);
				try {
					const content = fs.readFileSync(filePath, 'utf8');
					const parsed = Papa.parse(content, { header: true, skipEmptyLines: true });
					rows[i].row_count = parsed.data.length;
				} catch (err) {
					rows[i].row_count = "ERROR";
				}
			}
			if (rows[i].source_type.includes("json")) {
				const point = rows[i].source_type.indexOf("json");
				const filename = rows[i].source_path[point];
				const filePath = path.join(process.cwd(), 'datafiles', filename);
				try {
					const content = fs.readFileSync(filePath, 'utf8');
					const data = JSON.parse(content);
					rows[i].row_count = Array.isArray(data) ? data.length : "INVALID FORMAT";
				} catch (err) {
					rows[i].row_count = "ERROR";
				}
			}

        }
		await client.end();
		res.status(200).json(rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to fetch user' });
	}

}

