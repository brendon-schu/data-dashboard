
import { Client } from 'pg';

export default async function handler(req, res) {

    if (req.method !== 'POST') return res.status(405).end();

    const { user_id, action } = req.body;

    if (!action) return res.status(400).json({ error: 'Action is required' });

	const client = new Client({
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		port: process.env.DB_PORT || 5432
	});

    try {
        await client.connect();
		const result = await client.query(`SELECT username FROM users WHERE id = 1`);
        const username = result.rows[0].username;
        await client.query(
            `INSERT INTO activity_log (user_id, username, action) VALUES ($1, $2, $3)`,
            [user_id, username, action]
        );
        await client.end();
        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Audit insert failed', detail: err.message });
    }
}

