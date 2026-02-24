'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Award, Users, TestTube, Star, Clock } from 'lucide-react';

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, target]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}{count.toLocaleString('es-MX')}{suffix}
        </span>
    );
}

const stats = [
    { icon: TestTube, label: 'Estudios Disponibles', value: 2000, suffix: '+', color: 'from-blue-500 to-cyan-500' },
    { icon: Users, label: 'Pacientes Atendidos', value: 15000, suffix: '+', color: 'from-green-500 to-emerald-500' },
    { icon: Clock, label: 'Años de Experiencia', value: 10, suffix: '+', color: 'from-purple-500 to-pink-500' },
    { icon: Star, label: 'Calificación Google', value: 4.8, suffix: '★', color: 'from-amber-500 to-orange-500' },
];

const certifications = [
    { icon: Shield, title: 'COFEPRIS', desc: 'Licencia sanitaria vigente' },
    { icon: Award, title: 'Calidad Certificada', desc: 'Equipos de última generación' },
];

export const TrustBadges = () => {
    return (
        <section className="relative py-20 px-4 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-6xl mx-auto">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        ¿Por qué confiar en nosotros?
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Respaldados por certificaciones oficiales, tecnología de punta y miles de pacientes satisfechos.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center group"
                            >
                                <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                    <Icon size={24} className="text-white" />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                                    <AnimatedCounter
                                        target={stat.value}
                                        suffix={stat.suffix}
                                    />
                                </div>
                                <p className="text-gray-400 text-sm">{stat.label}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Certifications */}
                <div className="grid md:grid-cols-2 gap-6">
                    {certifications.map((cert, i) => {
                        const Icon = cert.icon;
                        return (
                            <motion.div
                                key={cert.title}
                                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center gap-5 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
                            >
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shrink-0">
                                    <Icon size={28} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">{cert.title}</h3>
                                    <p className="text-gray-400 text-sm">{cert.desc}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
