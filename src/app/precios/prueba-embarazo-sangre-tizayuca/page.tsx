import Link from 'next/link';
import type { Metadata } from 'next';
import { TestTube, MapPin, Clock, Phone, ChevronRight, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Precio de Prueba de Embarazo en Sangre (Beta-HCG) en Tizayuca | Laboratorio Del Bienestar',
  description: 'Prueba de Embarazo en Sangre (Beta-HCG) en Tizayuca desde $220 MXN. Sin cita previa. Resultados en 24-48 hrs. 2 sucursales en Tizayuca, Hidalgo. Laboratorio Del Bienestar.',
  alternates: { canonical: 'https://laboratorio.delbienestar.com.mx/precios/prueba-embarazo-sangre-tizayuca' },
  openGraph: {
    title: 'Precio de Prueba de Embarazo en Sangre (Beta-HCG) en Tizayuca | Laboratorio Del Bienestar',
    description: 'Prueba de Embarazo en Sangre (Beta-HCG) en Tizayuca desde $220 MXN. Sin cita previa. Resultados en 24-48 hrs.',
    url: 'https://laboratorio.delbienestar.com.mx/precios/prueba-embarazo-sangre-tizayuca',
  }
};

export default function PrecioPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb + Hero */}
      <section className="bg-gradient-to-br from-green-900 to-green-700 text-white py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-1.5 text-green-300 text-sm mb-5 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={14} />
            <Link href="/precios" className="hover:text-white transition-colors">Precios</Link>
            <ChevronRight size={14} />
            <span className="text-white">Prueba de Embarazo en Sangre (Beta-HCG)</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Precio de Prueba de Embarazo en Sangre (Beta-HCG)<br />
            <span className="text-green-300">en Tizayuca, Hidalgo</span>
          </h1>

          <p className="text-green-100 text-lg max-w-2xl mb-8">
            Cuantificación de la gonadotropina coriónica humana fracción beta en sangre. Más precisa que la prueba de orina. Permite confirmar embarazo, monitorear su evolución y detectar complicaciones tempranas.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur rounded-2xl px-8 py-5 text-center border border-white/20">
              <p className="text-green-200 text-sm mb-1">Precio en Laboratorio Del Bienestar</p>
              <p className="text-5xl font-extrabold text-white">$220</p>
              <p className="text-green-300 text-sm mt-1">MXN (IVA incluido)</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl px-6 py-5 text-center border border-white/20">
              <p className="text-green-200 text-sm mb-1">Resultados</p>
              <p className="text-2xl font-bold">24-48 hrs</p>
              <p className="text-green-300 text-sm">Digitales por email</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl px-6 py-5 text-center border border-white/20">
              <p className="text-green-200 text-sm mb-1">Cita previa</p>
              <p className="text-2xl font-bold">No necesaria</p>
              <p className="text-green-300 text-sm">Llega y listo</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">

          {/* Cuándo se necesita */}
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Cuándo necesito Prueba de Embarazo en Sangre (Beta-HCG)?</h2>
            <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-600 mt-1 text-lg">✓</span>
                  <span>Confirmación de embarazo</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-600 mt-1 text-lg">✓</span>
                  <span>Seguimiento de embarazo temprano</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-600 mt-1 text-lg">✓</span>
                  <span>Sospecha de embarazo ectópico</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-600 mt-1 text-lg">✓</span>
                  <span>Diagnóstico de aborto</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-600 mt-1 text-lg">✓</span>
                  <span>Seguimiento de mola hidatiforme</span>
                </li>
            </ul>
          </section>

          {/* Preparación */}
          <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-amber-900 mb-2 flex items-center gap-2">
              📋 Preparación del paciente
            </h2>
            <p className="text-amber-800 leading-relaxed">No requiere ayuno. Se puede realizar en cualquier momento. Altamente sensible: detecta embarazo desde los 7-10 días post-concepción.</p>
          </section>

          {/* Comparativo de precios */}
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              Comparativo de precios en Tizayuca
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-green-50 border-2 border-green-500 rounded-xl">
                <div>
                  <p className="font-bold text-green-900 flex items-center gap-2">
                    <CheckCircle size={18} className="text-green-500" />
                    Laboratorio Del Bienestar
                  </p>
                  <p className="text-sm text-green-700 ml-6">2 sucursales en Tizayuca • Resultados digitales • Sin cita</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="text-3xl font-bold text-green-700">$220</p>
                  <p className="text-xs text-green-600">MXN</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl opacity-75">
                <div>
                  <p className="font-medium text-gray-600">Otros laboratorios en Tizayuca</p>
                  <p className="text-xs text-gray-400">Precio no publicado en línea</p>
                </div>
                <p className="text-gray-400 text-sm shrink-0 ml-4">Sin información</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl opacity-75">
                <div>
                  <p className="font-medium text-gray-600">Salud Digna (sucursal más cercana)</p>
                  <p className="text-xs text-gray-400">Requiere traslado fuera de Tizayuca</p>
                </div>
                <p className="text-gray-400 text-sm shrink-0 ml-4">Precio referencial</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">* Precios actualizados a marzo 2026. Con seguro o convenio empresarial puede aplicar descuento.</p>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Preguntas frecuentes</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="font-bold text-gray-800 mb-1">¿Cuánto cuesta Prueba de Embarazo en Sangre (Beta-HCG) en Tizayuca?</h3>
                <p className="text-gray-600 text-sm">En Laboratorio Del Bienestar, el precio de Prueba de Embarazo en Sangre (Beta-HCG) es de <strong>$220 MXN</strong>. El precio incluye la toma de muestra, procesamiento en laboratorio certificado y entrega de resultados digitales en 24-48 horas.</p>
              </div>
              <div className="border-b border-gray-100 pb-4">
                <h3 className="font-bold text-gray-800 mb-1">¿Se necesita cita para Prueba de Embarazo en Sangre (Beta-HCG)?</h3>
                <p className="text-gray-600 text-sm">No es necesaria cita previa. Puedes llegar directamente a cualquiera de nuestras 2 sucursales en Tizayuca — Ignacio Galván 27 (Centro) o Av. Adolfo Mateos 43 (Nacozari) — lunes a viernes de 7AM a 8PM y sábados de 7AM a 6PM.</p>
              </div>
              <div className="border-b border-gray-100 pb-4">
                <h3 className="font-bold text-gray-800 mb-1">¿Cómo recibo mis resultados?</h3>
                <p className="text-gray-600 text-sm">Recibes tus resultados por <strong>correo electrónico o WhatsApp</strong> en 24 a 48 horas, dependiendo del tipo de estudio. También puedes consultarlos en nuestra plataforma digital con la clave única de tu orden.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">¿Tienen convenios con seguros médicos?</h3>
                <p className="text-gray-600 text-sm">Sí, trabajamos con varios seguros de gastos médicos y empresas. Comunícate por WhatsApp al <strong>771 685 4026</strong> para verificar si tu aseguradora tiene convenio con nosotros.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <div className="bg-green-900 text-white rounded-2xl p-6 shadow-xl sticky top-6">
            <div className="flex items-center gap-3 mb-4">
              <TestTube className="w-8 h-8 text-green-300" />
              <div>
                <p className="text-sm text-green-200">Hormonas</p>
                <p className="font-bold text-lg leading-tight">Prueba de Embarazo en Sangre (Beta-HCG)</p>
              </div>
            </div>

            <div className="text-center bg-white/10 rounded-xl py-4 mb-5">
              <p className="text-green-200 text-xs mb-1">Precio Tizayuca</p>
              <p className="text-4xl font-extrabold">$220</p>
              <p className="text-green-300 text-xs">MXN — IVA incluido</p>
            </div>

            <a
              href={`https://wa.me/527716854026?text=Hola,%20quiero%20realizarme%20Prueba%20de%20Embarazo%20en%20Sangre%20(Beta-HCG)%20en%20Tizayuca.%20¿Me%20pueden%20dar%20informacion?`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-white text-green-900 font-bold py-3.5 px-6 rounded-xl text-center hover:bg-green-50 transition-colors mb-3 text-lg"
            >
              📱 Cotizar por WhatsApp
            </a>

            <a
              href="tel:7757371811"
              className="block w-full bg-green-800 text-white font-medium py-3 px-6 rounded-xl text-center hover:bg-green-700 transition-colors mb-4"
            >
              📞 Llamar: 775 737 1811
            </a>

            <div className="space-y-2 text-sm text-green-200 border-t border-green-700 pt-4">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="shrink-0 mt-1" />
                <span>Ignacio Galván 27, Centro, Tizayuca</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="shrink-0 mt-1" />
                <span>Av. Adolfo Mateos 43, Col. Nacozari</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>Lun-Vie 7am-8pm | Sáb 7am-6pm</span>
              </div>
            </div>
          </div>

          {/* Related links */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">También te puede interesar</h3>
            <div className="space-y-2">
              <Link href="/precios" className="flex items-center gap-2 text-green-700 hover:underline text-sm">
                <ChevronRight size={14} /> Ver todos los precios
              </Link>
              <Link href="/herramientas" className="flex items-center gap-2 text-green-700 hover:underline text-sm">
                <ChevronRight size={14} /> Calculadoras clínicas gratis
              </Link>
              <Link href="/sintomas" className="flex items-center gap-2 text-green-700 hover:underline text-sm">
                <ChevronRight size={14} /> Buscar por síntoma
              </Link>
              <Link href="/paquetes" className="flex items-center gap-2 text-green-700 hover:underline text-sm">
                <ChevronRight size={14} /> Paquetes con descuento
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
