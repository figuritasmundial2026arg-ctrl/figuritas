/** Enlaces a kits en Google Drive (orden: 2026 primero). */
const DRIVE_LINKS = [
  {
    title: "Mundial 2026",
    desc: "Kit imprimible figuritas Copa del Mundo 2026 — el material más reciente de tu compra.",
    url: "https://drive.google.com/drive/folders/1o1jtxAjIXrgeoSJB9BG7DPLUs3NhhP64?usp=sharing",
  },
  {
    title: "Mundial 2022 (Qatar)",
    desc: "Kit imprimible Qatar 2022: álbum, figuritas, extras y archivos del mundial anterior.",
    url: "https://drive.google.com/drive/folders/1p7Ef4rv4Haa0FrYQdAZMxHi3k8pQJlMK?usp=sharing",
  },
  {
    title: "Copa América 2024",
    desc: "Kit imprimible Copa América USA 2024 (PDF y material del torneo).",
    url: "https://drive.google.com/drive/folders/13PjzFsefaVwjubvmDWMz72xswGISvY8O?usp=sharing",
  },
  {
    title: "Otros mundiales (láminas / álbumes)",
    desc: "Figuritas y láminas de varios mundiales: Corea-Japón 2002, Italia 90, Brasil 2014, Alemania 2006, Francia 1998, Rusia 2018 y Sudáfrica 2010, en un mismo Drive.",
    url: "https://drive.google.com/drive/folders/1X84WFvZdUMZIGmBlQfrcr1YF1mZ1Pc_d?usp=sharing",
  },
];

const LINK_STYLE =
  "display:inline-block;margin-top:10px;padding:12px 20px;background:linear-gradient(180deg,#e8f5a8 0%,#5ecf7a 100%);color:#0a1f12;font-weight:bold;text-decoration:none;border-radius:10px;font-family:Arial,sans-serif;font-size:14px;";

/**
 * HTML del mail post-compra (estilos inline para clientes de correo).
 */
export function buildWelcomeEmailHtml() {
  const rows = DRIVE_LINKS.map(
    (item) => `
          <tr>
            <td style="padding:18px 20px;border-bottom:1px solid #2a4f38;">
              <p style="margin:0 0 6px;color:#f4e4a6;font-size:16px;font-weight:bold;font-family:Arial,sans-serif;">
                ${item.title}
              </p>
              <p style="margin:0 0 4px;color:#b8e0c8;font-size:14px;line-height:1.55;font-family:Georgia,'Times New Roman',serif;">
                ${item.desc}
              </p>
              <a href="${item.url}" target="_blank" rel="noopener noreferrer" style="${LINK_STYLE}">
                Abrir en Google Drive →
              </a>
            </td>
          </tr>`
  ).join("");

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;background:#061a12;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:linear-gradient(180deg,#0a2f1f 0%,#061a12 45%,#0d2818 100%);padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background:#102a1c;border-radius:20px;border:1px solid #2d5a3d;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,.45);">
          <tr>
            <td style="padding:28px 24px 16px;text-align:center;background:radial-gradient(ellipse at top,#1f5c3a 0%,transparent 65%);">
              <div style="font-size:40px;line-height:1;margin-bottom:8px;">⚽</div>
              <h1 style="margin:0;color:#f4e4a6;font-size:24px;letter-spacing:.04em;font-family:Arial Black,Arial,sans-serif;">
                Gracias por tu compra
              </h1>
              <p style="margin:14px 0 0;color:#d4f0de;font-size:15px;line-height:1.55;max-width:480px;margin-left:auto;margin-right:auto;">
                Registramos tu correo. Debajo tenés los <strong style="color:#fff;">enlaces a Google Drive</strong> con los kits imprimibles de figuritas. Abrí cada carpeta desde el navegador o la app de Drive; si no ves algo, probá con otra cuenta o revisá la carpeta “Compartidos conmigo”.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 8px 8px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0d2216;border-radius:14px;border:1px solid #2a4f38;overflow:hidden;">
                ${rows}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 24px;text-align:center;">
              <p style="margin:0;color:#8fbc9a;font-size:13px;line-height:1.5;">
                Cualquier duda sobre tu pedido podés escribirnos por el mismo canal donde compraste (Mercado Libre) o por WhatsApp si te pasamos el contacto en la publicación.
              </p>
              <p style="margin:16px 0 0;text-align:center;font-size:11px;color:#5a8a6e;">
                Si no hiciste esta compra, ignorá este mensaje.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
