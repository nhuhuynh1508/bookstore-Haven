import clientPromise from '../../../lib/mongodb'; // Adjust the path as needed
 // Import your existing email sending function
import { NextResponse } from 'next/server';
import { sendConfirmationEmail } from '../send/route';

export async function POST(req) {
    const { email } = await req.json();

    console.log('Received email:', email)

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return NextResponse.json({ success: false, message: 'Invalid email address' }, { status: 400 });
    }

    // Connect to MongoDB
    try {
        const client = await clientPromise;
        const db = client.db('BackendDB'); 
        const collection = db.collection('subscribers');
        // Check if the email already exists
        const existingEmail = await collection.findOne({ email });
        if (existingEmail) {
            return NextResponse.json({ success: false, message: 'Email is already subscribed' }, { status: 400 });
        }

        // Save the email to the database
        await collection.insertOne({ email });

        // Call the function to send a confirmation email
        await sendConfirmationEmail(email);

        return NextResponse.json({ success: true, message: 'Email subscribed and confirmation email sent successfully' });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }

}
