import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400 });
    }

    // Set up Nodemailer transporter using privateemail.com SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // e.g. 'mail.privateemail.com'
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // true for port 465, false for 587
      auth: {
        user: process.env.SMTP_USER, // your email address
        pass: process.env.SMTP_PASS, // your email password
      },
    });

    // Compose the email
    const mailOptions = {
      from: `Website Contact <${process.env.SMTP_USER}>`,
      to: 'support24@igdownloader24.com',
      subject: `[Contact Form] ${subject}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Subject:</b> ${subject}</p><p>${message.replace(/\n/g, '<br/>')}</p>`
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send message. Please try again later.' }, { status: 500 });
  }
} 