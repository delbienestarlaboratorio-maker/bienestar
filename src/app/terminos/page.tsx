import Link from 'next/link';
import { ArrowLeft, FileText, Scale, AlertCircle, CheckCircle } from 'lucide-react';

export const metadata = {
    title: 'Términos y Condiciones | Laboratorio Del Bienestar',
    description: 'Términos y Condiciones de Uso del sitio web y servicios de Laboratorio Del Bienestar. Derechos y obligaciones de los usuarios.',
};

export default function TerminosPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-900 to-green-700 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white hover:text-green-200 mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Volver al inicio
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <Scale size={48} className="text-green-400" />
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            Términos y Condiciones
                        </h1>
                    </div>
                    <p className="text-lg text-green-100">
                        Condiciones de uso del sitio web y servicios de laboratorio
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8">

                    {/* Última actualización */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <p className="text-sm text-blue-900">
                            <strong>Última actualización:</strong> 5 de febrero de 2026
                        </p>
                    </div>

                    {/* Introducción */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            1. Aceptación de los Términos
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Bienvenido a <strong>Laboratorio Clínico Del Bienestar</strong>. Al acceder y utilizar este sitio web
                            (laboratorio.delbienestar.com.mx) y nuestros servicios, usted acepta estar legalmente vinculado por estos
                            términos y condiciones, así como por nuestro{' '}
                            <Link href="/privacidad" className="text-green-900 font-semibold hover:underline">
                                Aviso de Privacidad
                            </Link>.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Si no está de acuerdo con alguno de estos términos, le solicitamos que no utilice nuestro sitio web ni
                            nuestros servicios.
                        </p>
                    </section>

                    {/* Definiciones */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            2. Definiciones
                        </h2>
                        <ul className="space-y-3 text-gray-700">
                            <li>
                                <strong className="text-gray-900">"Laboratorio" o "Del Bienestar":</strong> Se refiere a Laboratorio
                                Clínico Del Bienestar y todas sus sucursales.
                            </li>
                            <li>
                                <strong className="text-gray-900">"Sitio Web":</strong> Plataforma digital accesible en
                                laboratorio.delbienestar.com.mx
                            </li>
                            <li>
                                <strong className="text-gray-900">"Usuario" o "Paciente":</strong> Cualquier persona que accede y
                                utiliza nuestro sitio web o servicios.
                            </li>
                            <li>
                                <strong className="text-gray-900">"Servicios":</strong> Análisis clínicos, estudios de laboratorio,
                                sueroterapia y demás servicios médicos ofrecidos.
                            </li>
                            <li>
                                <strong className="text-gray-900">"Contenido":</strong> Información, textos, imágenes, videos y demás
                                material publicado en el sitio.
                            </li>
                        </ul>
                    </section>

                    {/* Uso del sitio */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <FileText className="text-green-900" size={28} />
                            3. Uso del Sitio Web
                        </h2>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Licencia de Uso</h3>
                        <p className="text-gray-700 mb-4">
                            Le otorgamos una licencia limitada, no exclusiva, no transferible y revocable para acceder y usar
                            nuestro sitio web para fines personales y no comerciales.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Usos Prohibidos</h3>
                        <p className="text-gray-700 mb-3">
                            Usted se compromete a NO:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Usar el sitio para cualquier propósito ilegal o no autorizado</li>
                            <li>Intentar obtener acceso no autorizado a sistemas o redes</li>
                            <li>Transmitir virus, malware o código malicioso</li>
                            <li>Recopilar información de otros usuarios sin su consentimiento</li>
                            <li>Usar robots, spiders o herramientas automatizadas sin autorización</li>
                            <li>Reproducir, duplicar, copiar o revender cualquier parte del sitio</li>
                            <li>Hacerse pasar por otra persona o entidad</li>
                            <li>Interferir con el funcionamiento del sitio</li>
                        </ul>
                    </section>

                    {/* Servicios médicos */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            4. Servicios de Laboratorio Clínico
                        </h2>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Naturaleza de los Servicios</h3>
                        <p className="text-gray-700 mb-4">
                            Nuestros servicios de análisis clínicos están autorizados por la Comisión Federal para la Protección
                            contra Riesgos Sanitarios (COFEPRIS) y cumplen con la normatividad sanitaria vigente en México.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Requisitos para el Servicio</h3>
                        <p className="text-gray-700 mb-3">
                            Para recibir nuestros servicios, usted debe:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Proporcionar información veraz y completa</li>
                            <li>Presentar identificación oficial vigente</li>
                            <li>Firmar el consentimiento informado cuando se requiera</li>
                            <li>Seguir las indicaciones de preparación para estudios</li>
                            <li>Cumplir con las instrucciones del personal médico</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.3 Orden Médica</h3>
                        <p className="text-gray-700">
                            Algunos estudios requieren orden médica. El Laboratorio se reserva el derecho de solicitar dicha
                            orden para estudios especializados o de acuerdo con la normatividad sanitaria.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.4 Resultados</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Los resultados son de carácter confidencial y se entregan únicamente al paciente o representante legal</li>
                            <li>Los tiempos de entrega son estimados y pueden variar</li>
                            <li>Los resultados deben ser interpretados por un médico</li>
                            <li>El laboratorio no emite diagnósticos médicos</li>
                            <li>Los resultados se conservan de acuerdo con la NOM-004-SSA3-2012</li>
                        </ul>
                    </section>

                    {/* Precios y pagos */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            5. Precios y Formas de Pago
                        </h2>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Precios</h3>
                        <p className="text-gray-700 mb-4">
                            Los precios mostrados en el sitio web están expresados en pesos mexicanos (MXN) y pueden estar sujetos a cambios sin previo aviso.
                            Los precios vigentes son los mostrados al momento de la prestación del servicio.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Formas de Pago</h3>
                        <p className="text-gray-700 mb-3">
                            Aceptamos las siguientes formas de pago:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Efectivo</li>
                            <li>Tarjetas de débito y crédito</li>
                            <li>Transferencias electrónicas</li>
                            <li>Seguros médicos (de acuerdo a convenios vigentes)</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">5.3 Facturación</h3>
                        <p className="text-gray-700">
                            Las facturas deben solicitarse el mismo mes en que se realizó el pago, de acuerdo con las disposiciones
                            fiscales vigentes. Consulte nuestro proceso de{' '}
                            <Link href="/facturacion" className="text-green-900 font-semibold hover:underline">
                                solicitud de factura
                            </Link>.
                        </p>
                    </section>

                    {/* Cancelaciones */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            6. Política de Cancelaciones y Reembolsos
                        </h2>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Cancelaciones</h3>
                        <p className="text-gray-700 mb-4">
                            Las citas pueden cancelarse sin cargo hasta 2 horas antes del horario programado.
                            Cancelaciones posteriores o inasistencias no son reembolsables.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Reembolsos</h3>
                        <p className="text-gray-700 mb-3">
                            Los reembolsos se otorgan únicamente en los siguientes casos:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Error en el cobro</li>
                            <li>Imposibilidad del laboratorio para prestar el servicio</li>
                            <li>Duplicidad de pago</li>
                        </ul>
                        <p className="text-gray-700 mt-4">
                            Los reembolsos se procesan en un plazo de 15 días hábiles y se realizan mediante el mismo
                            método de pago original.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">6.3 No Reembolsable</h3>
                        <p className="text-gray-700">
                            Una vez tomada la muestra y procesado el estudio, el servicio NO es reembolsable,
                            salvo error imputable al laboratorio.
                        </p>
                    </section>

                    {/* Propiedad intelectual */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            7. Propiedad Intelectual
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Todo el contenido del sitio web, incluyendo pero no limitado a textos, gráficos, logotipos, íconos,
                            imágenes, clips de audio, descargas digitales y compilaciones de datos, es propiedad de Laboratorio
                            Del Bienestar o sus proveedores de contenido y está protegido por las leyes mexicanas e internacionales
                            de derechos de autor y propiedad intelectual.
                        </p>
                        <p className="text-gray-700">
                            Las marcas comerciales, marcas de servicio y logotipos utilizados y mostrados en este sitio web son
                            marcas registradas y no registradas de Laboratorio Del Bienestar. Ninguna licencia o derecho se otorga
                            para usar dichas marcas.
                        </p>
                    </section>

                    {/* Enlaces externos */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            8. Enlaces Externos
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Este sitio web puede contener enlaces a sitios web de terceros. Estos enlaces se proporcionan únicamente
                            para su conveniencia. No tenemos control sobre el contenido de esos sitios y no asumimos responsabilidad
                            alguna por ellos o por cualquier pérdida o daño que pueda surgir de su uso.
                        </p>
                    </section>

                    {/* Responsabilidades */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <AlertCircle className="text-amber-600" size={28} />
                            9. Limitación de Responsabilidad
                        </h2>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">9.1 Información Médica</h3>
                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                            <p className="text-gray-700">
                                <strong>ADVERTENCIA IMPORTANTE:</strong> La información proporcionada en este sitio web es de carácter
                                informativo y educativo únicamente. NO constituye consejo médico profesional, diagnóstico o tratamiento.
                                Siempre consulte a su médico o profesional de la salud calificado para cualquier pregunta sobre una
                                condición médica.
                            </p>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">9.2 Exactitud de la Información</h3>
                        <p className="text-gray-700 mb-4">
                            Aunque nos esforzamos por mantener la información actualizada y precisa, no garantizamos la exactitud,
                            integridad o actualidad de cualquier información en este sitio web.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">9.3 Disponibilidad del Sitio</h3>
                        <p className="text-gray-700 mb-4">
                            No garantizamos que el sitio web estará disponible de forma ininterrumpida o libre de errores.
                            Podemos suspender, retirar o modificar todo o cualquier parte del sitio sin previo aviso.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">9.4 Exclusión de Garantías</h3>
                        <p className="text-gray-700">
                            El sitio web se proporciona "tal cual" y "según disponibilidad" sin garantías de ningún tipo,
                            ya sean expresas o implícitas, incluidas las garantías implícitas de comerciabilidad,
                            idoneidad para un propósito particular y no infracción.
                        </p>
                    </section>

                    {/* Privacidad */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            10. Privacidad y Protección de Datos
                        </h2>
                        <p className="text-gray-700">
                            El tratamiento de sus datos personales se realiza de conformidad con nuestro{' '}
                            <Link href="/privacidad" className="text-green-900 font-semibold hover:underline">
                                Aviso de Privacidad
                            </Link>
                            , el cual forma parte integral de estos términos y condiciones. Al usar nuestro sitio web y servicios,
                            usted reconoce haber leído y aceptado el aviso de privacidad en su totalidad.
                        </p>
                    </section>

                    {/* Indemnización */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            11. Indemnización
                        </h2>
                        <p className="text-gray-700">
                            Usted acepta indemnizar, defender y mantener indemne a Laboratorio Del Bienestar, sus directores,
                            empleados, agentes y proveedores de y contra todas las pérdidas, gastos, daños y costos, incluidos
                            los honorarios razonables de abogados, resultantes de cualquier violación a estos términos y condiciones
                            o cualquier actividad relacionada con su uso del sitio web.
                        </p>
                    </section>

                    {/* Ley aplicable */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            12. Ley Aplicable y Jurisdicción
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes de los Estados Unidos
                            Mexicanos, incluyendo pero no limitado a:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Ley General de Salud</li>
                            <li>Ley Federal de Protección de Datos Personales en Posesión de Particulares</li>
                            <li>Ley Federal de Protección al Consumidor</li>
                            <li>Código Civil Federal</li>
                            <li>Normatividad de COFEPRIS</li>
                        </ul>
                        <p className="text-gray-700 mt-4">
                            Para cualquier controversia derivada de estos términos, las partes se someten a la jurisdicción
                            de los tribunales competentes en [Ciudad, Estado], renunciando expresamente a cualquier otro fuero
                            que pudiera corresponderles por razón de su domicilio presente o futuro.
                        </p>
                    </section>

                    {/* Modificaciones */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            13. Modificaciones a los Términos
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento.
                            Las modificaciones entrarán en vigor inmediatamente después de su publicación en este sitio web.
                        </p>
                        <p className="text-gray-700">
                            Es su responsabilidad revisar periódicamente estos términos para estar al tanto de las actualizaciones.
                            El uso continuado del sitio web después de cualquier modificación constituye su aceptación de los
                            términos modificados.
                        </p>
                    </section>

                    {/* Separabilidad */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            14. Separabilidad
                        </h2>
                        <p className="text-gray-700">
                            Si cualquier disposición de estos términos y condiciones es considerada inválida o inaplicable por
                            un tribunal competente, dicha disposición se eliminará o limitará en la medida mínima necesaria,
                            y las disposiciones restantes de estos términos continuarán en pleno vigor y efecto.
                        </p>
                    </section>

                    {/* Integridad */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            15. Integridad del Acuerdo
                        </h2>
                        <p className="text-gray-700">
                            Estos términos y condiciones, junto con nuestro Aviso de Privacidad, constituyen el acuerdo completo
                            entre usted y Laboratorio Del Bienestar con respecto al uso del sitio web y los servicios,
                            y reemplazan todos los acuerdos anteriores o contemporáneos entre usted y Laboratorio Del Bienestar.
                        </p>
                    </section>

                    {/* Normatividad */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <CheckCircle className="text-green-900" size={28} />
                            16. Cumplimiento Normativo
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Laboratorio Del Bienestar cumple con la siguiente normatividad mexicana:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li><strong>NOM-007-SSA3-2011:</strong> Organización y funcionamiento de laboratorios clínicos</li>
                            <li><strong>NOM-166-SSA1-1997:</strong> Prestación de servicios de salud</li>
                            <li><strong>NOM-004-SSA3-2012:</strong> Expediente clínico</li>
                            <li><strong>NOM-253-SSA1-2012:</strong> Disposición de sangre humana y sus componentes</li>
                            <li><strong>LFPDPPP:</strong> Protección de datos personales</li>
                            <li><strong>Ley General de Salud</strong></li>
                            <li><strong>Reglamento de la Ley General de Salud en materia de prestación de servicios de atención médica</strong></li>
                        </ul>
                    </section>

                    {/* Contacto */}
                    <section className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            17. Contacto
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Para cualquier pregunta, comentario o inquietud sobre estos términos y condiciones, puede contactarnos:
                        </p>
                        <div className="space-y-2 text-gray-800">
                            <p><strong>Email:</strong> contacto@laboratorio.delbienestar.com.mx</p>
                            <p><strong>Teléfono:</strong> [Número de teléfono]</p>
                            <p><strong>Dirección:</strong> [Dirección completa]</p>
                            <p><strong>Horario de atención:</strong> Lunes a Viernes de 8:00 a 18:00 hrs, Sábados de 8:00 a 14:00 hrs</p>
                        </div>
                    </section>

                    {/* Aceptación final */}
                    <section className="bg-gray-900 text-white p-6 rounded-lg">
                        <p className="text-sm leading-relaxed mb-4">
                            <strong className="block mb-2 text-lg">Última Actualización: 5 de febrero de 2026</strong>
                            Al utilizar nuestro sitio web y servicios, usted reconoce haber leído, entendido y aceptado estos
                            términos y condiciones en su totalidad, así como nuestro{' '}
                            <Link href="/privacidad" className="text-green-400 hover:underline font-semibold">
                                Aviso de Privacidad
                            </Link>.
                        </p>
                        <p className="text-sm text-green-400">
                            © 2026 Laboratorio Clínico Del Bienestar. Todos los derechos reservados.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
