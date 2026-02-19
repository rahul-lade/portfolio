'use server';

import nodemailer from 'nodemailer';

interface IContactFormData {
    name: string;
    email: string;
    message: string;
}

interface IActionResult {
    success: boolean;
    message: string;
}

const sendContactEmail = async (data: IContactFormData): Promise<IActionResult> => {
    const { name, email, message } = data;

    if (!name || !email || !message) {
        return { success: false, message: 'All fields are required.' };
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: 'rahullade935@gmail.com',
            replyTo: email,
            subject: `Portfolio Contact from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        });

        return { success: true, message: 'Message sent successfully!' };
    } catch (error) {
        console.error('Email send error:', error);
        return { success: false, message: 'Failed to send message. Please try again later.' };
    }
};

export { sendContactEmail };
export type { IContactFormData, IActionResult };
