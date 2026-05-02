"use client";

import { useCallback, useState } from "react";

const WHATSAPP_HELP_URL =
  "https://wa.me/5493515285112?text=" +
  encodeURIComponent("Hola! Necesito ayuda con las figuritas");

export default function MundialLanding() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setStatus("loading");
      setMessage("");
      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (!res.ok || !data.ok) {
          setStatus("error");
          setMessage(data.error || "Algo salió mal. Probá de nuevo.");
          return;
        }
        setStatus("success");
        setMessage("¡Listo! Revisá tu bandeja (y el spam).");
        setEmail("");
      } catch {
        setStatus("error");
        setMessage("Sin conexión o error de red.");
      }
    },
    [email]
  );

  return (
    <div className="mundial-root relative flex h-full max-h-dvh w-full flex-col overflow-hidden">
      <div className="pitch-stripes pointer-events-none absolute inset-0 opacity-40" />
      <div className="spotlight pointer-events-none absolute inset-y-0 -left-1/4 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.07]" />

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-lg flex-1 flex-col justify-center px-5 py-10 sm:px-8 sm:py-12">
        <header className="text-center">
          <div
            className="mb-4 inline-flex animate-bounce-slow items-center justify-center rounded-full border border-[#3d7a52]/60 bg-[#0f2918]/90 px-5 py-2 text-sm font-medium tracking-wide text-[#c8f0d4] shadow-lg backdrop-blur-md"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="mr-2 text-lg" aria-hidden>
              ⚽
            </span>
            Figuritas Copa del Mundo 2026
          </div>
          <h1 className="font-display text-4xl leading-[0.95] tracking-tight text-[#f8ebc4] drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)] sm:text-5xl">
            GRACIAS
            <br />
            <span className="text-[#7fd99a]">POR TU COMPRA</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-[#b5dcc4] sm:text-base">
            Felicitaciones por{" "}
            <strong className="text-white">tu compra</strong>. Para enviarte todo
            el material de tu pedido necesitamos que dejes tu mail acá abajo.
          </p>
        </header>

        <div className="relative mt-12">
          <div className="ball-float pointer-events-none absolute -right-4 -top-10 text-6xl opacity-90 sm:-right-8 sm:text-7xl">
            ⚽
          </div>
          <form
            onSubmit={onSubmit}
            className="card-glow relative rounded-3xl border border-[#2f6b45]/80 bg-[#0c2215]/85 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
          >
            <label htmlFor="email" className="mb-2 block text-sm text-[#9bc9aa]">
              Correo para enviarte lo de tu pedido
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="vos@ejemplo.com"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                disabled={status === "loading"}
                className="min-h-12 flex-1 rounded-2xl border border-[#2d5a3d] bg-[#07150d]/90 px-4 text-white placeholder:text-[#5a8068] outline-none ring-0 transition focus:border-[#5ecf7a] focus:shadow-[0_0_0_3px_rgba(94,207,122,0.25)] disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="mundial-btn min-h-12 shrink-0 rounded-2xl px-6 font-semibold text-[#0a1f12] transition disabled:opacity-60"
              >
                {status === "loading" ? "Enviando…" : "¡A la cancha!"}
              </button>
            </div>
            {message ? (
              <p
                className={`mt-4 text-sm font-medium ${
                  status === "success" ? "text-[#9ef5b4]" : "text-[#ffb4b4]"
                }`}
                role="status"
              >
                {message}
              </p>
            ) : null}
          </form>
        </div>

      </div>

      {status === "success" ? (
        <div className="confetti pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className="confetti-piece absolute top-0 h-2 w-2 rounded-sm opacity-90"
              style={{
                left: `${(i * 7 + 11) % 100}%`,
                animationDelay: `${i * 0.04}s`,
                background:
                  i % 3 === 0 ? "#f4e4a6" : i % 3 === 1 ? "#5ecf7a" : "#ffffff",
              }}
            />
          ))}
        </div>
      ) : null}

      <div className="help-fab-float pointer-events-auto fixed bottom-5 right-5 z-[60] sm:bottom-6 sm:right-6">
        <a
          href={WHATSAPP_HELP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mundial-btn flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold leading-none text-[#0a1f12] shadow-lg ring-2 ring-[#2a6a3c]/50 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ef5b4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#061a12] sm:h-14 sm:w-14"
          aria-label="Ayuda por WhatsApp"
        >
          ?
        </a>
      </div>
    </div>
  );
}
