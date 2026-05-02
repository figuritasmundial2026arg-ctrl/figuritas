import fs from "fs/promises";
import path from "path";

const STORE_PATH = path.join(process.cwd(), "data", "subscribers.js");

const BLOCK_RE =
  /export const emailsRegistrados = JSON\.parse\(\s*`([\s\S]*?)`\s*\)\s*;/;

function escapeForTemplateLiteral(json) {
  return json.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

export async function readSubscribersFromDisk() {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    const m = raw.match(BLOCK_RE);
    if (!m) return [];
    return JSON.parse(m[1]);
  } catch {
    return [];
  }
}

/**
 * Añade un email al archivo JS (deduplica por email en minúsculas).
 * En Vercel puede fallar en silencio (filesystem de solo lectura / efímero).
 */
export async function appendSubscriberRecord(email) {
  const normalized = email.trim().toLowerCase();
  const list = await readSubscribersFromDisk();
  if (list.some((e) => e.email === normalized)) {
    return { list, added: false };
  }
  const next = [
    ...list,
    { email: normalized, fecha: new Date().toISOString() },
  ];
  const json = JSON.stringify(next, null, 2);
  const fileBody = `/**
 * Emails capturados desde la landing (actualizado por /api/subscribe).
 * En Vercel el disco del servidor es efímero: para copia duradera usa
 * también los contactos en el panel de Resend (ver API).
 */
export const emailsRegistrados = JSON.parse(
  \`${escapeForTemplateLiteral(json)}\`
);
`;
  try {
    await fs.writeFile(STORE_PATH, fileBody, "utf8");
  } catch {
    // Ignorar: común en serverless sin escritura persistente
  }
  return { list: next, added: true };
}
