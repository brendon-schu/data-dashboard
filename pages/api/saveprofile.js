import { Client } from 'pg';

export default async function handler(req, res) {

	if (req.method !== 'POST') return res.status(405).end();

	const { name, email, job_title, city, country, latitude, longitude } = req.body;

	const clean = (val) => (val === undefined || val === null || val === '') ? null : val;

	const client = new Client({
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		port: process.env.DB_PORT || 5432
	});

	try {
		await client.connect();
		await client.query(
			`UPDATE users SET 
			name = $1, email = $2, job_title = $3, city = $4,
			country = $5, latitude = $6, longitude = $7
			WHERE id = 1`,
			[clean(name), clean(email), clean(job_title), clean(city), clean(country), clean(latitude), clean(longitude)]
		);
        await client.end();
		res.status(200).json({ success: true });
	} catch (err) {
		console.error(err);
		res.status(500).json({ success: false, error: 'DB update failed' });
	}

}

