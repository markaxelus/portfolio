import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()
  
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      auth: {
        user: process.env.STMP_USER,
        pass: process.env.STMP_PASS,
      },
    })
  
    await transporter.sendMail({
      from: process.env.SMTP_FROM || `Portfolio <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || 'mrkaxelus@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact from ${name}` ,
      text: message, 
      html: `<p>${message}</p><hr/><p>From: <strong>${name}</strong> (${email})</p>`, 
    })

    return NextResponse.json({ success: true })

  } catch (err: any) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }

}