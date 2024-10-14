import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

const nodemailer = require('nodemailer');

export async function POST(req) {
    try {
        // const myEmail = process.env.EMAIL;
        const { email } = await req.json();
        const client = await clientPromise;
        const db = client.db(process.env.MONGO_URI);

        const subscriber = await db.collection('subscribers').findOne({ email });
        
        // check if the subscriber exists
        if (!subscriber) {
            return NextResponse.json({ message: "Subscriber not found" }, { status: 404 });
        }

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
            to: subscriber.email,
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
        return NextResponse.json({ mail, user: process.env.USER, pass: process.env.PASSWORD }, { status: 200 });

    } catch (error) {
        console.error("Email sending error:", error);
        return NextResponse.json({ message: "Could not send message", user: process.env.USER, pass: process.env.PASSWORD }, { status: 500 });
    }
}
