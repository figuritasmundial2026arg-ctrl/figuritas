import { Resend } from "resend";
import { appendSubscriberRecord } from "@/lib/subscriber-store";
import { sendWelcomeMail } from "@/lib/send-welcome-mail";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "JSON inválido." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || !EMAIL_RE.test(email)) {
    return Response.json(
      { ok: false, error: "Ingresá un email válido." },
      { status: 400 }
    );
  }

  const normalized = email.toLowerCase();

  const sent = await sendWelcomeMail(normalized);
  if (!sent.ok) {
    const status =
      sent.error?.toLowerCase().includes("falta") ||
      sent.error?.toLowerCase().includes("configurá")
        ? 500
        : 502;
    return Response.json({ ok: false, error: sent.error }, { status });
  }

  const { added } = await appendSubscriberRecord(normalized);

  let contactoResend = null;
  if (sent.via === "resend" && process.env.RESEND_API_KEY?.trim()) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data: contactData, error: contactError } =
      await resend.contacts.create({
        email: normalized,
        unsubscribed: false,
      });
    contactoResend = contactError ? null : (contactData?.id ?? true);
  }

  return Response.json({
    ok: true,
    messageId: sent.messageId,
    via: sent.via,
    nuevoEnLista: added,
    contactoResend,
  });
}
