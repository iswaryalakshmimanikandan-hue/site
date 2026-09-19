import type { IncomingMessage, ServerResponse } from "http";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Helper to load environment variables from .env if running in local Node / Vite
export function ensureEnvLoaded() {
  try {
    if (typeof process.loadEnvFile === "function") {
      const envPath = path.resolve(process.cwd(), ".env");
      if (fs.existsSync(envPath)) {
        process.loadEnvFile(envPath);
        return;
      }
    }
  } catch (e) {
    // fallback
  }

  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      content.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) return;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          process.env[key] = val;
        }
      });
    }
  } catch (e) {
    // ignore
  }
}

// Blocked public email domains list (40 domains)
export const BLOCKED_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.uk", "yahoo.co.in", "yahoo.ca",
  "yahoo.com.au", "outlook.com", "hotmail.com", "hotmail.co.uk", "live.com", "live.co.uk",
  "msn.com", "icloud.com", "me.com", "mac.com", "aol.com", "mail.com", "email.com", "usa.com",
  "gmx.com", "gmx.de", "web.de", "inbox.com", "fastmail.com", "zoho.com", "yandex.com",
  "yandex.ru", "mail.ru", "proton.me", "protonmail.com", "tuta.com", "tutanota.com",
  "mailfence.com", "posteo.de", "startmail.com", "rediffmail.com", "rediffmailpro.com",
  "sify.com", "indiatimes.com",
]);

export interface ConsultationPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message?: string;
}

export function validatePayload(data: any): { valid: boolean; error?: string } {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request payload." };
  }

  const name = String(data.name || "").trim();
  if (!name) {
    return { valid: false, error: "Name is required." };
  }

  const email = String(data.email || "").trim().toLowerCase();
  if (!email) {
    return { valid: false, error: "Email is required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Enter a valid email address." };
  }

  const domain = email.split("@")[1]?.trim();
  if (domain && BLOCKED_EMAIL_DOMAINS.has(domain)) {
    return { valid: false, error: "Enter your company mailid" };
  }

  const subject = String(data.subject || "").trim();
  if (!subject) {
    return { valid: false, error: "Subject is required." };
  }

  const phone = String(data.phone || "").trim();
  if (phone) {
    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      return { valid: false, error: "Enter a valid phone number (7-15 digits)." };
    }
  }

  return { valid: true };
}

export async function sendConsultationEmail(data: ConsultationPayload): Promise<{ success: boolean; message?: string }> {
  ensureEnvLoaded();

  const validation = validatePayload(data);
  if (!validation.valid) {
    return { success: false, message: validation.error };
  }

  const name = data.name.trim();
  const email = data.email.trim();
  const phone = data.phone?.trim() || "Not provided";
  const company = data.company?.trim() || "Not provided";
  const subject = data.subject.trim();
  const message = data.message?.trim() || "Not provided";

  const targetRecipient = process.env.DESTINATION_EMAIL || "deviswarya21@gmail.com";
  const emailSubject = `New Consultation Request - ${name}`;

  const textBody = `New Consultation Request

Name: ${name}
Company: ${company}
Business Email: ${email}
Phone Number: ${phone}
Subject: ${subject}
Message: ${message}

Submitted from the AskJuno website.`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${emailSubject}</title>
</head>
<body style="margin:0;padding:24px;background-color:#f8f6f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0d0a04;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;border:1px solid rgba(0,0,0,0.08);overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
    <div style="background:linear-gradient(90deg,#f97316,#ea580c);padding:20px 24px;">
      <h2 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">AskJuno — New Consultation Request</h2>
    </div>
    <div style="padding:24px;">
      <p style="margin:0 0 20px;font-size:15px;color:#333333;font-weight:600;">You have received a new consultation request from the website:</p>
      
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #eeeeee;font-weight:600;width:140px;color:#666666;font-size:13px;">Name:</td>
          <td style="padding:10px 12px;border-bottom:1px solid #eeeeee;font-size:14px;color:#111111;font-weight:500;">${name}</td>
        </tr>
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #eeeeee;font-weight:600;color:#666666;font-size:13px;">Company:</td>
          <td style="padding:10px 12px;border-bottom:1px solid #eeeeee;font-size:14px;color:#111111;">${company}</td>
        </tr>
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #eeeeee;font-weight:600;color:#666666;font-size:13px;">Business Email:</td>
          <td style="padding:10px 12px;border-bottom:1px solid #eeeeee;font-size:14px;color:#f97316;"><a href="mailto:${email}" style="color:#f97316;text-decoration:none;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #eeeeee;font-weight:600;color:#666666;font-size:13px;">Phone Number:</td>
          <td style="padding:10px 12px;border-bottom:1px solid #eeeeee;font-size:14px;color:#111111;">${phone}</td>
        </tr>
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #eeeeee;font-weight:600;color:#666666;font-size:13px;">Subject:</td>
          <td style="padding:10px 12px;border-bottom:1px solid #eeeeee;font-size:14px;color:#111111;font-weight:600;">${subject}</td>
        </tr>
        <tr>
          <td style="padding:10px 12px;font-weight:600;color:#666666;font-size:13px;vertical-align:top;">Message:</td>
          <td style="padding:10px 12px;font-size:14px;color:#111111;white-space:pre-wrap;line-height:1.5;">${message}</td>
        </tr>
      </table>

      <div style="border-top:1px solid #eeeeee;padding-top:16px;font-size:12px;color:#888888;">
        Submitted from the AskJuno website.
      </div>
    </div>
  </div>
</body>
</html>`;

  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpUser = process.env.SMTP_USER;
  const rawPass = process.env.SMTP_PASS || "";
  const smtpPass = rawPass.replace(/\s+/g, "");
  const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
  const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
  const smtpFrom = process.env.SMTP_FROM || (smtpUser ? `"AskJuno" <${smtpUser}>` : `"AskJuno" <deviswarya21@gmail.com>`);

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: smtpFrom,
        to: targetRecipient,
        replyTo: email,
        subject: emailSubject,
        text: textBody,
        html: htmlBody,
      });

      console.log(`[AskJuno Mailer] Email delivered successfully to ${targetRecipient}. MessageId: ${info.messageId}`);
      return { success: true };
    } catch (err: any) {
      console.error("[AskJuno Mailer Error] SMTP sendMail failed:", err);
      return {
        success: false,
        message: "Unable to send your request right now. Please try again.",
      };
    }
  }

  // Check for Resend API Key if provided
  if (process.env.RESEND_API_KEY) {
    try {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "AskJuno <onboarding@resend.dev>",
          to: [targetRecipient],
          reply_to: email,
          subject: emailSubject,
          text: textBody,
          html: htmlBody,
        }),
      });

      if (!resendRes.ok) {
        const errData = await resendRes.json().catch(() => ({}));
        console.error("[AskJuno Mailer Error] Resend API error:", errData);
        return {
          success: false,
          message: "Unable to send your request right now. Please try again.",
        };
      }

      console.log(`[AskJuno Mailer] Email delivered successfully via Resend to ${targetRecipient}`);
      return { success: true };
    } catch (err: any) {
      console.error("[AskJuno Mailer Error] Resend request failed:", err);
      return {
        success: false,
        message: "Unable to send your request right now. Please try again.",
      };
    }
  }

  // If no credentials configured, log technical error and return failure
  console.error("[AskJuno Mailer Error] No email provider configured. Please set SMTP_USER and SMTP_PASS in .env.");
  return {
    success: false,
    message: "Unable to send your request right now. Please try again.",
  };
}

// Serverless Handler (for Vercel / Netlify / Node endpoints)
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    if (res.setHeader) res.setHeader("Allow", "POST");
    return res.status ? res.status(405).json({ error: "Method Not Allowed" }) : null;
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        // keep as is
      }
    }

    const result = await sendConsultationEmail(body);
    if (!result.success) {
      return res.status ? res.status(400).json(result) : null;
    }

    return res.status ? res.status(200).json(result) : null;
  } catch (error: any) {
    console.error("[Consultation API Error]:", error);
    return res.status ? res.status(500).json({ success: false, message: "Unable to send your request right now. Please try again." }) : null;
  }
}
