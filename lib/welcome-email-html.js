/**
 * HTML del mail de bienvenida (estilos inline para clientes de correo).
 */
export function buildWelcomeEmailHtml() {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;background:#061a12;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:linear-gradient(180deg,#0a2f1f 0%,#061a12 45%,#0d2818 100%);padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:520px;background:#102a1c;border-radius:20px;border:1px solid #2d5a3d;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,.45);">
          <tr>
            <td style="padding:28px 28px 8px;text-align:center;background:radial-gradient(ellipse at top,#1f5c3a 0%,transparent 65%);">
              <div style="font-size:42px;line-height:1;margin-bottom:8px;">⚽</div>
              <h1 style="margin:0;color:#f4e4a6;font-size:26px;letter-spacing:.06em;text-transform:uppercase;font-family:Arial Black,Arial,sans-serif;">
                ¡Entraste al equipo!
              </h1>
              <p style="margin:12px 0 0;color:#b8e0c8;font-size:15px;line-height:1.5;">
                Gracias por sumarte a la previa <strong style="color:#fff;">mundialista</strong>. Acá arranca la jugada: figuritas, canchas y buena energía.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px;">
              <table role="presentation" width="100%" style="background:#0d2216;border-radius:14px;border:1px solid #2a4f38;">
                <tr>
                  <td style="padding:20px 22px;color:#d4f0de;font-size:14px;line-height:1.65;">
                    <p style="margin:0 0 12px;">Tu mail ya está en la lista. Te avisamos cuando haya novedades, sorteos o tips para completar el álbum.</p>
                    <p style="margin:0;color:#8fbc9a;font-size:13px;">— El equipo de <span style="color:#f4e4a6;">Sistema Figuritas</span></p>
                  </td>
                </tr>
              </table>
              <p style="margin:18px 0 0;text-align:center;font-size:11px;color:#5a8a6e;">
                Si no pediste este mail, podés ignorarlo.
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
