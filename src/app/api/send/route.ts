import nodemailer from 'nodemailer';

export async function sendConfirmationEmail(email) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to Book Haven!',
        text: 'Thank you for subscribing to our newsletters!',
        html: '<p>Thank you for subscribing to our newsletter!</p>',
    };

    await transporter.sendMail(mailOptions);
}

export async function POST(request) {
    const { email } = await request.json();

    if (!email) {
        return new Response(JSON.stringify({ error: 'Email is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        await sendConfirmationEmail(email);
        return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ error: 'Failed to send email' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}