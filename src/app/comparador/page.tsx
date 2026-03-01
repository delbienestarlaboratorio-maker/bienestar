'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, X, ArrowLeftRight, DollarSign, Clock, Beaker, CheckCircle, XCircle } from 'lucide-react';
import { searchStudiesForComparador } from './actions';

export default function ComparadorPage() {
    const [searchA, setSearchA] = useState('');
    const [searchB, setSearchB] = useState('');
    const [studyA, setStudyA] = useState<any>(null);
    const [studyB, setStudyB] = useState<any>(null);
    const [showDropA, setShowDropA] = useState(false);
    const [showDropB, setShowDropB] = useState(false);

    const [filteredA, setFilteredA] = useState<any[]>([]);
    const [filteredB, setFilteredB] = useState<any[]>([]);

    useEffect(() => {
        if (searchA.length >= 2) {
            searchStudiesForComparador(searchA).then(setFilteredA);
        } else {
            setFilteredA([]);
        }
    }, [searchA]);

    useEffect(() => {
        if (searchB.length >= 2) {
            searchStudiesForComparador(searchB).then(setFilteredB);
        } else {
            setFilteredB([]);
        }
    }, [searchB]);

    const selectA = (s: any) => { setStudyA(s); setSearchA(s.name); setShowDropA(false); };
    const selectB = (s: any) => { setStudyB(s); setSearchB(s.name); setShowDropB(false); };

    const swapStudies = () => {
        const tempA = studyA;
        const tempSearchA = searchA;
        setStudyA(studyB);
        setSearchA(searchB);
        setStudyB(tempA);
        setSearchB(tempSearchA);
    };

    const clearA = () => { setStudyA(null); setSearchA(''); };
    const clearB = () => { setStudyB(null); setSearchB(''); };

    const getPrice = (s: any) => s?.pricePromotional || s?.priceRegular || 0;

    const comparisonRows = [
        {
            label: 'Precio',
            icon: DollarSign,
            getA: (s: any) => `$${getPrice(s).toLocaleString('es-MX')}`,
            getB: (s: any) => `$${getPrice(s).toLocaleString('es-MX')}`,
            highlight: studyA && studyB ? (getPrice(studyA) <= getPrice(studyB) ? 'A' : 'B') : null,
        },
        {
            label: 'Tiempo de Entrega',
            icon: Clock,
            getA: (s: any) => s?.turnaroundTime || 'Consultar',
            getB: (s: any) => s?.turnaroundTime || 'Consultar',
            highlight: null,
        },
        {
            label: 'Descripción',
            icon: Beaker,
            getA: (s: any) => s?.description || 'Sin descripción',
            getB: (s: any) => s?.description || 'Sin descripción',
            highlight: null,
        },
        {
            label: 'Preparación',
            icon: CheckCircle,
            getA: (s: any) => s?.preparation || s?.detailedPreparation || 'Consultar',
            getB: (s: any) => s?.preparation || s?.detailedPreparation || 'Consultar',
            highlight: null,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-green-700 hover:text-green-900 mb-8 transition-colors">
                    <ArrowLeft size={20} /> Volver al inicio
                </Link>

                <div className="text-center mb-10">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                        <ArrowLeftRight size={32} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Comparador de Estudios</h1>
                    <p className="text-gray-600">Selecciona 2 estudios para comparar precios, preparación y más</p>
                </div>

                {/* Search Selectors */}
                <div className="grid md:grid-cols-2 gap-4 mb-8 items-start">
                    {/* Study A */}
                    <div className="relative">
                        <label className="text-sm font-bold text-gray-700 mb-2 block">Estudio 1</label>
                        <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchA}
                                onChange={e => { setSearchA(e.target.value); setShowDropA(true); setStudyA(null); }}
                                onFocus={() => setShowDropA(true)}
                                placeholder="Buscar estudio..."
                                className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                            />
                            {studyA && <button onClick={clearA} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X size={18} /></button>}
                        </div>
                        {showDropA && filteredA.length > 0 && !studyA && (
                            <div className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                                {filteredA.map(s => (
                                    <button key={s.id || s.slug} onClick={() => selectA(s)} className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0">
                                        <p className="font-medium text-gray-900 text-sm">{s.name}</p>
                                        <p className="text-xs text-blue-600">${getPrice(s).toLocaleString('es-MX')}</p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Study B */}
                    <div className="relative">
                        <label className="text-sm font-bold text-gray-700 mb-2 block">Estudio 2</label>
                        <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchB}
                                onChange={e => { setSearchB(e.target.value); setShowDropB(true); setStudyB(null); }}
                                onFocus={() => setShowDropB(true)}
                                placeholder="Buscar estudio..."
                                className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                            />
                            {studyB && <button onClick={clearB} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X size={18} /></button>}
                        </div>
                        {showDropB && filteredB.length > 0 && !studyB && (
                            <div className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                                {filteredB.map(s => (
                                    <button key={s.id || s.slug} onClick={() => selectB(s)} className="w-full text-left px-4 py-3 hover:bg-purple-50 transition-colors border-b border-gray-50 last:border-0">
                                        <p className="font-medium text-gray-900 text-sm">{s.name}</p>
                                        <p className="text-xs text-purple-600">${getPrice(s).toLocaleString('es-MX')}</p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Swap Button */}
                {studyA && studyB && (
                    <div className="text-center mb-8">
                        <button onClick={swapStudies} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                            <ArrowLeftRight size={16} /> Intercambiar
                        </button>
                    </div>
                )}

                {/* Comparison Table */}
                {studyA && studyB ? (
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        {/* Headers */}
                        <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100">
                            <div className="p-4 font-bold text-gray-500 text-sm">Comparación</div>
                            <div className="p-4 font-bold text-blue-700 text-sm text-center border-l border-gray-100">{studyA.name}</div>
                            <div className="p-4 font-bold text-purple-700 text-sm text-center border-l border-gray-100">{studyB.name}</div>
                        </div>

                        {/* Rows */}
                        {comparisonRows.map((row) => {
                            const Icon = row.icon;
                            return (
                                <div key={row.label} className="grid grid-cols-3 border-b border-gray-50 last:border-0">
                                    <div className="p-4 flex items-start gap-2">
                                        <Icon size={16} className="text-gray-400 shrink-0 mt-0.5" />
                                        <span className="text-sm font-medium text-gray-700">{row.label}</span>
                                    </div>
                                    <div className={`p-4 text-sm text-center border-l border-gray-50 ${row.highlight === 'A' ? 'bg-green-50 text-green-800 font-bold' : 'text-gray-700'}`}>
                                        {studyA ? row.getA(studyA) : '-'}
                                    </div>
                                    <div className={`p-4 text-sm text-center border-l border-gray-50 ${row.highlight === 'B' ? 'bg-green-50 text-green-800 font-bold' : 'text-gray-700'}`}>
                                        {studyB ? row.getB(studyB) : '-'}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Savings */}
                        {getPrice(studyA) !== getPrice(studyB) && (
                            <div className="bg-green-50 p-4 text-center border-t border-green-100">
                                <p className="text-green-800 font-bold">
                                    💰 Ahorras ${Math.abs(getPrice(studyA) - getPrice(studyB)).toLocaleString('es-MX')} eligiendo{' '}
                                    {getPrice(studyA) < getPrice(studyB) ? studyA.name : studyB.name}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
                        <ArrowLeftRight size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 text-lg">Selecciona dos estudios para ver la comparación</p>
                    </div>
                )}
            </div>
        </div>
    );
}
