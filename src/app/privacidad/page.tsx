import Link from 'next/link';
import { ArrowLeft, Shield, Lock, FileText, Mail } from 'lucide-react';

export const metadata = {
    title: 'Aviso de Privacidad | Laboratorio Del Bienestar',
    description: 'Aviso de Privacidad conforme a la Ley Federal de Protección de Datos Personales en Posesión de Particulares y normativas de COFEPRIS.',
};

export default function PrivacidadPage() {
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
                        <Shield size={48} className="text-green-400" />
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            Aviso de Privacidad
                        </h1>
                    </div>
                    <p className="text-lg text-green-100">
                        Conforme a la Ley Federal de Protección de Datos Personales en Posesión de Particulares
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <Shield className="text-green-900" size={28} />
                            Identidad del Responsable
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            <strong>Laboratorio Clínico Del Bienestar</strong>, con domicilio en [Dirección completa de la sucursal principal],
                            es responsable del tratamiento de sus datos personales, de conformidad con la Ley Federal de Protección de Datos
                            Personales en Posesión de Particulares (LFPDPPP) y su Reglamento, así como las disposiciones aplicables de la
                            Comisión Federal para la Protección contra Riesgos Sanitarios (COFEPRIS).
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Para cualquier asunto relacionado con la protección de sus datos personales, puede contactarnos en:
                        </p>
                        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-800"><strong>Email:</strong> privacidad@laboratorio.delbienestar.com.mx</p>
                            <p className="text-gray-800"><strong>Teléfono:</strong> [Teléfono de contacto]</p>
                            <p className="text-gray-800"><strong>Horario de atención:</strong> Lunes a Viernes de 8:00 a 18:00 hrs</p>
                        </div>
                    </section>

                    {/* Datos recabados */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <FileText className="text-green-900" size={28} />
                            Datos Personales que Recabamos
                        </h2>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">1. Datos de Identificación</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Nombre completo</li>
                            <li>Fecha de nacimiento</li>
                            <li>Edad</li>
                            <li>Sexo</li>
                            <li>CURP</li>
                            <li>RFC (para facturación)</li>
                            <li>Identificación oficial (credencial de elector, pasaporte, etc.)</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2. Datos de Contacto</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Domicilio completo</li>
                            <li>Código postal</li>
                            <li>Teléfono fijo y/o celular</li>
                            <li>Correo electrónico</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3. Datos de Salud (Sensibles)</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Historia clínica</li>
                            <li>Resultados de estudios de laboratorio</li>
                            <li>Diagnósticos médicos</li>
                            <li>Tratamientos médicos</li>
                            <li>Información sobre alergias</li>
                            <li>Medicamentos que consume</li>
                            <li>Antecedentes médicos y familiares</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4. Datos Financieros</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Información de pago (tarjeta, efectivo, transferencia)</li>
                            <li>Datos de facturación (RFC, razón social, régimen fiscal)</li>
                            <li>Información de seguros médicos</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">5. Datos de Navegación</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Dirección IP</li>
                            <li>Tipo de navegador</li>
                            <li>Sistema operativo</li>
                            <li>Páginas visitadas</li>
                            <li>Cookies y tecnologías similares</li>
                        </ul>
                    </section>

                    {/* Finalidades */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <Lock className="text-green-900" size={28} />
                            Finalidades del Tratamiento
                        </h2>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Finalidades Primarias (Necesarias)</h3>
                        <p className="text-gray-700 mb-3">
                            Sus datos personales serán utilizados para las siguientes finalidades necesarias para el servicio:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Identificación del paciente</li>
                            <li>Prestación de servicios de análisis clínicos</li>
                            <li>Elaboración y entrega de resultados de estudios</li>
                            <li>Seguimiento médico y control de calidad</li>
                            <li>Cumplimiento de disposiciones legales sanitarias</li>
                            <li>Facturación de servicios</li>
                            <li>Atención de quejas y aclaraciones</li>
                            <li>Comunicación con el paciente sobre sus servicios</li>
                            <li>Cumplimiento de obligaciones derivadas de la relación contractual</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Finalidades Secundarias (No Necesarias)</h3>
                        <p className="text-gray-700 mb-3">
                            De manera adicional, sus datos personales podrán ser utilizados para:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Envío de promociones, descuentos y ofertas especiales</li>
                            <li>Mercadotecnia y publicidad de nuestros servicios</li>
                            <li>Encuestas de satisfacción</li>
                            <li>Prospección comercial</li>
                            <li>Invitaciones a eventos de salud y bienestar</li>
                        </ul>
                        <p className="text-gray-700 mt-4 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                            <strong>Importante:</strong> Si no desea que sus datos sean tratados para estas finalidades secundarias,
                            puede manifestar su negativa enviando un correo a privacidad@laboratorio.delbienestar.com.mx
                        </p>
                    </section>

                    {/* Datos sensibles */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Tratamiento de Datos Personales Sensibles
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Le informamos que para cumplir con las finalidades previstas en este aviso de privacidad,
                            serán tratados <strong>datos personales sensibles relacionados con su salud</strong>, tales como
                            resultados de laboratorio, diagnósticos, historia clínica y tratamientos médicos.
                        </p>
                        <p className="text-gray-700 leading-relaxed bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                            <strong>Consentimiento Expreso:</strong> El tratamiento de datos sensibles requiere su consentimiento
                            expreso y por escrito. Al solicitar nuestros servicios y firmar el formato de consentimiento informado,
                            usted otorga su consentimiento para el tratamiento de sus datos de salud.
                        </p>
                    </section>

                    {/* Transferencias */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Transferencia de Datos Personales
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Sus datos personales pueden ser transferidos y tratados fuera del domicilio del responsable,
                            dentro y fuera del país, por las siguientes personas:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li><strong>Médicos tratantes:</strong> Para interpretación y seguimiento de resultados</li>
                            <li><strong>Autoridades sanitarias (COFEPRIS, Secretaría de Salud):</strong> Por disposición legal</li>
                            <li><strong>Compañías de seguros:</strong> Para procesamiento de reembolsos (con su autorización)</li>
                            <li><strong>Proveedores de servicios tecnológicos:</strong> Para almacenamiento seguro de datos</li>
                            <li><strong>Autoridades fiscales (SAT):</strong> Para cumplimiento de obligaciones fiscales</li>
                        </ul>
                        <p className="text-gray-700 mt-4">
                            Todas las transferencias se realizan conforme a la LFPDPPP y con las medidas de seguridad apropiadas.
                        </p>
                    </section>

                    {/* Derechos ARCO */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Usted tiene derecho a:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li><strong>Acceder</strong> a sus datos personales que poseemos</li>
                            <li><strong>Rectificar</strong> datos incorrectos o incompletos</li>
                            <li><strong>Cancelar</strong> sus datos cuando considere que no están siendo utilizados adecuadamente</li>
                            <li><strong>Oponerse</strong> al tratamiento de sus datos para fines específicos</li>
                            <li><strong>Revocar</strong> su consentimiento para el tratamiento de datos</li>
                            <li><strong>Limitar</strong> el uso o divulgación de sus datos personales</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">¿Cómo ejercer sus derechos ARCO?</h3>
                        <p className="text-gray-700 mb-4">
                            Para ejercer sus derechos ARCO, debe presentar una solicitud por escrito a:
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-800"><strong>Email:</strong> privacidad@laboratorio.delbienestar.com.mx</p>
                            <p className="text-gray-800"><strong>Presencialmente:</strong> En cualquiera de nuestras sucursales</p>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Requisitos de la solicitud:</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Nombre completo y domicilio del titular</li>
                            <li>Copia de identificación oficial</li>
                            <li>Descripción clara de los datos personales sobre los que busca ejercer sus derechos</li>
                            <li>Cualquier documento que facilite la localización de sus datos</li>
                            <li>En caso de rectificación, indicar modificaciones y aportar documentación</li>
                        </ul>

                        <p className="text-gray-700 mt-4 bg-blue-50 p-4 rounded-lg">
                            <strong>Plazo de respuesta:</strong> 20 días hábiles contados desde la recepción de la solicitud.
                            Si la solicitud es procedente, se hará efectiva en 15 días hábiles siguientes.
                        </p>
                    </section>

                    {/* Revocación */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Revocación del Consentimiento
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            Usted puede revocar su consentimiento para el tratamiento de sus datos personales en cualquier momento,
                            siguiendo el mismo procedimiento que para ejercer sus derechos ARCO. Sin embargo, es importante que tenga
                            en cuenta que no en todos los casos podremos atender su solicitud o concluir el uso de forma inmediata,
                            ya que es posible que por alguna obligación legal requiramos seguir tratando sus datos personales.
                        </p>
                    </section>

                    {/* Cookies */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Uso de Cookies y Tecnologías de Rastreo
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Le informamos que en nuestra página web utilizamos cookies, web beacons y otras tecnologías de rastreo
                            para obtener datos personales como:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                            <li>Tipo de navegador del usuario</li>
                            <li>Tipo de sistema operativo</li>
                            <li>Páginas de internet visitadas</li>
                            <li>Tiempo de navegación</li>
                            <li>Análisis estadístico de la página web</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed">
                            Estas tecnologías pueden ser deshabilitadas en la configuración de su navegador. Sin embargo,
                            esto puede afectar su experiencia en nuestro sitio web.
                        </p>
                    </section>

                    {/* Seguridad */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Medidas de Seguridad
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            Hemos implementado medidas de seguridad administrativas, técnicas y físicas para proteger sus datos personales
                            contra daño, pérdida, alteración, destrucción o uso no autorizado, de acuerdo con la LFPDPPP y las disposiciones
                            de COFEPRIS, incluyendo:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-4">
                            <li>Cifrado de datos sensibles</li>
                            <li>Controles de acceso estrictos al personal</li>
                            <li>Sistemas de respaldo y recuperación</li>
                            <li>Protocolos de seguridad informática</li>
                            <li>Capacitación continua al personal</li>
                            <li>Auditorías periódicas de seguridad</li>
                        </ul>
                    </section>

                    {/* Cambios */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Cambios al Aviso de Privacidad
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            Nos reservamos el derecho de efectuar modificaciones o actualizaciones a este aviso de privacidad en cualquier momento,
                            para la atención de novedades legislativas, políticas internas o nuevos requerimientos para la prestación de servicios.
                        </p>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            Las modificaciones estarán disponibles en nuestro sitio web{' '}
                            <Link href="/privacidad" className="text-green-900 font-semibold hover:underline">
                                laboratorio.delbienestar.com.mx/privacidad
                            </Link>
                            {' '}y en nuestras sucursales.
                        </p>
                    </section>

                    {/* Autoridad */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Autoridad Competente
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            Si usted considera que su derecho a la protección de datos personales ha sido lesionado por alguna conducta
                            de nuestros empleados o de nuestras actuaciones o respuestas, puede interponer su inconformidad o denuncia ante el
                            Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI).
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg mt-4">
                            <p className="text-gray-800"><strong>INAI:</strong> www.inai.org.mx</p>
                            <p className="text-gray-800"><strong>Teléfono:</strong> 800 835 43 24</p>
                        </div>
                    </section>

                    {/* Contacto */}
                    <section className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                            <Mail className="text-green-900" size={28} />
                            Contacto para Asuntos de Privacidad
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Para cualquier duda o aclaración sobre este aviso de privacidad, contáctenos:
                        </p>
                        <div className="space-y-2 text-gray-800">
                            <p><strong>Email:</strong> privacidad@laboratorio.delbienestar.com.mx</p>
                            <p><strong>Teléfono:</strong> [Número de teléfono]</p>
                            <p><strong>Domicilio:</strong> [Dirección completa]</p>
                            <p><strong>Horario:</strong> Lunes a Viernes de 8:00 a 18:00 hrs</p>
                        </div>
                    </section>

                    {/* Aceptación */}
                    <section className="bg-gray-900 text-white p-6 rounded-lg">
                        <p className="text-sm leading-relaxed">
                            Al proporcionar sus datos personales y utilizar nuestros servicios, usted reconoce haber leído y aceptado
                            el presente Aviso de Privacidad en su totalidad, así como los{' '}
                            <Link href="/terminos" className="text-green-400 hover:underline font-semibold">
                                Términos y Condiciones
                            </Link>{' '}
                            de uso del sitio web.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
