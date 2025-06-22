// app/api/contact/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  return NextResponse.json(
    { message: "Contact API — please send a POST with name, email, and message" },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing fields: name, email, and message are all required." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT!),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: process.env.SMTP_FROM!,
      to: process.env.CONTACT_TO!,
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      text: message,
      html: `<p>${message}</p><p>— <strong>${name}</strong> (${email})</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Contact API error:", err);
    const message = err instanceof Error ? err.message : "Internal Server Error";
    const stack = err instanceof Error && process.env.NODE_ENV === "development" ? err.stack : undefined;
    return NextResponse.json(
      {
        error: message,
        stack,
      },
      { status: 500 }
    );
  }
}
