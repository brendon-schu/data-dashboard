import path from 'path';
import fs from 'fs';
import Papa from 'papaparse';

export default function handler(req, res) {
    const { name } = req.query;
    const filePath = path.join(process.cwd(), 'datafiles', name);
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
    }

    const ext = path.extname(name).toLowerCase();
    const file = fs.readFileSync(filePath, 'utf8');

    if (ext === '.json') {
        try {
            const data = JSON.parse(file);
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ error: 'Invalid JSON format' });
        }
    }

    Papa.parse(file, {
        header: true,
        complete: (results) => {
            res.status(200).json(results.data);
        },
        error: (err) => {
            res.status(500).json({ error: err.message });
        },
    });
}
