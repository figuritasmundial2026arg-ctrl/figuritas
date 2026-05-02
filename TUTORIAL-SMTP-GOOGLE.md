# Tutorial: enviar mails desde Gmail con SMTP (Google)

Este proyecto puede mandar el mail de bienvenida **desde tu cuenta de Gmail** usando el servidor SMTP de Google. Ejemplo de cuenta: `figuritasmundial2026arg@gmail.com`.

> **Importante:** la contraseña de aplicación **no es** la contraseña que usás para entrar a Gmail. Es una clave de 16 letras que genera Google solo para apps.

---

## 1. Requisitos

- Tener la cuenta de Gmail creada y poder entrar en [https://mail.google.com](https://mail.google.com).
- Un teléfono para recibir SMS o la app de Google (Authenticator) al activar la verificación en dos pasos.

---

## 2. Activar la verificación en dos pasos (obligatorio)

Google **no deja** usar contraseñas de aplicación sin 2 pasos.

1. Abrí [https://myaccount.google.com/security](https://myaccount.google.com/security) (iniciá sesión con `figuritasmundial2026arg@gmail.com` o la cuenta que uses).
2. Buscá **Verificación en dos pasos** (o “2-Step Verification”).
3. Entrá y seguí el asistente: teléfono SMS, llamada, o app **Google Authenticator**.
4. Completá la activación hasta que quede **activada**.

Si no ves la opción, puede ser cuenta de organización escolar: en ese caso el administrador debe permitirlo.

---

## 3. Crear una “Contraseña de aplicación”

1. Volvé a [https://myaccount.google.com/security](https://myaccount.google.com/security).
2. Buscá **Contraseñas de aplicaciones** (a veces está dentro de “Verificación en dos pasos”, al final).
   - Enlace directo (misma cuenta): [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Si te pide la contraseña de la cuenta o 2 pasos, confirmá.
4. En **Nombre de la aplicación** podés poner: `Mundial Figuritas` o `Next.js local`.
5. Tipo de aplicación: **Correo** (Mail) y dispositivo: **Otro (nombre personalizado)** → escribí `Vercel` o `PC`.
6. Pulsá **Generar**.
7. Te muestra **16 caracteres** en grupos (ej. `abcd efgh ijkl mnop`). **Copiala completa** (podés pegarla sin espacios).

Guardala en un lugar seguro: **Google no la vuelve a mostrar**. Si la perdés, generá otra nueva y actualizá `.env.local` / Vercel.

---

## 4. Configurar el proyecto (local)

En la carpeta `mundial-app`, creá o editá el archivo **`.env.local`** (no se sube a Git si tenés `.env*` en `.gitignore`):

```env
EMAIL_TRANSPORT=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=figuritasmundial2026arg@gmail.com
SMTP_PASS=abcdefghijklmnop
SMTP_FROM=Mundial Figuritas <figuritasmundial2026arg@gmail.com>
```

- **SMTP_PASS**: la contraseña de aplicación de 16 caracteres (sin espacios o con espacios, el código las quita).
- **SMTP_FROM**: cómo se ve el remitente; el correo debe ser el mismo usuario autenticado (`SMTP_USER`).

Guardá el archivo, **cerrá y volvé a abrir** `npm run dev` para que cargue las variables.

---

## 5. Probar

1. `npm run dev`
2. Abrí la web, poné **otro** mail tuyo (no el mismo que SMTP si querés ver claro el “para”), enviá el formulario.
3. Revisá bandeja de entrada y **spam** la primera vez.

---

## 6. Subir a Vercel

1. En el proyecto en Vercel: **Settings → Environment Variables**.
2. Agregá las mismas variables (`EMAIL_TRANSPORT`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`) para **Production** (y Preview si querés).
3. **No** pegues la contraseña de aplicación en el código ni en Git.
4. Hacé un **redeploy** después de guardar variables.

---

## 7. Problemas frecuentes

| Síntoma | Qué hacer |
|--------|-----------|
| `Invalid login` / `535-5.7.8` | Revisá que **SMTP_PASS** sea la **contraseña de aplicación**, no la contraseña normal. Activá 2 pasos y generá una nueva app password. |
| `Username and Password not accepted` | Mismo caso; o cuenta con restricción (Workspace: que el admin permita SMTP). |
| No llega el mail | Mirá **spam**; esperá 1–2 min; probá enviar a otra cuenta. |
| Error de red en el navegador | Revisá que la API `/api/subscribe` no falle: mirá la terminal del servidor o logs en Vercel. |

---

## 8. Límites (Gmail)

Para un volumen chico (decenas por día) suele alcanzar. Google aplica **límites diarios** que pueden cambiar; si un día mandás muchísimo, la cuenta puede frenar envíos temporalmente. Para un sitio con mucho tráfico conviene Resend + dominio propio.

---

## 9. Volver a Resend

En `.env.local` o Vercel: **borrá** `EMAIL_TRANSPORT` o poné `EMAIL_TRANSPORT=resend`, completá `RESEND_API_KEY` y `EMAIL_FROM` verificado, y redeploy.
