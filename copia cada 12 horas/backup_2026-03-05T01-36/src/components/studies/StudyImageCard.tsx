'use client';

import { useState, useEffect } from 'react';

interface StudyImageProps {
    studyName: string;
    studyType?: string;
    className?: string;
}

// Mapeo de tipos de estudio a imágenes por defecto (categorías)
const STUDY_CATEGORY_IMAGES: Record<string, string> = {
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

// Función para convertir nombre de estudio a slug (nombre de archivo)
// Ej: "Biometría Hemática" -> "biometria-hematica"
function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD') // Separa acentos
        .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
        .replace(/\s+/g, '-') // Reemplaza espacios con guiones
        .replace(/[^\w\-]+/g, '') // Elimina caracteres no alfanuméricos
        .replace(/\-\-+/g, '-') // Reemplaza múltiples guiones
        .replace(/^-+/, '') // Trim guiones al inicio
        .replace(/-+$/, ''); // Trim guiones al final
}

// Función para detectar el tipo de estudio basado en el nombre (Lógica de Fallback)
function detectStudyType(studyName: string): string {
    const name = studyName.toLowerCase();

    // Análisis de Orina
    if (name.includes('orina') || name.includes('ego') || name.includes('urocultivo')) return 'orina';

    // Análisis de Sangre
    if (name.includes('sangre') || name.includes('biometría') || name.includes('hemática') ||
        name.includes('química') || name.includes('glucosa') || name.includes('hemoglobina') ||
        name.includes('colesterol') || name.includes('triglicéridos') || name.includes('creatinina') ||
        name.includes('urea') || name.includes('ácido úrico')) return 'sangre';

    // Estudios Hormonales
    if (name.includes('hormona') || name.includes('tiroideo') || name.includes('tiroides') ||
        name.includes('tsh') || name.includes('t3') || name.includes('t4') ||
        name.includes('cortisol') || name.includes('testosterona') || name.includes('estradiol') ||
        name.includes('progesterona') || name.includes('prolactina')) return 'hormonal';

    // Radiología
    if (name.includes('rayos x') || name.includes('radiografía') || name.includes('rx')) return 'radiologia';

    // Tomografía
    if (name.includes('tomografía') || name.includes('tac') || name.includes('resonancia')) return 'tomografia';

    // Cardiología
    if (name.includes('electro') || name.includes('ecg') || name.includes('cardio') ||
        name.includes('corazón')) return 'cardiologia';

    // Microbiología
    if (name.includes('cultivo') || name.includes('bacteria') || name.includes('copro') ||
        name.includes('parasito') || name.includes('exudado')) return 'microbiologia';

    // Genética/Inmunología
    if (name.includes('adn') || name.includes('gen') || name.includes('inmuno') ||
        name.includes('anticuerpo') || name.includes('vih') || name.includes('hepatitis')) return 'genetica';

    return 'default';
}

// Only these studies have dedicated images
const STUDIES_WITH_IMAGES = new Set([
    'biometria-hematica',
    'examen-general-orina-premium',
    'examen-general-orina',
    'quimica-sanguinea'
]);

export function StudyImageCard({ studyName, studyType, className = '' }: StudyImageProps) {
    const studySlug = slugify(studyName);
    const hasUniqueImage = STUDIES_WITH_IMAGES.has(studySlug);

    // Use category image by default unless the study has a dedicated image
    const type = studyType || detectStudyType(studyName);
    const categoryImagePath = STUDY_CATEGORY_IMAGES[type] || STUDY_CATEGORY_IMAGES['default'];
    const initialImage = hasUniqueImage ? `/images/studies/${studySlug}.png` : categoryImagePath;

    const [imgSrc, setImgSrc] = useState(initialImage);

    useEffect(() => {
        const slug = slugify(studyName);
        const hasImage = STUDIES_WITH_IMAGES.has(slug);
        const detectedType = studyType || detectStudyType(studyName);
        const fallback = STUDY_CATEGORY_IMAGES[detectedType] || STUDY_CATEGORY_IMAGES['default'];
        setImgSrc(hasImage ? `/images/studies/${slug}.png` : fallback);
    }, [studyName, studyType]);

    const displayName = studyName.length > 40
        ? studyName.substring(0, 37) + '...'
        : studyName;

    return (
        <div className={`relative w-full h-full rounded-lg overflow-hidden shadow-md ${className}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={imgSrc}
                alt={studyName}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                loading="lazy"
                onError={() => {
                    setImgSrc(categoryImagePath);
                }}
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
