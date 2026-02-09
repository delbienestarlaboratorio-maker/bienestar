import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laboratorio Bienestar - Estudios Clínicos, Radiología y Análisis Médicos",
  description: "Laboratorio clínico en México con más de 2,000 estudios disponibles. Análisis clínicos, radiología, cardiología, ultrasonido. Resultados rápidos y precisos con la mejor tecnología.",
  keywords: [
    "laboratorio clínico",
    "análisis clínicos",
    "estudios médicos",
    "radiología",
    "biometría hemática",
    "química sanguínea",
    "rayos X",
    "ultrasonido",
    "cardiología",
    "resultados médicos",
    "diagnóstico médico",
    "laboratorio México"
  ],
  authors: [{ name: "Laboratorio Bienestar" }],
  openGraph: {
    title: "Laboratorio Bienestar - Tu Salud es Nuestra Prioridad",
    description: "Más de 2,000 estudios clínicos disponibles. Diagnósticos precisos con tecnología de vanguardia.",
    url: "https://laboratoriobienestar.com",
    siteName: "Laboratorio Bienestar",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laboratorio Bienestar - Estudios Clínicos",
    description: "Tu salud es nuestra prioridad. Más de 2,000 estudios disponibles.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { CartProvider } from "@/contexts/CartContext";
import { CookieConsent } from "@/components/privacy/CookieConsent";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/seo/SchemaMarkup";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <OrganizationSchema />
        <LocalBusinessSchema />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnalyticsProvider />
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
            <CookieConsent />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}


