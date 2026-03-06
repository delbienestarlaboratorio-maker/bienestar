const fs = require('fs');
let content = fs.readFileSync('src/app/herramientas/page.tsx', 'utf8');

const newBottom = `                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Ad Banner */}
            <div className="max-w-5xl mx-auto px-4 pb-12">
                <AdBanner variant="horizontal" />
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-green-800 to-blue-800 py-16 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">¿Necesitas hacerte estudios?</h2>
                    <p className="text-lg text-green-100 mb-8">Contamos con más de 2,000 estudios clínicos. Agenda tu cita o contáctanos.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/estudios/analisis-clinicos" className="bg-white text-green-800 px-8 py-3 rounded-xl font-bold hover:bg-green-50 transition-all shadow-lg">
                            Ver Estudios
                        </Link>
                        <a href="https://wa.me/527716854026?text=Hola,%20necesito%20información" target="_blank" rel="noopener noreferrer"
                            className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-500 transition-all shadow-lg border border-green-400">
                            📱 WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
`;

const lastIndex = content.lastIndexOf('))}');
if (lastIndex !== -1) {
    const fixedContent = content.substring(0, lastIndex) + newBottom;
    fs.writeFileSync('src/app/herramientas/page.tsx', fixedContent);
    console.log("Fixed page strictly by string slicing.");
} else {
    console.log("Could not find ))}");
}
