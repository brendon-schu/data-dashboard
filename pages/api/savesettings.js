import { Client } from 'pg';

export default async function handler(req, res) {

	if (req.method !== 'POST') return res.status(405).end();

	const {theme, default_dataset, ambient, ref_links, leftbar_panels, rightbar_panels, toolbar_tools} = req.body;

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
			`UPDATE user_settings SET 
			user_id = 1, theme = $1, default_dataset = $2, visual_panel = $3, reference_links = $4,
			left_bar_panels = $5, right_bar_panels = $6, toolbar_tools = $7 WHERE id = 1`,
			[clean(theme), clean(default_dataset), clean(ambient), clean(ref_links), clean(leftbar_panels), clean(rightbar_panels), clean(toolbar_tools)]
		);
        await client.end();
		res.status(200).json({ success: true });
	} catch (err) {
		console.error(err);
		res.status(500).json({ success: false, error: 'DB update failed' });
	}

}

