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

		const result = await client.query(
			`SELECT * FROM user_settings WHERE user_id = 1`
		);

		await client.end();

		if (result.rows.length === 0) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.status(200).json(result.rows[0]);

	} catch (err) {

		console.error(err);
		res.status(500).json({ error: 'Failed to fetch user' });

	}

}

