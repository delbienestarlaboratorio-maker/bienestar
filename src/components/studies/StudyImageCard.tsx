'use client';

import Image from 'next/image';
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

export function StudyImageCard({ studyName, studyType, className = '' }: StudyImageProps) {
    // 1. Determinar imagen específica del estudio
    const studySlug = slugify(studyName);
    const uniqueImagePath = `/images/studies/${studySlug}.png`;

    // 2. Determinar imagen de respaldo (categoría)
    const type = studyType || detectStudyType(studyName);
    const categoryImagePath = STUDY_CATEGORY_IMAGES[type] || STUDY_CATEGORY_IMAGES['default'];

    // Estado para manejar el error de carga y cambiar al fallback
    const [imgSrc, setImgSrc] = useState(uniqueImagePath);
    const [hasError, setHasError] = useState(false);

    // Si cambia el nombre del estudio, reseteamos para intentar cargar la imagen única de nuevo
    useEffect(() => {
        setImgSrc(`/images/studies/${slugify(studyName)}.png`);
        setHasError(false);
    }, [studyName]);

    return (
        <div className={`relative w-full h-full rounded-lg overflow-hidden shadow-md ${className}`}>
            <Image
                src={imgSrc}
                alt={studyName}
                fill
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
                onError={() => {
                    // Si falla la imagen única, usar la de categoría
                    if (!hasError) {
                        setImgSrc(categoryImagePath);
                        setHasError(true);
                    }
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
