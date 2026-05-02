import nodemailer from "nodemailer";
import { Resend } from "resend";
import { buildWelcomeEmailHtml } from "@/lib/welcome-email-html";

const SUBJECT = "⚽ ¡Bienvenido al equipo mundialista!";

/**
 * @param {string} to - destinatario (normalizado en minúsculas)
 * @returns {Promise<{ ok: true, messageId: string|null, via: 'smtp'|'resend' } | { ok: false, error: string }>}
 */
export async function sendWelcomeMail(to) {
  const html = buildWelcomeEmailHtml();
  const transport = (process.env.EMAIL_TRANSPORT || "resend").toLowerCase();

  if (transport === "smtp") {
    const user = process.env.SMTP_USER?.trim();
    const pass = process.env.SMTP_PASS?.trim()?.replace(/\s/g, "");
    if (!user || !pass) {
      return {
        ok: false,
        error: "Con EMAIL_TRANSPORT=smtp hacen falta SMTP_USER y SMTP_PASS.",
      };
    }

    const host = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT?.trim() || "587");
    const from =
      process.env.SMTP_FROM?.trim() || `Mundial Figuritas <${user}>`;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    try {
      const info = await transporter.sendMail({
        from,
        to,
        subject: SUBJECT,
        html,
      });
      return {
        ok: true,
        messageId: info.messageId ?? null,
        via: "smtp",
      };
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Error desconocido al enviar por SMTP.";
      return { ok: false, error: msg };
    }
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return {
      ok: false,
      error:
        "Falta RESEND_API_KEY, o configurá EMAIL_TRANSPORT=smtp con Gmail.",
    };
  }

  const resend = new Resend(apiKey);
  const from =
    process.env.EMAIL_FROM?.trim() ||
    "Mundial Figuritas <onboarding@resend.dev>";

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    subject: SUBJECT,
    html,
    idempotencyKey: `mundial-welcome/${to}`,
  });

  if (error) {
    return {
      ok: false,
      error: error.message || "No se pudo enviar el correo con Resend.",
    };
  }

  return {
    ok: true,
    messageId: data?.id ?? null,
    via: "resend",
  };
}
