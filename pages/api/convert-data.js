import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export default async function handler(req, res) {

	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const { id, type } = req.body;
	if (!id || !type) return res.status(400).json({ error: 'Missing id or type' });

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
		const currentTypes = dataset.source_type;
		const filename = dataset.source_path[currentTypes.indexOf(type)] ?? dataset.source_path[0];
		const baseName = path.parse(filename).name;
		const fileDir = path.join(process.cwd(), 'datafiles');

		let rawData;

		// --- LOAD SOURCE DATA ---
		if (currentTypes.includes('csv')) {
			const csvPath = path.join(fileDir, filename);
			const content = fs.readFileSync(csvPath, 'utf8');
			rawData = Papa.parse(content, { header: true, skipEmptyLines: true }).data;
		} else if (currentTypes.includes('json')) {
			const jsonPath = path.join(fileDir, filename);
			rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
		} else if (currentTypes.includes('sql')) {
			rawData = (await client.query(`SELECT * FROM ${filename}`)).rows;
		} else {
			throw new Error('Unsupported source type');
		}

		// --- PERFORM CONVERSION ---
		if (type === 'csv') {
			const csv = Papa.unparse(rawData);
			const newPath = `${baseName}.csv`;
			fs.writeFileSync(path.join(fileDir, newPath), csv, 'utf8');
			currentTypes.push('csv');
			dataset.source_path.push(newPath);
		} else if (type === 'json') {
			const json = JSON.stringify(rawData, null, 2);
			const newPath = `${baseName}.json`;
			fs.writeFileSync(path.join(fileDir, newPath), json, 'utf8');
			currentTypes.push('json');
			dataset.source_path.push(newPath);
		} else if (type === 'sql') {
			const columns = Object.keys(rawData[0]);
			const tableName = baseName.replace(/[^a-zA-Z0-9_]/g, '_');
            const createQuery = `CREATE TABLE IF NOT EXISTS "${tableName}" (${columns.map(c => `"${c}" TEXT`).join(', ')});`;
			await client.query(createQuery);
			for (const row of rawData) {
				const values = columns.map(col => row[col]);
				const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
                await client.query( `INSERT INTO "${tableName}" (${columns.map(c => `"${c}"`).join(', ')}) VALUES (${placeholders})`, values);
			}
			currentTypes.push('sql');
			dataset.source_path.push(tableName);
		} else {
			throw new Error('Invalid target type');
		}

		// --- UPDATE DB ---
		await client.query('UPDATE datasets SET source_type = $1, source_path = $2 WHERE id = $3', [currentTypes, dataset.source_path, id]);

		res.status(200).json({ success: true, type });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Conversion failed', detail: err.message });
	} finally {
		await client.end();
	}

}

