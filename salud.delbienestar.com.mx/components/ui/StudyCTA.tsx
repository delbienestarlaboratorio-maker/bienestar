import React from 'react';
import Link from 'next/link';
import { Stethoscope, ArrowRight, Activity, Beaker } from 'lucide-react';

interface StudyCTAProps {
    title?: string;
    description: string;
    actionText?: string;
    link?: string;
    type?: 'estudio' | 'checkup' | 'doctor';
}

export const StudyCTA: React.FC<StudyCTAProps> = ({
    title = '¿Necesitas confirmar tus resultados?',
    description,
    actionText = 'Cotizar Estudio',
    link = 'https://wa.me/527757371811?text=Hola,%20me%20gustar%C3%ADa%20cotizar%20un%20estudio%20m%C3%A9dico',
    type = 'estudio'
}) => {
    // Definimos iconos y colores según el tipo de recomendación
    const config = {
        estudio: {
            icon: Beaker,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            btnColor: 'bg-blue-600 hover:bg-blue-700'
        },
        checkup: {
            icon: Activity,
            color: 'text-green-600',
            bg: 'bg-green-50',
            border: 'border-green-200',
            btnColor: 'bg-green-600 hover:bg-green-700'
        },
        doctor: {
            icon: Stethoscope,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            border: 'border-purple-200',
            btnColor: 'bg-purple-600 hover:bg-purple-700'
        }
    };

    const style = config[type];
    const Icon = style.icon;

    // Detectar si el enlace es externo (WhatsApp) o interno
    const isExternal = link.startsWith('http');

    return (
        <div className={`mt-8 ${style.bg} border-2 ${style.border} rounded-2xl p-6 shadow-sm`}>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 bg-white rounded-lg shadow-sm ${style.color}`}>
                            <Icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                    </div>

                    <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-4">
                        {description}
                    </p>
                    <p className="text-xs text-gray-500 italic">
                        * Recuerda que estos resultados son orientativos y no sustituyen el diagnóstico de un médico.
                    </p>
                </div>

                <div className="w-full md:w-auto shrink-0 flex flex-col gap-3">
                    {isExternal ? (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-center gap-2 ${style.btnColor} text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5`}
                        >
                            {actionText}
                            <ArrowRight size={20} />
                        </a>
                    ) : (
                        <Link
                            href={link}
                            className={`flex items-center justify-center gap-2 ${style.btnColor} text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5`}
                        >
                            {actionText}
                            <ArrowRight size={20} />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};
