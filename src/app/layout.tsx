import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
    url: "https://laboratorio.delbienestar.com.mx",
    siteName: "Laboratorio Bienestar",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Laboratorio Clínico Del Bienestar - Tizayuca, Hidalgo",
      },
    ],
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
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
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
    <html lang="es" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2E7BK35JBV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2E7BK35JBV');
          `}
        </Script>
        {/* Microsoft Clarity — Grabaciones de sesión y mapas de calor */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vmr7d24pli");
          `}
        </Script>
        <OrganizationSchema />
        <LocalBusinessSchema />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1B5E20" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AnalyticsProvider />
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
            <WhatsAppFloat />
            <CookieConsent />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}


