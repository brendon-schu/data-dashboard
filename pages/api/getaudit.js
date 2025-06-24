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
		const result = await client.query(`SELECT * FROM activity_log ORDER BY timestamp DESC LIMIT 10;`);
		await client.end();
		if (result.rows.length === 0) {
			return res.status(404).json({ error: 'Data not found' });
		}
		res.status(200).json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to fetch user' });
	}
}

