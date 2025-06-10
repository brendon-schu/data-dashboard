
// /pages/api/installCheck.js

export default async function handler(req, res) {
  const { Client } = await import('pg');

  let envOK = true;
  let tablesOK = false;

  try {
    const client = new Client({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 5432
    });

    await client.connect();
    await client.query('SELECT 1');
    envOK = true;

    // Optional: check if specific table exists
    const result = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `);

    tablesOK = result.rows[0].exists;

    await client.end();
  } catch (err) {
    console.error('DB check failed:', err);
    envOK = false;
  }

  res.status(200).json({ envOK, tablesOK });
}

