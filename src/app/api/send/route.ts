
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const nodemailer = require('nodemailer');
const connectionURL = process.env.MONGODB_URI
const client = new MongoClient(connectionURL);


export async function POST(req) {
    const { email } = await req.json();
    const db = client.db(process.env.MONGO_DB);
    
    try {
        const subscriber = await db.collection('subscribers').findOne({ email });

        if (subscriber) {
            return NextResponse.json({ message: 'Already a subscriber' }, { status: 200 });
        }
        
        await db.collection('subscribers').insertOne({ email });

        //create transporter object
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            }
        });

        // Send email
        const mail = await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: `Welcome to Book Haven!`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <p style="font-size: 18px;">🎉 Thank you for subscribing to our newsletter!</p>
                    <p>We’re thrilled to have you on board. Stay tuned for the latest updates, exclusive offers, and all things books.</p>
                    <p>Happy Reading!</p>
                    <p style="margin-top: 20px;">Warm regards,</p>
                    <p style="font-weight: bold;">The Book Haven Team</p>
                </div>
            `,
        });

        // Return success response
        return NextResponse.json({ mail }, { status: 200 });

    } catch (error) {
        console.error("Email sending error:", error);
        return NextResponse.json({ message: "Could not send message", to: email }, { status: 500 });
    }
}
