import { Client } from 'pg';

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const { id, name, notes } = req.body;

	if (!id || !name) {
		return res.status(400).json({ error: 'Missing required fields' });
	}

	const client = new Client({
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		port: process.env.DB_PORT || 5432
	});

	try {
		await client.connect();
		await client.query( 'UPDATE datasets SET name = $1, notes = $2 WHERE id = $3',
			[name, notes || '', id]
		);
		res.status(200).json({ success: true });
	} catch (err) {
		console.error('Error updating dataset:', err);
		res.status(500).json({ error: 'Database error' });
	} finally {
		await client.end();
	}
}

