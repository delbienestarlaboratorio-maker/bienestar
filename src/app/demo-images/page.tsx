import { StudyImageCard } from '@/components/studies/StudyImageCard';

export default function StudyImageDemo() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">
                    Imágenes de Estudios - Diseño Profesional
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Orina */}
                    <StudyImageCard
                        studyName="EXAMEN GENERAL DE ORINA"
                        studyType="orina"
                    />

                    {/* Sangre */}
                    <StudyImageCard
                        studyName="BIOMETRÍA HEMÁTICA COMPLETA"
                        studyType="sangre"
                    />

                    {/* Hormonal */}
                    <StudyImageCard
                        studyName="PERFIL TIROIDEO COMPLETO"
                        studyType="hormonal"
                    />

                    {/* Radiología */}
                    <StudyImageCard
                        studyName="RAYOS X DE TÓRAX"
                        studyType="radiologia"
                    />

                    {/* Tomografía */}
                    <StudyImageCard
                        studyName="TOMOGRAFÍA COMPUTARIZADA"
                        studyType="tomografia"
                    />

                    {/* Resonancia */}
                    <StudyImageCard
                        studyName="RESONANCIA MAGNÉTICA CEREBRAL"
                        studyType="resonancia"
                    />

                    {/* Microbiología */}
                    <StudyImageCard
                        studyName="CULTIVO DE ORINA"
                        studyType="microbiologia"
                    />

                    {/* Inmunología */}
                    <StudyImageCard
                        studyName="ANTICUERPOS COVID-19"
                        studyType="inmunologia"
                    />

                    {/* Genética */}
                    <StudyImageCard
                        studyName="ESTUDIO GENÉTICO COMPLETO"
                        studyType="genetica"
                    />

                    {/* Cardiología */}
                    <StudyImageCard
                        studyName="ELECTROCARDIOGRAMA"
                        studyType="cardiologia"
                    />
                </div>

                <div className="mt-12 bg-white rounded-xl p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Características del Diseño
                    </h2>
                    <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span>Gradientes modernos de 3 colores por tipo de estudio</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span>Iconos profesionales de Lucide (librería premium)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span>Patrones SVG únicos (puntos, ondas, hexágonos, etc.)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span>Efectos de glassmorphism en barra inferior</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span>Animaciones suaves en hover</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span>Sombras y efectos de profundidad</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span>100% responsive y escalable</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span>Carga instantánea (no requiere imágenes)</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
