import { Client } from 'pg';
import bcrypt from 'bcrypt';

const user = "admin";
const pass = "Pass__Word";
const saltRounds = 10; // bcrypt will handle the salt internally

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const hashedPassword = await bcrypt.hash(pass, saltRounds);

    const client = new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 5432
    });

    try {
        await client.connect();

        await client.query(`
          CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(32) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            email TEXT,
            name VARCHAR(64),
            job_title VARCHAR(64),
            city VARCHAR(64),
            country VARCHAR(64),
            latitude NUMERIC(9,6),
            longitude NUMERIC(9,6),
            created_at TIMESTAMP DEFAULT NOW()
          );
        `);

        await client.query(`
          CREATE TABLE IF NOT EXISTS activity_log (
            id SERIAL PRIMARY KEY,
            user_id INTEGER,
            username VARCHAR(32),
            action TEXT,
            timestamp TIMESTAMP DEFAULT NOW()
          );
        `);

        await client.query(`
          CREATE TABLE IF NOT EXISTS datasets (
            id SERIAL PRIMARY KEY,
            user_id INTEGER,
            name VARCHAR(100),
            notes TEXT,
            source_type VARCHAR(16),
            source_path TEXT,
            imported_as_table BOOLEAN DEFAULT false,
            visibility VARCHAR(16),
            row_count INTEGER,
            created_at TIMESTAMP DEFAULT NOW(),
            last_edited TIMESTAMP DEFAULT NOW()
          );
        `);

        await client.query(`
          CREATE TABLE IF NOT EXISTS user_settings (
            id SERIAL PRIMARY KEY,
            user_id INTEGER,
            theme VARCHAR(32),
            default_dataset INTEGER,
            visual_panel VARCHAR(64),
            reference_links TEXT[],
            left_bar_panels TEXT[],
            right_bar_panels TEXT[],
            toolbar_tools TEXT[]
          );
        `);

        // Insert user only if not already present
        await client.query (
            `INSERT INTO users (username, password) 
            VALUES ($1, $2)
            ON CONFLICT (username) DO NOTHING;`,
            [user, hashedPassword]
        );

        await client.end();
        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('Install failed:', err);
        return res.status(500).json({ error: 'Database setup failed' });
    }
}

