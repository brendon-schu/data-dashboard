import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { username, password } = req.body;
    const { Client } = await import('pg');

    const client = new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 5432,
    });

    await client.connect();
    const user = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    const isValid = await bcrypt.compare(password, user.rows[0].password);
    await client.end();

    if (isValid) {
        res.setHeader('Set-Cookie', `session=${username}; Path=/; HttpOnly`);
        return res.status(200).json({ success: true });
    } else {
        return res.status(401).json({ success: false });
    }
}

