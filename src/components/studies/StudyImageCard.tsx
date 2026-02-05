'use client';

import Image from 'next/image';

interface StudyImageProps {
    studyName: string;
    studyType?: string;
    className?: string;
}

// Mapeo de tipos de estudio a imágenes
const STUDY_IMAGE_MAP: Record<string, string> = {
    'orina': '/images/categories/orina.png',
    'sangre': '/images/categories/sangre.png',
    'hormonal': '/images/categories/hormonal.png',
    'radiologia': '/images/categories/radiologia.png',
    'microbiologia': '/images/categories/microbiologia.png',
    'genetica': '/images/categories/genetica.png',
    'cardiologia': '/images/categories/cardiologia.png',
    'tomografia': '/images/categories/tomografia.png',
    'default': '/images/categories/default.png'
};

// Función para detectar el tipo de estudio basado en el nombre
function detectStudyType(studyName: string): string {
    const name = studyName.toLowerCase();

    // Análisis de Orina
    if (name.includes('orina') || name.includes('ego') || name.includes('urocultivo')) {
        return 'orina';
    }

    // Análisis de Sangre
    if (name.includes('sangre') || name.includes('biometría') || name.includes('hemática') ||
        name.includes('química') || name.includes('glucosa') || name.includes('hemoglobina') ||
        name.includes('colesterol') || name.includes('triglicéridos') || name.includes('creatinina') ||
        name.includes('urea') || name.includes('ácido úrico')) {
        return 'sangre';
    }

    // Estudios Hormonales
    if (name.includes('hormona') || name.includes('tiroideo') || name.includes('tiroides') ||
        name.includes('tsh') || name.includes('t3') || name.includes('t4') ||
        name.includes('cortisol') || name.includes('testosterona') || name.includes('estradiol') ||
        name.includes('progesterona') || name.includes('prolactina')) {
        return 'hormonal';
    }

    // Radiología
    if (name.includes('rayos x') || name.includes('radiografía') || name.includes('rx')) {
        return 'radiologia';
    }

    // Tomografía
    if (name.includes('tomografía') || name.includes('tac') || name.includes('resonancia')) {
        return 'tomografia';
    }

    // Cardiología
    if (name.includes('electro') || name.includes('ecg') || name.includes('cardio') ||
        name.includes('corazón')) {
        return 'cardiologia';
    }

    // Microbiología
    if (name.includes('cultivo') || name.includes('bacteria') || name.includes('copro') ||
        name.includes('parasito') || name.includes('exudado')) {
        return 'microbiologia';
    }

    // Genética/Inmunología
    if (name.includes('adn') || name.includes('gen') || name.includes('inmuno') ||
        name.includes('anticuerpo') || name.includes('vih') || name.includes('hepatitis')) {
        return 'genetica';
    }

    return 'default';
}

export function StudyImageCard({ studyName, studyType, className = '' }: StudyImageProps) {
    // Detectar tipo de estudio si no se proporciona
    const type = studyType || detectStudyType(studyName);
    const imagePath = STUDY_IMAGE_MAP[type] || STUDY_IMAGE_MAP['default'];

    // Truncar nombre si es muy largo
    const displayName = studyName.length > 40
        ? studyName.substring(0, 37) + '...'
        : studyName;

    return (
        <div className={`relative w-full h-full rounded-lg overflow-hidden shadow-md ${className}`}>
            <Image
                src={imagePath}
                alt={studyName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
            />

            {/* Overlay con nombre del estudio */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                <h3 className="text-white font-bold text-sm md:text-base leading-tight drop-shadow-lg">
                    {displayName}
                </h3>
            </div>
        </div>
    );
}
