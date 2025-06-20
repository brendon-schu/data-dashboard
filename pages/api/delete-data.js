import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
	if (req.method !== 'POST') return res.status(405).end();

	const { id } = JSON.parse(req.body); // <-- use req.body for POST

	const client = new Client({
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		port: process.env.DB_PORT || 5432
	});

	await client.connect();

	try {
		const result = await client.query('SELECT * FROM datasets WHERE id = $1', [id]);
		if (result.rows.length === 0) return res.status(404).json({ error: 'Dataset not found' });

		const dataset = result.rows[0];
		const sourceTypes = dataset.source_type;
		const sourcePaths = dataset.source_path;

		for (let i = 0; i < sourceTypes.length; i++) {
			const type = sourceTypes[i];
			const filePath = sourcePaths[i];

			if (type === 'csv' || type === 'json') {
				const fullPath = path.join(process.cwd(), 'datafiles', filePath);
				if (fs.existsSync(fullPath)) {
					fs.unlinkSync(fullPath);
				}
			}

			if (type === 'sql') {
				// Table name must be embedded safely — no placeholders
				await client.query(`DROP TABLE IF EXISTS "${filePath}"`);
			}
		}

		// Finally, remove the dataset row itself
		await client.query('DELETE FROM datasets WHERE id = $1', [id]);

		res.status(200).json({ success: true });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Deletion failed', detail: err.message });
	} finally {
		await client.end();
	}
}

