import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
});

export const metadata = {
  title: "Mundial Figuritas — Sumate al equipo",
  description:
    "Dejá tu email y recibí la bienvenida mundialista. Sistema de figuritas.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${bebas.variable} ${dmSans.variable} h-dvh max-h-dvh overflow-hidden`}
    >
      <body className={`${dmSans.className} h-dvh max-h-dvh w-full overflow-hidden antialiased`}>
        {children}
      </body>
    </html>
  );
}
