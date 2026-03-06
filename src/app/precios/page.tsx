import Link from 'next/link';
import type { Metadata } from 'next';
import { TestTube, Search, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Precios de Análisis Clínicos en Tizayuca | Laboratorio Del Bienestar',
    description: 'Consulta los precios de análisis clínicos, radiología y ultrasonidos en Tizayuca, Hidalgo. Sin cita previa, resultados en 24-48 hrs. Laboratorio Del Bienestar.',
    alternates: { canonical: 'https://laboratorio.delbienestar.com.mx/precios' },
};

const STUDIES = [
    { slug: 'biometria-hematica-tizayuca', name: 'Biometría Hemática Completa', price: '$120', category: 'Análisis Clínicos' },
    { slug: 'quimica-sanguinea-tizayuca', name: 'Química Sanguínea 6 Elementos', price: '$180', category: 'Análisis Clínicos' },
    { slug: 'glucosa-tizayuca', name: 'Glucosa en Sangre', price: '$65', category: 'Análisis Clínicos' },
    { slug: 'examen-general-orina-tizayuca', name: 'Examen General de Orina (EGO)', price: '$80', category: 'Análisis Clínicos' },
    { slug: 'perfil-lipidico-tizayuca', name: 'Perfil Lipídico Completo', price: '$250', category: 'Análisis Clínicos' },
    { slug: 'hemoglobina-glicosilada-tizayuca', name: 'Hemoglobina Glicosilada (HbA1c)', price: '$220', category: 'Análisis Clínicos' },
    { slug: 'funcion-hepatica-tizayuca', name: 'Función Hepática Completa', price: '$380', category: 'Análisis Clínicos' },
    { slug: 'funcion-renal-tizayuca', name: 'Función Renal Completa', price: '$320', category: 'Análisis Clínicos' },
    { slug: 'tiroides-tsh-tizayuca', name: 'TSH (Tiroides)', price: '$280', category: 'Hormonas' },
    { slug: 'perfil-tiroideo-tizayuca', name: 'Perfil Tiroideo Completo', price: '$650', category: 'Hormonas' },
    { slug: 'prueba-embarazo-sangre-tizayuca', name: 'Beta-HCG (Embarazo en Sangre)', price: '$220', category: 'Hormonas' },
    { slug: 'perfil-hormonas-masculinas-tizayuca', name: 'Testosterona Total', price: '$350', category: 'Hormonas' },
    { slug: 'perfil-ovarios-tizayuca', name: 'Panel Hormonal Femenino', price: '$850', category: 'Hormonas' },
    { slug: 'vih-sida-tizayuca', name: 'Prueba VIH/SIDA', price: '$180', category: 'Análisis Clínicos' },
    { slug: 'vdrl-sifilis-tizayuca', name: 'VDRL (Sífilis)', price: '$120', category: 'Análisis Clínicos' },
    { slug: 'perfil-hepatitis-tizayuca', name: 'Panel Hepatitis B y C', price: '$680', category: 'Análisis Clínicos' },
    { slug: 'prueba-covid-antigenos-tizayuca', name: 'COVID-19 Antígenos Rápida', price: '$250', category: 'Análisis Clínicos' },
    { slug: 'cultivo-urocultivo-tizayuca', name: 'Urocultivo con Antibiograma', price: '$380', category: 'Microbiología' },
    { slug: 'cultivo-faringeo-tizayuca', name: 'Cultivo Faríngeo', price: '$350', category: 'Microbiología' },
    { slug: 'coprologia-parasitologico-tizayuca', name: 'Coproparasitoscópico', price: '$120', category: 'Análisis Clínicos' },
    { slug: 'electrocardiograma-tizayuca', name: 'Electrocardiograma (ECG)', price: '$250', category: 'Cardiología' },
    { slug: 'perfil-cardio-tizayuca', name: 'Riesgo Cardiovascular Completo', price: '$680', category: 'Cardiología' },
    { slug: 'rayos-x-torax-tizayuca', name: 'Rayos X de Tórax PA', price: '$180', category: 'Radiología' },
    { slug: 'rayos-x-columna-tizayuca', name: 'Rayos X de Columna Lumbosacra', price: '$320', category: 'Radiología' },
    { slug: 'densitometria-osea-tizayuca', name: 'Densitometría Ósea (DXA)', price: '$980', category: 'Radiología' },
    { slug: 'ultrasonido-abdominal-tizayuca', name: 'Ultrasonido Abdominal Completo', price: '$680', category: 'Ultrasonido' },
    { slug: 'ultrasonido-pelvico-tizayuca', name: 'Ultrasonido Pélvico / Transvaginal', price: '$550', category: 'Ultrasonido' },
    { slug: 'ultrasonido-tiroides-tizayuca', name: 'Ultrasonido de Tiroides', price: '$580', category: 'Ultrasonido' },
    { slug: 'ultrasonido-embarazo-tizayuca', name: 'Ultrasonido Obstétrico', price: '$650', category: 'Ultrasonido' },
    { slug: 'vitamina-d-tizayuca', name: 'Vitamina D (25-OH)', price: '$480', category: 'Vitaminas' },
    { slug: 'vitamina-b12-tizayuca', name: 'Vitamina B12 (Cobalamina)', price: '$380', category: 'Vitaminas' },
    { slug: 'hierro-serico-tizayuca', name: 'Hierro Sérico y TIBC', price: '$280', category: 'Análisis Clínicos' },
    { slug: 'ferritina-tizayuca', name: 'Ferritina Sérica', price: '$320', category: 'Análisis Clínicos' },
    { slug: 'acido-urico-tizayuca', name: 'Ácido Úrico', price: '$120', category: 'Análisis Clínicos' },
    { slug: 'factor-reumatoide-tizayuca', name: 'Factor Reumatoide (FR)', price: '$180', category: 'Reumatología' },
    { slug: 'proteina-c-reactiva-tizayuca', name: 'Proteína C Reactiva (PCR)', price: '$180', category: 'Análisis Clínicos' },
    { slug: 'grupo-sanguineo-tizayuca', name: 'Grupo Sanguíneo y Factor Rh', price: '$65', category: 'Análisis Clínicos' },
    { slug: 'curva-glucosa-tizayuca', name: 'Curva de Tolerancia a la Glucosa', price: '$380', category: 'Análisis Clínicos' },
    { slug: 'antigeno-prostatico-tizayuca', name: 'Antígeno Prostático (PSA)', price: '$320', category: 'Oncología' },
    { slug: 'antigeno-carcinoembrionario-tizayuca', name: 'Antígeno Carcinoembrionario (CEA)', price: '$380', category: 'Oncología' },
    { slug: 'alfa-fetoproteina-tizayuca', name: 'Alfa Fetoproteína (AFP)', price: '$350', category: 'Oncología' },
    { slug: 'papanicolau-tizayuca', name: 'Papanicolau (Citología Cervical)', price: '$250', category: 'Ginecología' },
    { slug: 'ratio-albuminuria-tizayuca', name: 'Microalbuminuria en Orina', price: '$280', category: 'Nefrología' },
    { slug: 'velocidad-sedimentacion-tizayuca', name: 'Velocidad de Sedimentación (VSG)', price: '$120', category: 'Análisis Clínicos' },
    { slug: 'control-diabetico-tizayuca', name: 'Control Diabético Completo', price: '$580', category: 'Análisis Clínicos' },
    { slug: 'examen-vista-optometria-tizayuca', name: 'Examen Optométrico Completo', price: '$350', category: 'Optometría' },
    { slug: 'gases-arteriales-tizayuca', name: 'Gasometría Arterial', price: '$450', category: 'Análisis Clínicos' },
    { slug: 'indice-tobillo-brazo-tizayuca', name: 'Índice Tobillo-Brazo (Doppler)', price: '$480', category: 'Cardiología' },
    { slug: 'coprologia-coproscopia-tizayuca', name: 'Coproscopia en Fresco', price: '$90', category: 'Análisis Clínicos' },
    { slug: 'antidepresivos-tamizaje-tizayuca', name: 'Tamizaje Neonatal Metabólico', price: '$1,200', category: 'Análisis Clínicos' },
];

const CATEGORIES = [...new Set(STUDIES.map(s => s.category))];

export default function PreciosPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <section className="bg-gradient-to-br from-green-900 to-green-700 text-white py-14">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Precios de Laboratorio en Tizayuca
                    </h1>
                    <p className="text-green-100 text-lg max-w-2xl mx-auto">
                        Consulta el precio exacto de más de 50 estudios clínicos, radiología y ultrasonidos.
                        Sin sorpresas, sin cita previa.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
                        <span className="bg-white/10 px-4 py-2 rounded-full">✅ Sin cita previa</span>
                        <span className="bg-white/10 px-4 py-2 rounded-full">✅ Resultados digitales</span>
                        <span className="bg-white/10 px-4 py-2 rounded-full">✅ 2 sucursales en Tizayuca</span>
                    </div>
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-4 py-12">
                {CATEGORIES.map(category => (
                    <div key={category} className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <TestTube className="text-green-700" size={24} />
                            {category}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {STUDIES.filter(s => s.category === category).map(study => (
                                <Link
                                    key={study.slug}
                                    href={`/precios/${study.slug}`}
                                    className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md hover:border-green-300 border border-transparent transition-all group"
                                >
                                    <div>
                                        <p className="font-medium text-gray-800 group-hover:text-green-700 transition-colors">
                                            {study.name}
                                        </p>
                                        <p className="text-xs text-gray-400">Tizayuca, Hidalgo</p>
                                    </div>
                                    <div className="text-right shrink-0 ml-3">
                                        <p className="text-xl font-bold text-green-700">{study.price}</p>
                                        <p className="text-xs text-gray-400">MXN</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

                {/* CTA bottom */}
                <div className="bg-green-900 text-white rounded-3xl p-8 text-center mt-8">
                    <h2 className="text-2xl font-bold mb-2">¿No encuentras tu estudio?</h2>
                    <p className="text-green-200 mb-6">Tenemos más de 2,000 estudios disponibles. Cotiza por WhatsApp en 2 minutos.</p>
                    <a
                        href="https://wa.me/527716854026?text=Hola,%20quisiera%20cotizar%20un%20estudio%20clínico"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-white text-green-900 font-bold py-3 px-8 rounded-xl hover:bg-green-50 transition-colors"
                    >
                        📱 Cotizar por WhatsApp
                    </a>
                </div>
            </div>
        </main>
    );
}
