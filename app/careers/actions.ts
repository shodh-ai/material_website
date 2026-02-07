'use server';

import { neon } from '@neondatabase/serverless';

export async function submitCareerApplication(formData: {
    name: string;
    email: string;
    phone: string;
    role: string;
    experience: string;
    linkedin: string;
    message: string;
}) {
    try {
        if (!process.env.DATABASE_URL) {
            console.log('No DATABASE_URL set — skipping DB insert (local dev mode)');
            return { success: true };
        }

        const sql = neon(`${process.env.DATABASE_URL}`);

        // Create table if it doesn't exist
        await sql`
            CREATE TABLE IF NOT EXISTS career_applications (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT,
                role TEXT NOT NULL,
                experience TEXT,
                linkedin TEXT,
                message TEXT,
                created_at TIMESTAMP DEFAULT NOW()
            )
        `;

        await sql`
            INSERT INTO career_applications (name, email, phone, role, experience, linkedin, message)
            VALUES (${formData.name}, ${formData.email}, ${formData.phone}, ${formData.role}, ${formData.experience}, ${formData.linkedin}, ${formData.message})
        `;

        return { success: true };
    } catch (error) {
        console.error('Database Error:', error);
        return { success: false, error: 'Failed to submit application' };
    }
}
