'use server';

import { randomUUID } from 'node:crypto';
import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { neon } from '@neondatabase/serverless';

type CareerApplication = {
    name: string;
    email: string;
    phone: string;
    role: string;
    experience: string;
    linkedin: string;
    message: string;
};

const limits: Record<keyof CareerApplication, number> = {
    name: 120,
    email: 254,
    phone: 40,
    role: 180,
    experience: 40,
    linkedin: 500,
    message: 5000,
};

function normalizeApplication(input: CareerApplication): CareerApplication | null {
    const application = Object.fromEntries(
        Object.entries(input).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : ''])
    ) as CareerApplication;

    if (!application.name || !application.email || !application.role || !application.message) return null;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(application.email)) return null;

    for (const key of Object.keys(limits) as Array<keyof CareerApplication>) {
        if (application[key].length > limits[key]) return null;
    }

    return application;
}

async function saveLocally(application: CareerApplication) {
    const storageDirectory = path.join(process.cwd(), '.data');
    const storageFile = path.join(storageDirectory, 'career-applications.jsonl');
    await mkdir(storageDirectory, { recursive: true, mode: 0o700 });
    await appendFile(
        storageFile,
        `${JSON.stringify({ id: randomUUID(), ...application, createdAt: new Date().toISOString() })}\n`,
        { encoding: 'utf8', mode: 0o600 }
    );
}

export async function submitCareerApplication(input: CareerApplication) {
    const application = normalizeApplication(input);
    if (!application) {
        return { success: false, error: 'Please check the required fields and try again.' };
    }

    try {
        if (!process.env.DATABASE_URL) {
            await saveLocally(application);
            return { success: true };
        }

        const sql = neon(process.env.DATABASE_URL);

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
            VALUES (${application.name}, ${application.email}, ${application.phone}, ${application.role}, ${application.experience}, ${application.linkedin}, ${application.message})
        `;

        return { success: true };
    } catch (error) {
        console.error('Failed to store career application:', error instanceof Error ? error.message : 'Unknown error');
        return { success: false, error: 'Failed to submit application. Please try again.' };
    }
}
