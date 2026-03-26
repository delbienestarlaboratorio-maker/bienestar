import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medicamentos | Laboratorio del Bienestar",
  description: "Buscador de Medicamentos, Sustancias Activas y Marcas en México.",
  verification: {
    google: "zgkG82dFyxIExD37zuxeopeuwH6QVaFtmZLJXKFKML8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
