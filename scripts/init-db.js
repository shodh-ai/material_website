const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function initDatabase() {
    try {
        const sql = neon(process.env.DATABASE_URL);
        
        console.log('Creating investor_applications table...');
        
        await sql`
            CREATE TABLE IF NOT EXISTS investor_applications (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                firm TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            )
        `;
        
        console.log('✅ Table created successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating table:', error);
        process.exit(1);
    }
}

initDatabase();
