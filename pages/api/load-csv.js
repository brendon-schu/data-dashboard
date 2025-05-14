import path from 'path';
import fs from 'fs';
import Papa from 'papaparse';

export default function handler(req, res) {
    const { name } = req.query;
    const filePath = path.join(process.cwd(), 'files', name);
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
    }

    const file = fs.readFileSync(filePath, 'utf8');

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
