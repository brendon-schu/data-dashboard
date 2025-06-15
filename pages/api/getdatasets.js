// pages/api/getuser.js
import { Client } from 'pg';

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
		const result = await client.query("SELECT * FROM datasets;");
		await client.end();
		if (result.rows.length === 0) {
			return res.status(404).json({ error: 'User not found' });
		}
        let rows = result.rows;
        for (let i=0; i<rows.length; i++) {
            if (rows[i].source_type.includes("sql")) {
                let point = rows[i].source_type.indexOf("sql");
                let table_name = rows[i].source_path[point];
                await client.connect();
                const r2 = await client.query("SELECT * FROM "+table_name+";");
                await client.end();
                rows[i].row_count = r2.rows[0].count;
            }
        }

		res.status(200).json(rows);

	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to fetch user' });
	}

}

