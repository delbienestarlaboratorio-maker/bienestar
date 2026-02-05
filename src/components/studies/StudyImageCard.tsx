'use client';

import {
    Droplet,
    Heart,
    Activity,
    Scan,
    Brain,
    Microscope,
    Shield,
    Dna,
    Zap,
    TestTube
} from 'lucide-react';

interface StudyImageProps {
    studyName: string;
    studyType?: string;
    className?: string;
}

// Configuración de iconos y estilos por tipo de estudio
const STUDY_CONFIGS = {
    orina: {
        icon: TestTube,
        gradient: 'from-amber-400 via-orange-500 to-orange-600',
        iconColor: 'text-white',
        pattern: 'dots',
        shadow: 'shadow-orange-500/50'
    },
    sangre: {
        icon: Droplet,
        gradient: 'from-red-500 via-rose-600 to-red-700',
        iconColor: 'text-white',
        pattern: 'waves',
        shadow: 'shadow-red-500/50'
    },
    hormonal: {
        icon: Activity,
        gradient: 'from-purple-500 via-violet-600 to-purple-700',
        iconColor: 'text-white',
        pattern: 'grid',
        shadow: 'shadow-purple-500/50'
    },
    radiologia: {
        icon: Scan,
        gradient: 'from-blue-500 via-cyan-600 to-blue-700',
        iconColor: 'text-white',
        pattern: 'lines',
        shadow: 'shadow-blue-500/50'
    },
    tomografia: {
        icon: Scan,
        gradient: 'from-teal-500 via-emerald-600 to-teal-700',
        iconColor: 'text-white',
        pattern: 'circles',
        shadow: 'shadow-teal-500/50'
    },
    resonancia: {
        icon: Brain,
        gradient: 'from-violet-500 via-purple-600 to-indigo-700',
        iconColor: 'text-white',
        pattern: 'hexagons',
        shadow: 'shadow-violet-500/50'
    },
    microbiologia: {
        icon: Microscope,
        gradient: 'from-green-500 via-emerald-600 to-green-700',
        iconColor: 'text-white',
        pattern: 'hexagons',
        shadow: 'shadow-green-500/50'
    },
    inmunologia: {
        icon: Shield,
        gradient: 'from-pink-500 via-rose-600 to-pink-700',
        iconColor: 'text-white',
        pattern: 'waves',
        shadow: 'shadow-pink-500/50'
    },
    genetica: {
        icon: Dna,
        gradient: 'from-indigo-500 via-blue-600 to-indigo-700',
        iconColor: 'text-white',
        pattern: 'hexagons',
        shadow: 'shadow-indigo-500/50'
    },
    cardiologia: {
        icon: Heart,
        gradient: 'from-red-600 via-rose-700 to-red-800',
        iconColor: 'text-white',
        pattern: 'waves',
        shadow: 'shadow-red-600/50'
    },
    default: {
        icon: Zap,
        gradient: 'from-gray-500 via-slate-600 to-gray-700',
        iconColor: 'text-white',
        pattern: 'grid',
        shadow: 'shadow-gray-500/50'
    }
};

// Patrones SVG de fondo
const BackgroundPattern = ({ pattern }: { pattern: string }) => {
    switch (pattern) {
        case 'dots':
            return (
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="2" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
            );

        case 'waves':
            return (
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="waves" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M0 50 Q 25 25, 50 50 T 100 50" stroke="white" strokeWidth="2" fill="none" />
                            <path d="M0 70 Q 25 45, 50 70 T 100 70" stroke="white" strokeWidth="2" fill="none" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#waves)" />
                </svg>
            );

        case 'grid':
            return (
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            );

        case 'circles':
            return (
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="circles" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                            <circle cx="30" cy="30" r="20" stroke="white" strokeWidth="2" fill="none" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circles)" />
                </svg>
            );

        case 'hexagons':
            return (
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="hexagons" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse">
                            <polygon points="28,0 56,17 56,51 28,68 0,51 0,17" stroke="white" strokeWidth="2" fill="none" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hexagons)" />
                </svg>
            );

        case 'lines':
            return (
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <line x1="0" y1="0" x2="40" y2="40" stroke="white" strokeWidth="2" />
                            <line x1="40" y1="0" x2="0" y2="40" stroke="white" strokeWidth="2" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#lines)" />
                </svg>
            );

        default:
            return null;
    }
};

export function StudyImageCard({ studyName, studyType = 'default', className = '' }: StudyImageProps) {
    const config = STUDY_CONFIGS[studyType as keyof typeof STUDY_CONFIGS] || STUDY_CONFIGS.default;
    const Icon = config.icon;

    // Acortar nombre si es demasiado largo para mobile
    const displayName = studyName.length > 35 ? studyName.substring(0, 32) + '...' : studyName;

    return (
        <div className={`relative w-full aspect-square rounded-xl overflow-hidden ${className}`}>
            {/* Gradiente de fondo SIMPLIFICADO */}
            <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`} />

            {/* Icono MÁS GRANDE Y CLARO */}
            <div className="absolute inset-0 flex items-center justify-center">
                <Icon
                    className={`${config.iconColor} opacity-90`}
                    size={100}
                    strokeWidth={2}
                />
            </div>

            {/* Texto MÁS LEGIBLE Y GRANDE */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/30">
                <h3 className="text-white font-bold text-xl md:text-2xl text-center leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mb-2">
                    {displayName}
                </h3>
                <p className="text-white/90 font-semibold text-base md:text-lg uppercase tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    {studyType.replace('_', ' ')}
                </p>
            </div>
        </div>
    );
}
