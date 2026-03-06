import { db } from './src/db';
import { studies } from './src/db/schema';
import { eq, or, isNull } from 'drizzle-orm';

interface StudyContent {
    shortDescription: string;
    longDescription: string;
    preparation: string;
}

// Simulación de generación con Gemini (reemplazar con API real)
async function generateWithGemini(studyName: string, category: string): Promise<StudyContent> {
    // Por ahora, retornamos un placeholder
    // En producción, esto llamaría a la API de Gemini

    return {
        shortDescription: `Contenido generado para ${studyName} en categoría ${category}`,
        longDescription: `Descripción detallada para ${studyName}`,
        preparation: `Preparación para ${studyName}`
    };
}

async function testGeneration() {
    console.log('🧪 Probando generación con un estudio de ejemplo...\n');

    const [testStudy] = await db
        .select()
        .from(studies)
        .limit(1);

    if (!testStudy) {
        console.error('❌ No se encontraron estudios en la base de datos');
        process.exit(1);
    }

    console.log(`📝 Estudio de prueba: ${testStudy.name}`);
    console.log(`📁 Categoría: ${testStudy.categoryId}\n`);

    try {
        const content = await generateWithGemini(testStudy.name, testStudy.categoryId);

        console.log('✅ Generación exitosa!\n');
        console.log('📝 DESCRIPCIÓN CORTA:');
        console.log(content.shortDescription);
        console.log('\n📖 DESCRIPCIÓN DETALLADA:');
        console.log(content.longDescription);
        console.log('\n🔬 PREPARACIÓN:');
        console.log(content.preparation);

    } catch (error) {
        console.error('❌ Error en generación:', error);
    }

    process.exit(0);
}

testGeneration();
