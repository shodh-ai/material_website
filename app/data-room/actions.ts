'use server';

import { neon } from '@neondatabase/serverless';

export async function submitInvestorApplication(formData: {
    name: string;
    email: string;
    firm: string;
}) {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);

        await sql`
            INSERT INTO investor_applications (name, email, firm) 
            VALUES (${formData.name}, ${formData.email}, ${formData.firm})
        `;

        return { success: true };
    } catch (error) {
        console.error('Database Error:', error);
        return { success: false, error: 'Failed to submit application' };
    }
}
