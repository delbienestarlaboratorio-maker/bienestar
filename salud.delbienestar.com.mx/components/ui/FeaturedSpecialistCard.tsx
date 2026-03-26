import React from 'react';
import Image from 'next/image';
import { Star, MapPin, Award, CheckCircle, Smartphone } from 'lucide-react';

interface SpecialistProps {
    id: string;
    name: string;
    specialty: string;
    cedula: string;
    rating: number;
    reviews: number;
    consultFee: string;
    location: string;
    imageUrl: string;
    whatsapp: string;
    whatsappMessage: string;
    badges: string[];
    tier: string;
}

export const FeaturedSpecialistCard = ({ specialist }: { specialist: SpecialistProps }) => {
    return (
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden border border-gray-100 flex flex-col md:flex-row mb-12 relative group hover:shadow-[0_8px_40px_rgb(59,130,246,0.15)] transition-all duration-300">
            {/* Ribbon for Exclusive/Elite tiers */}
            {(specialist.tier === 'Exclusive' || specialist.tier === 'Elite') && (
                <div className="absolute top-4 -right-8 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-10 py-1 rotate-45 shadow-md z-10">
                    {specialist.tier === 'Exclusive' ? 'Recomendado' : 'Especialista'}
                </div>
            )}

            {/* Photo Section */}
            <div className="w-full md:w-1/3 lg:w-1/4 relative h-64 md:h-auto bg-gray-200 shrink-0">
                <Image
                    src={specialist.imageUrl}
                    alt={specialist.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-l md:from-black/10"></div>

                {/* Mobile Rating Badge Overlay */}
                <div className="absolute bottom-4 left-4 md:hidden bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-bold text-gray-900 text-sm">{specialist.rating}</span>
                    <span className="text-gray-500 text-xs">({specialist.reviews})</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-2xl font-bold text-gray-900">{specialist.name}</h3>
                                <CheckCircle className="w-5 h-5 text-blue-500 hidden md:block" />
                            </div>
                            <p className="text-blue-700 font-semibold text-lg">{specialist.specialty}</p>
                            <p className="text-gray-400 text-xs mt-1">{specialist.cedula}</p>
                        </div>

                        {/* Desktop Rating Badge */}
                        <div className="hidden md:flex flex-col items-end">
                            <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span className="font-bold text-amber-900">{specialist.rating}</span>
                            </div>
                            <span className="text-gray-500 text-xs mt-1">{specialist.reviews} valoraciones</span>
                        </div>
                    </div>

                    {/* Features / Badges */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {specialist.badges.map((badge, idx) => (
                            <span key={idx} className="flex items-center gap-1 bg-blue-50 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-md border border-blue-100">
                                <Award className="w-3 h-3" /> {badge}
                            </span>
                        ))}
                    </div>

                    {/* Location & Fee */}
                    <div className="mt-5 space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                            <span>{specialist.location}</span>
                        </div>
                    </div>
                </div>

                {/* Call to Action Divider & Button */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                        <p className="text-gray-500 text-sm">Costo de valoración</p>
                        <p className="text-xl font-bold text-gray-900">{specialist.consultFee}</p>
                    </div>

                    <a
                        href={`https://wa.me/${specialist.whatsapp}?text=${encodeURIComponent(specialist.whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center gap-2 group/btn"
                    >
                        <Smartphone className="w-5 h-5 group-hover/btn:-rotate-12 transition-transform" />
                        Agendar Cita Directa
                    </a>
                </div>
            </div>
        </div>
    );
};
