import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const BASE_URL = "https://salud.delbienestar.com.mx";
const LAB_URL = "https://laboratorio.delbienestar.com.mx";
const TOOLS_URL = "https://herramientas.delbienestar.com.mx";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Salud y Bienestar | Blog, Síntomas y Enfermedades | Laboratorio Bienestar",
    template: "%s | Salud - Laboratorio Bienestar",
  },
  description: "Información médica confiable: artículos de salud, síntomas, enfermedades CIE-10, valores clínicos y biomarcadores. Contenido validado por profesionales.",
  authors: [{ name: "Laboratorio Bienestar" }],
  openGraph: {
    title: "Salud y Bienestar | Laboratorio Bienestar",
    description: "Tu guía completa de salud: artículos, síntomas, enfermedades y valores clínicos.",
    url: BASE_URL,
    siteName: "Laboratorio Bienestar - Salud",
    locale: "es_MX",
    type: "website",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: {
    canonical: BASE_URL,
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-6867283748828267" />
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6867283748828267" crossOrigin="anonymous" strategy="afterInteractive" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-2E7BK35JBV" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-2E7BK35JBV');`}</Script>
        <Script id="clarity" strategy="afterInteractive">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","vmr7d24pli");`}</Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <header className="bg-gradient-to-r from-green-900 to-green-800 text-white px-4 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <a href={LAB_URL} className="flex items-center gap-2 text-white hover:text-green-200 transition-colors">
              <span className="text-2xl">🧬</span>
              <div>
                <span className="font-bold text-lg">Laboratorio Bienestar</span>
                <span className="text-green-300 text-sm block">Salud y Bienestar</span>
              </div>
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="/blog/" className="text-green-200 hover:text-white transition-colors">📝 Blog</a>
              <a href="/sintomas/" className="text-green-200 hover:text-white transition-colors">🩺 Síntomas</a>
              <a href="/enfermedades/" className="text-green-200 hover:text-white transition-colors">📖 Enfermedades</a>
              <a href="/valores-clinicos/" className="text-green-200 hover:text-white transition-colors">📊 Biomarcadores</a>
              <a href={`${TOOLS_URL}/herramientas/`} className="text-green-200 hover:text-white transition-colors">🧮 Calculadoras</a>
              <a href={`${LAB_URL}/estudios/analisis-clinicos`} className="text-green-200 hover:text-white transition-colors">🔬 Estudios</a>
              <a href="https://wa.me/527716854026?text=Hola,%20necesito%20información" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg font-bold transition-colors">📱 WhatsApp</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="bg-gray-900 text-gray-400 py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm">© {new Date().getFullYear()} Laboratorio Clínico Del Bienestar. Contenido informativo validado por profesionales.</p>
            <p className="text-xs mt-2">Esta información no sustituye el diagnóstico médico profesional.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm">
              <a href={LAB_URL} className="text-green-400 hover:text-green-300">Sitio Principal</a>
              <a href={`${TOOLS_URL}/herramientas/`} className="text-green-400 hover:text-green-300">Calculadoras</a>
              <a href={`${LAB_URL}/contacto`} className="text-green-400 hover:text-green-300">Contacto</a>
              <a href={`${LAB_URL}/privacidad`} className="text-green-400 hover:text-green-300">Privacidad</a>
            </div>
          </div>
        </footer>
        <a href="https://wa.me/527716854026?text=Hola,%20necesito%20información" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-400 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-50 transition-all hover:scale-110" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /></svg>
        </a>
      </body>
    </html>
  );
}
