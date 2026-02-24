'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, User, Activity, Stethoscope, DollarSign, CheckCircle, RotateCcw, Sparkles } from 'lucide-react';

// Step definitions
const ageRanges = ['18-30', '31-45', '46-60', '60+'];
const sexOptions = ['Masculino', 'Femenino'];
const conditions = [
    'Diabetes o prediabetes',
    'Hipertensión',
    'Colesterol alto',
    'Problemas de tiroides',
    'Anemia o fatiga',
    'Infecciones frecuentes',
    'Problemas renales',
    'Problemas hepáticos',
    'Cáncer (antecedentes)',
    'Embarazo o planificación',
    'Ninguna en particular',
];
const budgets = ['Económico (hasta $500)', 'Moderado ($500 - $1,500)', 'Completo ($1,500+)'];

interface Recommendation {
    name: string;
    reason: string;
    price: string;
    priority: 'essential' | 'recommended' | 'optional';
}

function getRecommendations(age: string, sex: string, selectedConditions: string[], budget: string): Recommendation[] {
    const recs: Recommendation[] = [];

    // Everyone needs these
    recs.push({ name: 'Biometría Hemática Completa', reason: 'Evaluación general de la sangre, detecta anemia, infecciones y más', price: '$120', priority: 'essential' });
    recs.push({ name: 'Química Sanguínea 6 elementos', reason: 'Glucosa, urea, creatinina, ácido úrico, colesterol y triglicéridos', price: '$150', priority: 'essential' });
    recs.push({ name: 'Examen General de Orina', reason: 'Detecta infecciones urinarias, diabetes y problemas renales', price: '$80', priority: 'essential' });

    // Age-specific
    if (age === '46-60' || age === '60+') {
        recs.push({ name: 'Antígeno Prostático (PSA)', reason: 'Detección temprana de cáncer de próstata (si es hombre)', price: '$250', priority: sex === 'Masculino' ? 'essential' : 'optional' });
        recs.push({ name: 'Hemoglobina Glucosilada', reason: 'Control a largo plazo de glucosa, esencial después de los 45', price: '$220', priority: 'recommended' });
        recs.push({ name: 'Perfil Tiroideo', reason: 'Los problemas de tiroides son más comunes con la edad', price: '$350', priority: 'recommended' });
    }

    // Condition-specific
    if (selectedConditions.includes('Diabetes o prediabetes')) {
        recs.push({ name: 'Hemoglobina Glucosilada (HbA1c)', reason: 'Mide el control de glucosa de los últimos 3 meses', price: '$220', priority: 'essential' });
        recs.push({ name: 'Perfil de Lípidos', reason: 'Los diabéticos tienen mayor riesgo cardiovascular', price: '$180', priority: 'essential' });
        recs.push({ name: 'Microalbuminuria', reason: 'Detecta daño renal temprano en diabéticos', price: '$200', priority: 'recommended' });
    }
    if (selectedConditions.includes('Problemas de tiroides')) {
        recs.push({ name: 'Perfil Tiroideo Completo (T3, T4, TSH)', reason: 'Evaluación completa de la función tiroidea', price: '$350', priority: 'essential' });
    }
    if (selectedConditions.includes('Anemia o fatiga')) {
        recs.push({ name: 'Perfil de Hierro', reason: 'Ferritina, hierro sérico y capacidad de fijación', price: '$280', priority: 'essential' });
        recs.push({ name: 'Vitamina B12 y Ácido Fólico', reason: 'Deficiencias que causan anemia y fatiga', price: '$350', priority: 'recommended' });
        recs.push({ name: 'Vitamina D', reason: 'Deficiencia muy común que causa fatiga y debilidad', price: '$300', priority: 'recommended' });
    }
    if (selectedConditions.includes('Cáncer (antecedentes)')) {
        recs.push({ name: 'Marcadores Tumorales', reason: 'CEA, CA-125, AFP según historia familiar', price: '$400', priority: 'essential' });
    }
    if (selectedConditions.includes('Embarazo o planificación') && sex === 'Femenino') {
        recs.push({ name: 'Prueba de Embarazo (HCG)', reason: 'Confirmación cuantitativa de embarazo', price: '$180', priority: 'essential' });
        recs.push({ name: 'Perfil TORCH', reason: 'Detecta infecciones que afectan al embarazo', price: '$600', priority: 'recommended' });
        recs.push({ name: 'Grupo Sanguíneo y Rh', reason: 'Esencial para control prenatal', price: '$120', priority: 'essential' });
    }
    if (selectedConditions.includes('Hipertensión')) {
        recs.push({ name: 'Perfil Renal', reason: 'La hipertensión puede dañar los riñones', price: '$250', priority: 'essential' });
        recs.push({ name: 'Electrolitos Séricos', reason: 'Sodio y potasio importantes en hipertensión', price: '$200', priority: 'recommended' });
    }

    // Sex-specific
    if (sex === 'Femenino' && !selectedConditions.includes('Embarazo o planificación')) {
        recs.push({ name: 'Perfil Hormonal Femenino', reason: 'Evalúa ciclo menstrual, menopausia y fertilidad', price: '$400', priority: 'recommended' });
    }

    // Deduplicate by name
    const unique = recs.filter((rec, i, arr) => arr.findIndex(r => r.name === rec.name) === i);

    // Sort by priority
    const order = { essential: 0, recommended: 1, optional: 2 };
    unique.sort((a, b) => order[a.priority] - order[b.priority]);

    // Filter by budget
    if (budget === 'Económico (hasta $500)') return unique.slice(0, 5);
    if (budget === 'Moderado ($500 - $1,500)') return unique.slice(0, 8);
    return unique;
}

export default function CalculadoraPage() {
    const [step, setStep] = useState(0);
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
    const [budget, setBudget] = useState('');
    const [showResults, setShowResults] = useState(false);

    const steps = [
        { title: '¿Cuál es tu rango de edad?', icon: User },
        { title: '¿Cuál es tu sexo biológico?', icon: User },
        { title: '¿Tienes alguna condición o síntoma?', icon: Stethoscope },
        { title: '¿Cuál es tu presupuesto?', icon: DollarSign },
    ];

    const canNext = () => {
        if (step === 0) return !!age;
        if (step === 1) return !!sex;
        if (step === 2) return selectedConditions.length > 0;
        if (step === 3) return !!budget;
        return false;
    };

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else setShowResults(true);
    };

    const reset = () => {
        setStep(0);
        setAge('');
        setSex('');
        setSelectedConditions([]);
        setBudget('');
        setShowResults(false);
    };

    const toggleCondition = (c: string) => {
        if (c === 'Ninguna en particular') {
            setSelectedConditions(['Ninguna en particular']);
            return;
        }
        setSelectedConditions(prev => {
            const filtered = prev.filter(p => p !== 'Ninguna en particular');
            return filtered.includes(c) ? filtered.filter(p => p !== c) : [...filtered, c];
        });
    };

    const recommendations = showResults ? getRecommendations(age, sex, selectedConditions, budget) : [];
    const priorityColors = { essential: 'bg-red-100 text-red-700', recommended: 'bg-amber-100 text-amber-700', optional: 'bg-gray-100 text-gray-600' };
    const priorityLabels = { essential: 'Esencial', recommended: 'Recomendado', optional: 'Opcional' };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-green-700 hover:text-green-900 mb-8 transition-colors">
                    <ArrowLeft size={20} /> Volver al inicio
                </Link>

                {!showResults ? (
                    <>
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                                <Sparkles size={32} className="text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Calculadora de Check-Up</h1>
                            <p className="text-gray-600">Responde 4 preguntas y te recomendamos los estudios ideales para ti</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="flex gap-2 mb-8">
                            {steps.map((_, i) => (
                                <div key={i} className={`h-2 flex-1 rounded-full transition-colors ${i <= step ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gray-200'}`} />
                            ))}
                        </div>

                        {/* Step Content */}
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">{steps[step].title}</h2>

                            {step === 0 && (
                                <div className="grid grid-cols-2 gap-3">
                                    {ageRanges.map(a => (
                                        <button key={a} onClick={() => setAge(a)} className={`p-4 rounded-xl border-2 font-semibold transition-all ${age === a ? 'border-green-600 bg-green-50 text-green-800' : 'border-gray-200 hover:border-green-300 text-gray-700'}`}>
                                            {a} años
                                        </button>
                                    ))}
                                </div>
                            )}

                            {step === 1 && (
                                <div className="grid grid-cols-2 gap-4">
                                    {sexOptions.map(s => (
                                        <button key={s} onClick={() => setSex(s)} className={`p-6 rounded-xl border-2 font-semibold transition-all ${sex === s ? 'border-green-600 bg-green-50 text-green-800' : 'border-gray-200 hover:border-green-300 text-gray-700'}`}>
                                            {s === 'Masculino' ? '👨' : '👩'} {s}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {step === 2 && (
                                <div className="grid grid-cols-1 gap-2">
                                    {conditions.map(c => (
                                        <button key={c} onClick={() => toggleCondition(c)} className={`p-3 rounded-xl border-2 text-left font-medium transition-all flex items-center gap-3 ${selectedConditions.includes(c) ? 'border-green-600 bg-green-50 text-green-800' : 'border-gray-200 hover:border-green-300 text-gray-700'}`}>
                                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selectedConditions.includes(c) ? 'border-green-600 bg-green-600' : 'border-gray-300'}`}>
                                                {selectedConditions.includes(c) && <CheckCircle size={14} className="text-white" />}
                                            </div>
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-3">
                                    {budgets.map(b => (
                                        <button key={b} onClick={() => setBudget(b)} className={`w-full p-4 rounded-xl border-2 text-left font-semibold transition-all ${budget === b ? 'border-green-600 bg-green-50 text-green-800' : 'border-gray-200 hover:border-green-300 text-gray-700'}`}>
                                            {b}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Navigation */}
                        <div className="flex gap-4">
                            {step > 0 && (
                                <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                                    <ArrowLeft size={18} /> Anterior
                                </button>
                            )}
                            <button
                                onClick={handleNext}
                                disabled={!canNext()}
                                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${canNext() ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                            >
                                {step === 3 ? 'Ver Recomendaciones' : 'Siguiente'} <ArrowRight size={18} />
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Results */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                                <Activity size={32} className="text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tu Plan de Estudios</h1>
                            <p className="text-gray-600">
                                Basado en: {sex}, {age} años
                                {selectedConditions[0] !== 'Ninguna en particular' && ` • ${selectedConditions.length} condición(es)`}
                            </p>
                        </div>

                        <div className="space-y-4 mb-8">
                            {recommendations.map((rec, i) => (
                                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${priorityColors[rec.priority]}`}>
                                                {priorityLabels[rec.priority]}
                                            </span>
                                            <h3 className="text-lg font-bold text-gray-900 mt-2">{rec.name}</h3>
                                        </div>
                                        <span className="text-lg font-bold text-green-700">{rec.price}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{rec.reason}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <button onClick={reset} className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                                <RotateCcw size={18} /> Empezar de nuevo
                            </button>
                            <a
                                href={`https://wa.me/527716854026?text=Hola, la calculadora me recomendó estos estudios: ${recommendations.map(r => r.name).join(', ')}. Me gustaría agendar.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
                            >
                                📱 Agendar por WhatsApp
                            </a>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
