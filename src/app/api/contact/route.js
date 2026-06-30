import { NextResponse } from "next/server";
import { Resend } from "resend";
import { sanitizeText, validateEmail } from "@/utils/security";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Server-side validation & sanitization
    const cleanName = sanitizeText(name, 100);
    const cleanEmail = email ? email.trim() : "";
    const cleanSubject = sanitizeText(subject, 100);
    const cleanMessage = sanitizeText(message, 2000);

    if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
      return NextResponse.json(
        { error: "Validation failed. All fields are required." },
        { status: 400 }
      );
    }

    if (!validateEmail(cleanEmail)) {
      return NextResponse.json(
        { error: "Invalid email address format." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    // Safe fallback for local development if Resend API Key is missing
    if (!apiKey) {
      console.log("=== CONTACT FORM SUBMISSION ===");
      console.log(`From: ${cleanName} <${cleanEmail}>`);
      console.log(`Subject: ${cleanSubject}`);
      console.log(`Message: ${cleanMessage}`);
      console.log("===============================");
      console.log("Resend API key missing. Form simulation successful.");

      return NextResponse.json({ success: true, simulated: true });
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "techbot096@gmail.com",
      subject: `[Portfolio Contact] ${cleanSubject}`,
      replyTo: cleanEmail,
      html: `
        <h2>New Message from ${cleanName}</h2>
        <p><strong>Email:</strong> ${cleanEmail}</p>
        <p><strong>Subject:</strong> ${cleanSubject}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; background: #f4f4f4; padding: 12px; border-radius: 4px;">${cleanMessage}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error occurred while sending mail." },
      { status: 500 }
    );
  }
}
