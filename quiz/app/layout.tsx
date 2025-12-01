import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SynthaCore - Sistema Educacional Interativo",
  description: "Sistema educacional interativo sobre animação em sistemas multimídia com quiz, demonstrações práticas e conteúdo completo sobre técnicas de animação digital.",
  keywords: ["animação", "sistemas multimídia", "educação", "GSAP", "stop motion", "animação 3D", "quiz interativo"],
  authors: [{ name: "Equipe SynthaCore" }],
  creator: "Equipe SynthaCore",
  publisher: "SynthaCore",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#4f46e5",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://synthacore.vercel.app",
    title: "SynthaCore - Sistema Educacional Interativo",
    description: "Aprenda animação em sistemas multimídia de forma interativa",
    siteName: "SynthaCore",
  },
  twitter: {
    card: "summary_large_image",
    title: "SynthaCore - Sistema Educacional Interativo",
    description: "Aprenda animação em sistemas multimídia de forma interativa",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/logo.png" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="SynthaCore" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
