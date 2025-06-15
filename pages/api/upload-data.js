import { Client } from 'pg';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // don't auto-parse, let formidable handle it
  },
};

export default async function handler(req, res) {

	const form = new IncomingForm({
		uploadDir: './datafiles',
		keepExtensions: true,
	});

	if (req.method !== 'POST') return res.status(405).end();

	const clean = (val) => (val === undefined || val === null || val === '') ? null : val;

	const client = new Client({
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		port: process.env.DB_PORT || 5432
	});

	form.parse(req, async (err, fields, files) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ error: 'File upload failed' });
		}
		try {
			const name = clean(fields.name?.[0]);
			const notes = clean(fields.notes?.[0]);
			const file = files.file[0];
			const rawPath = file.filepath;
			if (!rawPath) {
				return res.status(400).json({ error: 'File path missing' });
			}
			const ext = path.extname(file.originalFilename).replace('.', '').toLowerCase();
			await client.connect();
			const insertResult = await client.query(
				`INSERT INTO datasets (name, notes, source_type, source_path)
				 VALUES ($1, $2, $3, $4) RETURNING id`,
				[clean(name), clean(notes), [ext], ['placeholder']]
			);
			const newId = insertResult.rows[0].id;
			const finalFilename = `table_${newId}.${ext}`;
			const finalPath = path.join(process.cwd(), 'datafiles', finalFilename);
			fs.renameSync(file.filepath, finalPath);
			await client.query(
				`UPDATE datasets SET source_path = $1 WHERE id = $2`,
				[[finalFilename], newId]
			);
			await client.end();
			res.status(200).json({ success: true });
		} catch (dbErr) {
			console.error(dbErr);
			res.status(500).json({ error: 'Database insert failed' });
		}
	});
}

