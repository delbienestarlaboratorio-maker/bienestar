// Script to generate the skeleton JSON manifest + per-slug fragments for 320+ biomarkers
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure fragment directory exists
const fragDir = path.join(__dirname, 'src', 'data', 'biomarkers-fragments');
if (!fs.existsSync(fragDir)) fs.mkdirSync(fragDir, { recursive: true });

function slug(name) {
    return name.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Master list of all biomarkers organized by panel
const panels = {
    "Biometría Hemática - Serie Roja": [
        { name: "Hemoglobina", unit: "g/dL", rangeM: "13.5 - 17.5", rangeF: "12.0 - 16.0", rangeK: "11.0 - 16.0" },
        { name: "Hematocrito", unit: "%", rangeM: "38.3 - 48.6", rangeF: "35.5 - 44.9", rangeK: "33 - 45" },
        { name: "Eritrocitos (Glóbulos Rojos)", unit: "millones/mcL", rangeM: "4.35 - 5.65", rangeF: "3.92 - 5.13", rangeK: "3.9 - 5.3" },
        { name: "VCM (Volumen Corpuscular Medio)", unit: "fL", rangeM: "80 - 100", rangeF: "80 - 100", rangeK: "70 - 86" },
        { name: "HCM (Hemoglobina Corpuscular Media)", unit: "pg", rangeM: "27 - 33", rangeF: "27 - 33", rangeK: "23 - 31" },
        { name: "CMHC (Concentración Media de Hemoglobina)", unit: "g/dL", rangeM: "32 - 36", rangeF: "32 - 36", rangeK: "32 - 36" },
        { name: "RDW (Ancho de Distribución Eritrocitaria)", unit: "%", rangeM: "11.5 - 14.5", rangeF: "11.5 - 14.5", rangeK: "11.5 - 14.5" },
        { name: "Reticulocitos", unit: "%", rangeM: "0.5 - 2.5", rangeF: "0.5 - 2.5", rangeK: "0.5 - 2.5" },
    ],
    "Biometría Hemática - Serie Blanca": [
        { name: "Leucocitos (Glóbulos Blancos)", unit: "cel/mcL", rangeM: "4,500 - 11,000", rangeF: "4,500 - 11,000", rangeK: "5,000 - 15,000" },
        { name: "Neutrófilos", unit: "%", rangeM: "40 - 70", rangeF: "40 - 70", rangeK: "30 - 60" },
        { name: "Linfocitos", unit: "%", rangeM: "20 - 40", rangeF: "20 - 40", rangeK: "30 - 50" },
        { name: "Monocitos", unit: "%", rangeM: "2 - 8", rangeF: "2 - 8", rangeK: "2 - 8" },
        { name: "Eosinófilos", unit: "%", rangeM: "1 - 4", rangeF: "1 - 4", rangeK: "1 - 5" },
        { name: "Basófilos", unit: "%", rangeM: "0 - 1", rangeF: "0 - 1", rangeK: "0 - 1" },
        { name: "Bandas (Neutrófilos en Banda)", unit: "%", rangeM: "0 - 5", rangeF: "0 - 5", rangeK: "0 - 5" },
    ],
    "Biometría Hemática - Plaquetas": [
        { name: "Plaquetas (Conteo Plaquetario)", unit: "cel/mcL", rangeM: "150,000 - 400,000", rangeF: "150,000 - 400,000", rangeK: "150,000 - 450,000" },
        { name: "VPM (Volumen Plaquetario Medio)", unit: "fL", rangeM: "7.5 - 11.5", rangeF: "7.5 - 11.5", rangeK: "7.5 - 11.5" },
    ],
    "Coagulación": [
        { name: "Tiempo de Protrombina (TP)", unit: "segundos", rangeM: "11 - 13.5", rangeF: "11 - 13.5", rangeK: "11 - 14" },
        { name: "TTPa (Tiempo de Tromboplastina Parcial)", unit: "segundos", rangeM: "25 - 35", rangeF: "25 - 35", rangeK: "25 - 35" },
        { name: "INR (Ratio Internacional Normalizado)", unit: "ratio", rangeM: "0.8 - 1.1", rangeF: "0.8 - 1.1", rangeK: "0.8 - 1.1" },
        { name: "Fibrinógeno", unit: "mg/dL", rangeM: "200 - 400", rangeF: "200 - 400", rangeK: "200 - 400" },
        { name: "Dímero-D", unit: "ng/mL", rangeM: "< 500", rangeF: "< 500", rangeK: "< 500" },
        { name: "Tiempo de Sangrado", unit: "minutos", rangeM: "1 - 9", rangeF: "1 - 9", rangeK: "1 - 9" },
    ],
    "Química Sanguínea - Glucosa y Diabetes": [
        { name: "Glucosa en Ayunas", unit: "mg/dL", rangeM: "70 - 100", rangeF: "70 - 100", rangeK: "70 - 100" },
        { name: "Hemoglobina Glucosilada (HbA1c)", unit: "%", rangeM: "4.0 - 5.6", rangeF: "4.0 - 5.6", rangeK: "4.0 - 5.6" },
        { name: "Insulina Basal", unit: "mcU/mL", rangeM: "2.6 - 24.9", rangeF: "2.6 - 24.9", rangeK: "3.0 - 20.0" },
        { name: "Índice HOMA-IR (Resistencia a Insulina)", unit: "índice", rangeM: "< 2.5", rangeF: "< 2.5", rangeK: "< 2.5" },
        { name: "Péptido C", unit: "ng/mL", rangeM: "1.1 - 4.4", rangeF: "1.1 - 4.4", rangeK: "1.1 - 4.4" },
        { name: "Curva de Tolerancia a la Glucosa (2h)", unit: "mg/dL", rangeM: "< 140", rangeF: "< 140", rangeK: "< 140" },
    ],
    "Química Sanguínea - Función Renal": [
        { name: "Creatinina Sérica", unit: "mg/dL", rangeM: "0.74 - 1.35", rangeF: "0.59 - 1.04", rangeK: "0.3 - 0.7" },
        { name: "Urea", unit: "mg/dL", rangeM: "15 - 40", rangeF: "15 - 40", rangeK: "10 - 40" },
        { name: "BUN (Nitrógeno Ureico)", unit: "mg/dL", rangeM: "7 - 20", rangeF: "7 - 20", rangeK: "5 - 18" },
        { name: "Ácido Úrico", unit: "mg/dL", rangeM: "3.4 - 7.0", rangeF: "2.4 - 6.0", rangeK: "2.0 - 5.5" },
        { name: "Tasa de Filtración Glomerular (eGFR)", unit: "mL/min/1.73m²", rangeM: "> 90", rangeF: "> 90", rangeK: "> 90" },
        { name: "Cistatina C", unit: "mg/L", rangeM: "0.56 - 0.98", rangeF: "0.56 - 0.98", rangeK: "0.56 - 0.98" },
        { name: "Depuración de Creatinina", unit: "mL/min", rangeM: "85 - 125", rangeF: "75 - 115", rangeK: "70 - 130" },
    ],
    "Perfil de Lípidos": [
        { name: "Colesterol Total", unit: "mg/dL", rangeM: "< 200", rangeF: "< 200", rangeK: "< 170" },
        { name: "Colesterol LDL (Malo)", unit: "mg/dL", rangeM: "< 100", rangeF: "< 100", rangeK: "< 110" },
        { name: "Colesterol HDL (Bueno)", unit: "mg/dL", rangeM: "> 40", rangeF: "> 50", rangeK: "> 45" },
        { name: "Colesterol VLDL", unit: "mg/dL", rangeM: "2 - 30", rangeF: "2 - 30", rangeK: "2 - 30" },
        { name: "Triglicéridos", unit: "mg/dL", rangeM: "< 150", rangeF: "< 150", rangeK: "< 150" },
        { name: "Índice Aterogénico", unit: "ratio", rangeM: "< 4.5", rangeF: "< 4.0", rangeK: "< 4.0" },
        { name: "Lipoproteína (a) [Lp(a)]", unit: "mg/dL", rangeM: "< 30", rangeF: "< 30", rangeK: "< 30" },
        { name: "Apolipoproteína A1", unit: "mg/dL", rangeM: "105 - 205", rangeF: "105 - 205", rangeK: "105 - 205" },
        { name: "Apolipoproteína B", unit: "mg/dL", rangeM: "60 - 138", rangeF: "60 - 138", rangeK: "60 - 138" },
    ],
    "Perfil Hepático": [
        { name: "Bilirrubina Total", unit: "mg/dL", rangeM: "0.1 - 1.2", rangeF: "0.1 - 1.2", rangeK: "0.1 - 1.0" },
        { name: "Bilirrubina Directa (Conjugada)", unit: "mg/dL", rangeM: "0.0 - 0.3", rangeF: "0.0 - 0.3", rangeK: "0.0 - 0.3" },
        { name: "Bilirrubina Indirecta (No Conjugada)", unit: "mg/dL", rangeM: "0.1 - 0.8", rangeF: "0.1 - 0.8", rangeK: "0.1 - 0.8" },
        { name: "TGO / AST (Aspartato Aminotransferasa)", unit: "U/L", rangeM: "8 - 40", rangeF: "8 - 40", rangeK: "10 - 40" },
        { name: "TGP / ALT (Alanina Aminotransferasa)", unit: "U/L", rangeM: "7 - 56", rangeF: "7 - 56", rangeK: "7 - 56" },
        { name: "Fosfatasa Alcalina (ALP)", unit: "U/L", rangeM: "44 - 147", rangeF: "44 - 147", rangeK: "100 - 390" },
        { name: "GGT (Gamma Glutamil Transferasa)", unit: "U/L", rangeM: "8 - 61", rangeF: "5 - 36", rangeK: "5 - 32" },
        { name: "Proteínas Totales", unit: "g/dL", rangeM: "6.0 - 8.3", rangeF: "6.0 - 8.3", rangeK: "6.0 - 8.0" },
        { name: "Albúmina", unit: "g/dL", rangeM: "3.5 - 5.5", rangeF: "3.5 - 5.5", rangeK: "3.5 - 5.5" },
        { name: "Globulinas", unit: "g/dL", rangeM: "2.0 - 3.5", rangeF: "2.0 - 3.5", rangeK: "2.0 - 3.5" },
        { name: "Relación Albúmina/Globulina (A/G)", unit: "ratio", rangeM: "1.1 - 2.5", rangeF: "1.1 - 2.5", rangeK: "1.1 - 2.5" },
        { name: "LDH (Lactato Deshidrogenasa)", unit: "U/L", rangeM: "140 - 280", rangeF: "140 - 280", rangeK: "150 - 360" },
    ],
    "Electrolitos y Minerales": [
        { name: "Sodio (Na)", unit: "mEq/L", rangeM: "136 - 145", rangeF: "136 - 145", rangeK: "136 - 145" },
        { name: "Potasio (K)", unit: "mEq/L", rangeM: "3.5 - 5.0", rangeF: "3.5 - 5.0", rangeK: "3.5 - 5.5" },
        { name: "Cloro (Cl)", unit: "mEq/L", rangeM: "98 - 106", rangeF: "98 - 106", rangeK: "98 - 106" },
        { name: "Calcio Total", unit: "mg/dL", rangeM: "8.5 - 10.5", rangeF: "8.5 - 10.5", rangeK: "8.8 - 10.8" },
        { name: "Calcio Iónico", unit: "mmol/L", rangeM: "1.12 - 1.32", rangeF: "1.12 - 1.32", rangeK: "1.12 - 1.32" },
        { name: "Fósforo", unit: "mg/dL", rangeM: "2.5 - 4.5", rangeF: "2.5 - 4.5", rangeK: "4.0 - 7.0" },
        { name: "Magnesio", unit: "mg/dL", rangeM: "1.7 - 2.2", rangeF: "1.7 - 2.2", rangeK: "1.7 - 2.2" },
        { name: "Hierro Sérico", unit: "mcg/dL", rangeM: "65 - 175", rangeF: "50 - 170", rangeK: "50 - 120" },
        { name: "Ferritina", unit: "ng/mL", rangeM: "20 - 250", rangeF: "10 - 120", rangeK: "7 - 140" },
        { name: "Transferrina", unit: "mg/dL", rangeM: "200 - 360", rangeF: "200 - 360", rangeK: "200 - 360" },
        { name: "TIBC (Capacidad Total de Fijación de Hierro)", unit: "mcg/dL", rangeM: "250 - 370", rangeF: "250 - 370", rangeK: "250 - 370" },
        { name: "Saturación de Transferrina", unit: "%", rangeM: "20 - 50", rangeF: "15 - 50", rangeK: "20 - 50" },
        { name: "Cobre Sérico", unit: "mcg/dL", rangeM: "70 - 140", rangeF: "80 - 155", rangeK: "70 - 140" },
        { name: "Zinc Sérico", unit: "mcg/dL", rangeM: "66 - 110", rangeF: "66 - 110", rangeK: "66 - 110" },
    ],
    "Enzimas Cardíacas y Musculares": [
        { name: "CPK Total (Creatina Fosfocinasa)", unit: "U/L", rangeM: "39 - 308", rangeF: "26 - 192", rangeK: "30 - 200" },
        { name: "CPK-MB (Fracción Cardíaca)", unit: "U/L", rangeM: "0 - 25", rangeF: "0 - 25", rangeK: "0 - 25" },
        { name: "Troponina I", unit: "ng/mL", rangeM: "< 0.04", rangeF: "< 0.04", rangeK: "< 0.04" },
        { name: "Mioglobina", unit: "ng/mL", rangeM: "28 - 72", rangeF: "25 - 58", rangeK: "< 70" },
        { name: "BNP (Péptido Natriurético Cerebral)", unit: "pg/mL", rangeM: "< 100", rangeF: "< 100", rangeK: "< 100" },
        { name: "Lipasa", unit: "U/L", rangeM: "0 - 160", rangeF: "0 - 160", rangeK: "0 - 160" },
        { name: "Amilasa", unit: "U/L", rangeM: "28 - 100", rangeF: "28 - 100", rangeK: "28 - 100" },
    ],
    "EGO - Examen Físico-Químico": [
        { name: "pH Urinario", unit: "", rangeM: "4.5 - 8.0", rangeF: "4.5 - 8.0", rangeK: "4.5 - 8.0" },
        { name: "Densidad Urinaria", unit: "", rangeM: "1.005 - 1.030", rangeF: "1.005 - 1.030", rangeK: "1.005 - 1.030" },
        { name: "Glucosa en Orina (Glucosuria)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Proteínas en Orina (Proteinuria)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Cetonas en Orina (Cetonuria)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Bilirrubina en Orina", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Urobilinógeno en Orina", unit: "mg/dL", rangeM: "0.1 - 1.0", rangeF: "0.1 - 1.0", rangeK: "0.1 - 1.0" },
        { name: "Nitritos en Orina", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Esterasa Leucocitaria en Orina", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Sangre Oculta en Orina (Hemoglobinuria)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
    ],
    "EGO - Sedimento Urinario": [
        { name: "Leucocitos en Orina (por campo)", unit: "cel/campo", rangeM: "0 - 5", rangeF: "0 - 5", rangeK: "0 - 5" },
        { name: "Eritrocitos en Orina (Hematuria)", unit: "cel/campo", rangeM: "0 - 3", rangeF: "0 - 3", rangeK: "0 - 3" },
        { name: "Células Epiteliales en Orina", unit: "cel/campo", rangeM: "Escasas", rangeF: "Escasas", rangeK: "Escasas" },
        { name: "Bacterias en Orina", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Cilindros Urinarios", unit: "por campo", rangeM: "0 - 2 hialinos", rangeF: "0 - 2 hialinos", rangeK: "0 - 2 hialinos" },
        { name: "Cristales en Orina", unit: "", rangeM: "Ninguno o escasos", rangeF: "Ninguno o escasos", rangeK: "Ninguno o escasos" },
        { name: "Levaduras en Orina", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Moco en Orina (Mucina)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
    ],
    "Perfil Tiroideo": [
        { name: "TSH (Hormona Estimulante de Tiroides)", unit: "mUI/L", rangeM: "0.27 - 4.20", rangeF: "0.27 - 4.20", rangeK: "0.7 - 6.4" },
        { name: "T3 Total (Triyodotironina)", unit: "ng/dL", rangeM: "80 - 200", rangeF: "80 - 200", rangeK: "100 - 260" },
        { name: "T3 Libre", unit: "pg/mL", rangeM: "2.0 - 4.4", rangeF: "2.0 - 4.4", rangeK: "2.0 - 4.4" },
        { name: "T4 Total (Tiroxina)", unit: "mcg/dL", rangeM: "5.1 - 14.1", rangeF: "5.1 - 14.1", rangeK: "6.0 - 16.0" },
        { name: "T4 Libre", unit: "ng/dL", rangeM: "0.93 - 1.70", rangeF: "0.93 - 1.70", rangeK: "0.93 - 1.70" },
        { name: "Anticuerpos Anti-TPO (Antiperoxidasa)", unit: "UI/mL", rangeM: "< 35", rangeF: "< 35", rangeK: "< 35" },
        { name: "Anticuerpos Anti-Tiroglobulina", unit: "UI/mL", rangeM: "< 40", rangeF: "< 40", rangeK: "< 40" },
        { name: "Tiroglobulina", unit: "ng/mL", rangeM: "1.5 - 38.5", rangeF: "1.5 - 38.5", rangeK: "1.5 - 38.5" },
    ],
    "Hormonas Reproductivas Femeninas": [
        { name: "FSH (Hormona Folículo Estimulante)", unit: "mUI/mL", rangeM: "1.5 - 12.4", rangeF: "3.5 - 12.5 (fase folicular)", rangeK: "Prepúber: < 5" },
        { name: "LH (Hormona Luteinizante)", unit: "mUI/mL", rangeM: "1.7 - 8.6", rangeF: "2.4 - 12.6 (fase folicular)", rangeK: "Prepúber: < 5" },
        { name: "Estradiol (E2)", unit: "pg/mL", rangeM: "10 - 40", rangeF: "12.5 - 166 (fase folicular)", rangeK: "< 20" },
        { name: "Progesterona", unit: "ng/mL", rangeM: "0.2 - 1.4", rangeF: "< 1.0 (fase folicular)", rangeK: "< 1.0" },
        { name: "Prolactina", unit: "ng/mL", rangeM: "4.0 - 15.2", rangeF: "4.8 - 23.3", rangeK: "< 15" },
        { name: "Beta-HCG Cuantitativa", unit: "mUI/mL", rangeM: "< 5", rangeF: "< 5 (no embarazada)", rangeK: "< 5" },
        { name: "Hormona Antimülleriana (AMH)", unit: "ng/mL", rangeM: "N/A", rangeF: "1.0 - 3.5 (fertil)", rangeK: "N/A" },
    ],
    "Hormonas Masculinas y Andrógenos": [
        { name: "Testosterona Total", unit: "ng/dL", rangeM: "264 - 916", rangeF: "15 - 70", rangeK: "Variable por edad" },
        { name: "Testosterona Libre", unit: "pg/mL", rangeM: "8.7 - 25.1", rangeF: "0.3 - 1.9", rangeK: "Variable" },
        { name: "SHBG (Globulina Enlazante de Hormonas Sexuales)", unit: "nmol/L", rangeM: "13.3 - 89.5", rangeF: "18.2 - 135.5", rangeK: "Variable" },
        { name: "PSA Total (Antígeno Prostático)", unit: "ng/mL", rangeM: "< 4.0", rangeF: "N/A", rangeK: "N/A" },
        { name: "PSA Libre", unit: "ng/mL", rangeM: "Relación > 25%", rangeF: "N/A", rangeK: "N/A" },
        { name: "DHEA-S (Dehidroepiandrosterona Sulfato)", unit: "mcg/dL", rangeM: "80 - 560", rangeF: "35 - 430", rangeK: "Variable" },
        { name: "17-Hidroxiprogesterona (17-OHP)", unit: "ng/mL", rangeM: "0.5 - 2.1", rangeF: "0.2 - 1.0 (folicular)", rangeK: "< 2.0" },
    ],
    "Hormonas Adrenales y Estrés": [
        { name: "Cortisol Matutino", unit: "mcg/dL", rangeM: "6.2 - 19.4", rangeF: "6.2 - 19.4", rangeK: "6.2 - 19.4" },
        { name: "Cortisol Vespertino", unit: "mcg/dL", rangeM: "2.3 - 11.9", rangeF: "2.3 - 11.9", rangeK: "2.3 - 11.9" },
        { name: "ACTH (Hormona Adrenocorticotrópica)", unit: "pg/mL", rangeM: "7.2 - 63.3", rangeF: "7.2 - 63.3", rangeK: "7.2 - 63.3" },
        { name: "Aldosterona", unit: "ng/dL", rangeM: "< 21 (de pie)", rangeF: "< 21 (de pie)", rangeK: "< 21" },
        { name: "Renina Plasmática", unit: "ng/mL/h", rangeM: "0.65 - 5.0 (de pie)", rangeF: "0.65 - 5.0", rangeK: "Variable" },
    ],
    "Metabolismo Óseo": [
        { name: "PTH (Paratohormona)", unit: "pg/mL", rangeM: "15 - 65", rangeF: "15 - 65", rangeK: "15 - 65" },
        { name: "Vitamina D (25-OH)", unit: "ng/mL", rangeM: "30 - 100", rangeF: "30 - 100", rangeK: "30 - 100" },
        { name: "Osteocalcina", unit: "ng/mL", rangeM: "3.1 - 13.7", rangeF: "3.7 - 10.0", rangeK: "Variable" },
    ],
    "Marcadores de Inflamación": [
        { name: "PCR (Proteína C Reactiva)", unit: "mg/L", rangeM: "< 10", rangeF: "< 10", rangeK: "< 10" },
        { name: "PCR Ultrasensible (Riesgo Cardiovascular)", unit: "mg/L", rangeM: "< 1.0 (bajo riesgo)", rangeF: "< 1.0", rangeK: "< 1.0" },
        { name: "VSG (Velocidad de Sedimentación Globular)", unit: "mm/h", rangeM: "0 - 15", rangeF: "0 - 20", rangeK: "0 - 10" },
        { name: "Procalcitonina", unit: "ng/mL", rangeM: "< 0.05", rangeF: "< 0.05", rangeK: "< 0.05" },
    ],
    "Inmunología y Reumatología": [
        { name: "Factor Reumatoide (FR)", unit: "UI/mL", rangeM: "< 14", rangeF: "< 14", rangeK: "< 14" },
        { name: "Anti-CCP (Antipéptido Cíclico Citrulinado)", unit: "U/mL", rangeM: "< 20", rangeF: "< 20", rangeK: "< 20" },
        { name: "ANA (Anticuerpos Antinucleares)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Anti-DNA de Doble Cadena", unit: "UI/mL", rangeM: "< 200", rangeF: "< 200", rangeK: "< 200" },
        { name: "Complemento C3", unit: "mg/dL", rangeM: "90 - 180", rangeF: "90 - 180", rangeK: "90 - 180" },
        { name: "Complemento C4", unit: "mg/dL", rangeM: "10 - 40", rangeF: "10 - 40", rangeK: "10 - 40" },
        { name: "IgG Total", unit: "mg/dL", rangeM: "700 - 1600", rangeF: "700 - 1600", rangeK: "350 - 1180" },
        { name: "IgA Total", unit: "mg/dL", rangeM: "70 - 400", rangeF: "70 - 400", rangeK: "20 - 230" },
        { name: "IgM Total", unit: "mg/dL", rangeM: "40 - 230", rangeF: "40 - 230", rangeK: "40 - 230" },
        { name: "IgE Total", unit: "UI/mL", rangeM: "< 100", rangeF: "< 100", rangeK: "< 60" },
    ],
    "Marcadores Tumorales": [
        { name: "CEA (Antígeno Carcinoembrionario)", unit: "ng/mL", rangeM: "< 3.0 (no fumador)", rangeF: "< 3.0", rangeK: "N/A" },
        { name: "AFP (Alfa-Fetoproteína)", unit: "ng/mL", rangeM: "< 7.0", rangeF: "< 7.0", rangeK: "Varía" },
        { name: "CA 125", unit: "U/mL", rangeM: "< 35", rangeF: "< 35", rangeK: "N/A" },
        { name: "CA 15-3", unit: "U/mL", rangeM: "< 25", rangeF: "< 25", rangeK: "N/A" },
        { name: "CA 19-9", unit: "U/mL", rangeM: "< 37", rangeF: "< 37", rangeK: "N/A" },
        { name: "CA 72-4", unit: "U/mL", rangeM: "< 6.9", rangeF: "< 6.9", rangeK: "N/A" },
        { name: "HE4 (Proteína 4 del Epidídimo)", unit: "pmol/L", rangeM: "N/A", rangeF: "< 70 (premenopausia)", rangeK: "N/A" },
        { name: "Enolasa Neuroespecífica (NSE)", unit: "ng/mL", rangeM: "< 16.3", rangeF: "< 16.3", rangeK: "< 16.3" },
    ],
    "Serología Infecciosa": [
        { name: "VDRL / RPR (Sífilis)", unit: "", rangeM: "No reactivo", rangeF: "No reactivo", rangeK: "No reactivo" },
        { name: "VIH (Antígeno/Anticuerpo 4ta gen)", unit: "", rangeM: "No reactivo", rangeF: "No reactivo", rangeK: "No reactivo" },
        { name: "Hepatitis B - HBsAg (Antígeno de Superficie)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Hepatitis B - Anti-HBs (Anticuerpo Protector)", unit: "mUI/mL", rangeM: "> 10 (inmune)", rangeF: "> 10", rangeK: "> 10" },
        { name: "Hepatitis C - Anti-VHC", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Toxoplasmosis IgG", unit: "UI/mL", rangeM: "< 1.0 (negativo)", rangeF: "< 1.0", rangeK: "< 1.0" },
        { name: "Toxoplasmosis IgM", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Rubéola IgG", unit: "UI/mL", rangeM: "> 10 (inmune)", rangeF: "> 10", rangeK: "> 10" },
        { name: "Citomegalovirus (CMV) IgG", unit: "U/mL", rangeM: "< 6.0 (negativo)", rangeF: "< 6.0", rangeK: "< 6.0" },
        { name: "Reacciones Febriles (Tífico O y H)", unit: "dilución", rangeM: "< 1:80", rangeF: "< 1:80", rangeK: "< 1:80" },
    ],
    "Análisis de Heces (Coprológico)": [
        { name: "Sangre Oculta en Heces", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Calprotectina Fecal", unit: "mcg/g", rangeM: "< 50", rangeF: "< 50", rangeK: "< 50" },
        { name: "Elastasa Pancreática Fecal", unit: "mcg/g", rangeM: "> 200", rangeF: "> 200", rangeK: "> 200" },
        { name: "pH Fecal", unit: "", rangeM: "6.0 - 7.5", rangeF: "6.0 - 7.5", rangeK: "5.5 - 7.5" },
        { name: "Leucocitos en Heces (PMN)", unit: "por campo", rangeM: "0 - 5", rangeF: "0 - 5", rangeK: "0 - 5" },
        { name: "Grasas en Heces (Sudan III)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Azúcares Reductores en Heces", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
    ],
    "Toxicología y Antidoping": [
        { name: "Marihuana (THC) en Orina", unit: "", rangeM: "Negativo (< 50 ng/mL)", rangeF: "Negativo", rangeK: "N/A" },
        { name: "Cocaína (Metabolitos) en Orina", unit: "", rangeM: "Negativo (< 300 ng/mL)", rangeF: "Negativo", rangeK: "N/A" },
        { name: "Anfetaminas en Orina", unit: "", rangeM: "Negativo (< 1000 ng/mL)", rangeF: "Negativo", rangeK: "N/A" },
        { name: "Metanfetaminas en Orina", unit: "", rangeM: "Negativo (< 1000 ng/mL)", rangeF: "Negativo", rangeK: "N/A" },
        { name: "Opiáceos en Orina", unit: "", rangeM: "Negativo (< 300 ng/mL)", rangeF: "Negativo", rangeK: "N/A" },
        { name: "Benzodiacepinas en Orina", unit: "", rangeM: "Negativo (< 300 ng/mL)", rangeF: "Negativo", rangeK: "N/A" },
        { name: "Barbitúricos en Orina", unit: "", rangeM: "Negativo (< 200 ng/mL)", rangeF: "Negativo", rangeK: "N/A" },
        { name: "Plomo en Sangre", unit: "mcg/dL", rangeM: "< 5", rangeF: "< 5", rangeK: "< 3.5" },
    ],
    "Vitaminas": [
        { name: "Vitamina B12 (Cobalamina)", unit: "pg/mL", rangeM: "200 - 900", rangeF: "200 - 900", rangeK: "200 - 900" },
        { name: "Ácido Fólico (Vitamina B9)", unit: "ng/mL", rangeM: "3.0 - 17.0", rangeF: "3.0 - 17.0", rangeK: "3.0 - 17.0" },
        { name: "Vitamina A (Retinol)", unit: "mcg/dL", rangeM: "30 - 80", rangeF: "30 - 80", rangeK: "20 - 43" },
        { name: "Vitamina E (Alfa-Tocoferol)", unit: "mg/L", rangeM: "5.5 - 17.0", rangeF: "5.5 - 17.0", rangeK: "3.0 - 9.0" },
    ],
    "Gases Arteriales y Equilibrio Ácido-Base": [
        { name: "pH Arterial", unit: "", rangeM: "7.35 - 7.45", rangeF: "7.35 - 7.45", rangeK: "7.35 - 7.45" },
        { name: "pCO2 (Presión Parcial de CO2)", unit: "mmHg", rangeM: "35 - 45", rangeF: "35 - 45", rangeK: "35 - 45" },
        { name: "pO2 (Presión Parcial de Oxígeno)", unit: "mmHg", rangeM: "75 - 100", rangeF: "75 - 100", rangeK: "75 - 100" },
        { name: "HCO3 (Bicarbonato)", unit: "mEq/L", rangeM: "22 - 26", rangeF: "22 - 26", rangeK: "22 - 26" },
        { name: "Saturación de Oxígeno (SaO2)", unit: "%", rangeM: "95 - 100", rangeF: "95 - 100", rangeK: "95 - 100" },
        { name: "Exceso de Base (BE)", unit: "mEq/L", rangeM: "-2 a +2", rangeF: "-2 a +2", rangeK: "-2 a +2" },
        { name: "Lactato", unit: "mmol/L", rangeM: "0.5 - 2.2", rangeF: "0.5 - 2.2", rangeK: "0.5 - 2.2" },
    ],
    "Orina de 24 Horas": [
        { name: "Proteínas en Orina de 24 horas (Proteinuria)", unit: "mg/24h", rangeM: "< 150", rangeF: "< 150", rangeK: "< 100" },
        { name: "Creatinina en Orina de 24 horas", unit: "mg/24h", rangeM: "800 - 2000", rangeF: "600 - 1800", rangeK: "Variable" },
        { name: "Microalbuminuria (Relación Albúmina/Creatinina)", unit: "mg/g", rangeM: "< 30", rangeF: "< 30", rangeK: "< 30" },
        { name: "Calcio en Orina de 24 horas (Calciuria)", unit: "mg/24h", rangeM: "100 - 300", rangeF: "100 - 300", rangeK: "< 200" },
        { name: "Ácido Úrico en Orina de 24 horas", unit: "mg/24h", rangeM: "250 - 750", rangeF: "250 - 750", rangeK: "Variable" },
        { name: "Sodio en Orina de 24 horas", unit: "mEq/24h", rangeM: "40 - 220", rangeF: "40 - 220", rangeK: "40 - 220" },
        { name: "Potasio en Orina de 24 horas", unit: "mEq/24h", rangeM: "25 - 125", rangeF: "25 - 125", rangeK: "25 - 125" },
        { name: "Fósforo en Orina de 24 horas", unit: "g/24h", rangeM: "0.4 - 1.3", rangeF: "0.4 - 1.3", rangeK: "Variable" },
        { name: "Cortisol Libre en Orina de 24 horas", unit: "mcg/24h", rangeM: "3.5 - 45", rangeF: "3.5 - 45", rangeK: "3.5 - 45" },
        { name: "Ácido 5-Hidroxiindolacético (5-HIAA) en Orina", unit: "mg/24h", rangeM: "2 - 8", rangeF: "2 - 8", rangeK: "2 - 8" },
        { name: "Ácido Vanililmandélico (AVM) en Orina", unit: "mg/24h", rangeM: "1.8 - 7.1", rangeF: "1.8 - 7.1", rangeK: "< 6.5" },
        { name: "Catecolaminas en Orina de 24 horas", unit: "mcg/24h", rangeM: "< 100 total", rangeF: "< 100 total", rangeK: "< 100" },
        { name: "Metanefrinas en Orina de 24 horas", unit: "mcg/24h", rangeM: "< 400", rangeF: "< 400", rangeK: "< 400" },
        { name: "Oxalato en Orina de 24 horas", unit: "mg/24h", rangeM: "< 40", rangeF: "< 40", rangeK: "< 40" },
        { name: "Citrato en Orina de 24 horas", unit: "mg/24h", rangeM: "> 320", rangeF: "> 320", rangeK: "> 320" },
    ],
    "Perfil TORCH y Prenatal": [
        { name: "Rubéola IgM", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Herpes Simple Tipo 1 (VHS-1) IgG", unit: "", rangeM: "Variable", rangeF: "Variable", rangeK: "Variable" },
        { name: "Herpes Simple Tipo 2 (VHS-2) IgG", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Herpes Simple IgM", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Citomegalovirus (CMV) IgM", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Parvovirus B19 IgG", unit: "", rangeM: "Variable", rangeF: "Variable", rangeK: "Variable" },
        { name: "Parvovirus B19 IgM", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Varicela-Zóster (VZV) IgG", unit: "", rangeM: "Variable", rangeF: "Variable", rangeK: "Variable" },
        { name: "Hepatitis A (HAV) IgG", unit: "", rangeM: "Variable", rangeF: "Variable", rangeK: "Variable" },
        { name: "Hepatitis A (HAV) IgM", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Hepatitis B - Anti-HBc Total", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Hepatitis B - Anti-HBc IgM", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Hepatitis B - HBeAg", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
    ],
    "Espermatograma (Espermograma)": [
        { name: "Volumen del Eyaculado", unit: "mL", rangeM: "1.5 - 5.0", rangeF: "N/A", rangeK: "N/A" },
        { name: "Concentración de Espermatozoides", unit: "millones/mL", rangeM: "> 15", rangeF: "N/A", rangeK: "N/A" },
        { name: "Conteo Total de Espermatozoides", unit: "millones", rangeM: "> 39", rangeF: "N/A", rangeK: "N/A" },
        { name: "Motilidad Progresiva (PR)", unit: "%", rangeM: "> 32", rangeF: "N/A", rangeK: "N/A" },
        { name: "Motilidad Total (PR + NP)", unit: "%", rangeM: "> 40", rangeF: "N/A", rangeK: "N/A" },
        { name: "Morfología Normal (Kruger)", unit: "%", rangeM: "> 4", rangeF: "N/A", rangeK: "N/A" },
        { name: "Vitalidad Espermática", unit: "%", rangeM: "> 58", rangeF: "N/A", rangeK: "N/A" },
        { name: "pH del Semen", unit: "", rangeM: "7.2 - 8.0", rangeF: "N/A", rangeK: "N/A" },
        { name: "Leucocitos en Semen", unit: "millones/mL", rangeM: "< 1.0", rangeF: "N/A", rangeK: "N/A" },
        { name: "Licuefacción del Semen", unit: "minutos", rangeM: "< 60", rangeF: "N/A", rangeK: "N/A" },
    ],
    "Urocultivo y Cultivos": [
        { name: "Urocultivo (Cuenta de Colonias)", unit: "UFC/mL", rangeM: "< 10,000 (negativo)", rangeF: "< 10,000", rangeK: "< 10,000" },
        { name: "Coprocultivo", unit: "", rangeM: "Sin patógenos", rangeF: "Sin patógenos", rangeK: "Sin patógenos" },
        { name: "Exudado Faríngeo (Cultivo)", unit: "", rangeM: "Flora normal", rangeF: "Flora normal", rangeK: "Flora normal" },
        { name: "Hemocultivo", unit: "", rangeM: "Sin crecimiento", rangeF: "Sin crecimiento", rangeK: "Sin crecimiento" },
        { name: "Cultivo de Secreción Vaginal", unit: "", rangeM: "N/A", rangeF: "Flora normal", rangeK: "N/A" },
        { name: "Cultivo de Secreción Uretral", unit: "", rangeM: "Sin patógenos", rangeF: "Sin patógenos", rangeK: "N/A" },
    ],
    "Enfermedades Infecciosas Especiales": [
        { name: "Helicobacter pylori IgG", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Helicobacter pylori (Antígeno en Heces)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Dengue NS1 (Antígeno)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Dengue IgM", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Dengue IgG", unit: "", rangeM: "Variable", rangeF: "Variable", rangeK: "Variable" },
        { name: "Chikungunya IgM", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Zika IgM", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Brucella (Rosa de Bengala)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Brucella (Anticuerpos 2-Mercaptoetanol)", unit: "dilución", rangeM: "< 1:80", rangeF: "< 1:80", rangeK: "< 1:80" },
        { name: "Mycoplasma pneumoniae IgM", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Epstein-Barr (VEB) IgM (Mononucleosis)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Epstein-Barr (VEB) IgG", unit: "", rangeM: "Variable", rangeF: "Variable", rangeK: "Variable" },
        { name: "Clamidia (Chlamydia trachomatis) IgG", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "N/A" },
        { name: "Clamidia IgM", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "N/A" },
        { name: "VIH Carga Viral (PCR)", unit: "copias/mL", rangeM: "Indetectable", rangeF: "Indetectable", rangeK: "Indetectable" },
        { name: "Hepatitis B Carga Viral (PCR)", unit: "UI/mL", rangeM: "Indetectable", rangeF: "Indetectable", rangeK: "Indetectable" },
        { name: "Hepatitis C Carga Viral (PCR)", unit: "UI/mL", rangeM: "Indetectable", rangeF: "Indetectable", rangeK: "Indetectable" },
    ],
    "Alergias (IgE Específicas)": [
        { name: "IgE Específica a Ácaros del Polvo", unit: "kU/L", rangeM: "< 0.35 (Clase 0)", rangeF: "< 0.35", rangeK: "< 0.35" },
        { name: "IgE Específica a Polen de Gramíneas", unit: "kU/L", rangeM: "< 0.35 (Clase 0)", rangeF: "< 0.35", rangeK: "< 0.35" },
        { name: "IgE Específica a Epitelio de Gato", unit: "kU/L", rangeM: "< 0.35 (Clase 0)", rangeF: "< 0.35", rangeK: "< 0.35" },
        { name: "IgE Específica a Epitelio de Perro", unit: "kU/L", rangeM: "< 0.35 (Clase 0)", rangeF: "< 0.35", rangeK: "< 0.35" },
        { name: "IgE Específica a Leche de Vaca", unit: "kU/L", rangeM: "< 0.35 (Clase 0)", rangeF: "< 0.35", rangeK: "< 0.35" },
        { name: "IgE Específica a Huevo", unit: "kU/L", rangeM: "< 0.35 (Clase 0)", rangeF: "< 0.35", rangeK: "< 0.35" },
        { name: "IgE Específica a Trigo (Gluten)", unit: "kU/L", rangeM: "< 0.35 (Clase 0)", rangeF: "< 0.35", rangeK: "< 0.35" },
        { name: "IgE Específica a Mariscos", unit: "kU/L", rangeM: "< 0.35 (Clase 0)", rangeF: "< 0.35", rangeK: "< 0.35" },
        { name: "IgE Específica a Cacahuate", unit: "kU/L", rangeM: "< 0.35 (Clase 0)", rangeF: "< 0.35", rangeK: "< 0.35" },
        { name: "IgE Específica a Látex", unit: "kU/L", rangeM: "< 0.35 (Clase 0)", rangeF: "< 0.35", rangeK: "< 0.35" },
        { name: "IgE Específica a Hongos (Aspergillus)", unit: "kU/L", rangeM: "< 0.35 (Clase 0)", rangeF: "< 0.35", rangeK: "< 0.35" },
        { name: "IgE Específica a Soya", unit: "kU/L", rangeM: "< 0.35 (Clase 0)", rangeF: "< 0.35", rangeK: "< 0.35" },
    ],
    "Diabetes Gestacional y Embarazo": [
        { name: "Glucosa Postcarga 50g (Tamiz de Sullivan)", unit: "mg/dL", rangeM: "N/A", rangeF: "< 140", rangeK: "N/A" },
        { name: "Curva de Tolerancia Oral a Glucosa 75g (Embarazo)", unit: "mg/dL", rangeM: "N/A", rangeF: "Ayunas < 92, 1h < 180, 2h < 153", rangeK: "N/A" },
        { name: "Fibronectina Fetal", unit: "ng/mL", rangeM: "N/A", rangeF: "< 50 (negativo)", rangeK: "N/A" },
        { name: "Inhibina A", unit: "pg/mL", rangeM: "N/A", rangeF: "Variable por trimestre", rangeK: "N/A" },
        { name: "PAPP-A (Proteína Plasmática A Asociada al Embarazo)", unit: "mUI/mL", rangeM: "N/A", rangeF: "Variable por semana", rangeK: "N/A" },
        { name: "Estriol Libre (Triple Marcador)", unit: "ng/mL", rangeM: "N/A", rangeF: "Variable por trimestre", rangeK: "N/A" },
    ],
    "Hemoglobinas Especiales y Electroforesis": [
        { name: "Hemoglobina Fetal (HbF)", unit: "%", rangeM: "< 2", rangeF: "< 2", rangeK: "60 - 80 (recién nacido)" },
        { name: "Hemoglobina A2 (HbA2)", unit: "%", rangeM: "2.0 - 3.3", rangeF: "2.0 - 3.3", rangeK: "2.0 - 3.3" },
        { name: "Hemoglobina S (Drepanocítica)", unit: "", rangeM: "Ausente", rangeF: "Ausente", rangeK: "Ausente" },
        { name: "Electroforesis de Hemoglobinas", unit: "", rangeM: "HbA > 95%", rangeF: "HbA > 95%", rangeK: "Variable" },
        { name: "Prueba de Falciformación (Sickling)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
    ],
    "Líquido Cefalorraquídeo (LCR)": [
        { name: "Glucosa en LCR", unit: "mg/dL", rangeM: "40 - 70", rangeF: "40 - 70", rangeK: "40 - 70" },
        { name: "Proteínas en LCR", unit: "mg/dL", rangeM: "15 - 45", rangeF: "15 - 45", rangeK: "15 - 45" },
        { name: "Leucocitos en LCR", unit: "cel/mcL", rangeM: "0 - 5", rangeF: "0 - 5", rangeK: "0 - 30 (neonato)" },
        { name: "Eritrocitos en LCR", unit: "cel/mcL", rangeM: "0", rangeF: "0", rangeK: "0" },
        { name: "ADA en LCR (Adenosina Desaminasa)", unit: "U/L", rangeM: "< 10", rangeF: "< 10", rangeK: "< 10" },
    ],
    "Líquido Sinovial (Articular)": [
        { name: "Leucocitos en Líquido Sinovial", unit: "cel/mcL", rangeM: "< 200", rangeF: "< 200", rangeK: "< 200" },
        { name: "Glucosa en Líquido Sinovial", unit: "mg/dL", rangeM: "Similar a sangre", rangeF: "Similar a sangre", rangeK: "Similar a sangre" },
        { name: "Cristales en Líquido Sinovial (Gota)", unit: "", rangeM: "Ausentes", rangeF: "Ausentes", rangeK: "Ausentes" },
        { name: "Proteínas en Líquido Sinovial", unit: "g/dL", rangeM: "< 3.0", rangeF: "< 3.0", rangeK: "< 3.0" },
    ],
    "Metales Pesados y Toxicología Avanzada": [
        { name: "Mercurio en Sangre", unit: "mcg/L", rangeM: "< 10", rangeF: "< 10", rangeK: "< 10" },
        { name: "Arsénico en Orina", unit: "mcg/L", rangeM: "< 50", rangeF: "< 50", rangeK: "< 50" },
        { name: "Cadmio en Sangre", unit: "mcg/L", rangeM: "< 5", rangeF: "< 5", rangeK: "< 5" },
        { name: "Talio en Orina", unit: "mcg/L", rangeM: "< 2", rangeF: "< 2", rangeK: "< 2" },
        { name: "Litio Sérico (Monitoreo Terapéutico)", unit: "mEq/L", rangeM: "0.6 - 1.2 (terapéutico)", rangeF: "0.6 - 1.2", rangeK: "0.6 - 1.2" },
        { name: "Ácido Valproico (Monitoreo Terapéutico)", unit: "mcg/mL", rangeM: "50 - 100", rangeF: "50 - 100", rangeK: "50 - 100" },
        { name: "Carbamazepina (Monitoreo Terapéutico)", unit: "mcg/mL", rangeM: "4 - 12", rangeF: "4 - 12", rangeK: "4 - 12" },
        { name: "Fenitoína (Monitoreo Terapéutico)", unit: "mcg/mL", rangeM: "10 - 20", rangeF: "10 - 20", rangeK: "10 - 20" },
        { name: "Digoxina (Monitoreo Terapéutico)", unit: "ng/mL", rangeM: "0.8 - 2.0", rangeF: "0.8 - 2.0", rangeK: "Variable" },
        { name: "Teofilina (Monitoreo Terapéutico)", unit: "mcg/mL", rangeM: "10 - 20", rangeF: "10 - 20", rangeK: "10 - 20" },
    ],
    "Perfil Autoinmune Ampliado": [
        { name: "Anticuerpos Anti-Músculo Liso (ASMA)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Anticuerpos Anti-Mitocondriales (AMA)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Anticuerpos Anti-LKM1 (Hígado-Riñón)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Anticuerpos Anti-Centrómero", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Anticuerpos Anti-SCL70 (Topoisomerasa)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Anticuerpos Anti-SSA (Ro)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Anticuerpos Anti-SSB (La)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Anticuerpos Anti-RNP", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Anticuerpos Anti-Smith (Sm)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "ANCA-C (Anticuerpos Anti-Citoplasma de Neutrófilo)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "ANCA-P", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Anti-Transglutaminasa IgA (Enfermedad Celíaca)", unit: "U/mL", rangeM: "< 20", rangeF: "< 20", rangeK: "< 20" },
        { name: "Anti-Endomisio IgA (Enfermedad Celíaca)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Anti-Gliadina IgA (Enfermedad Celíaca)", unit: "U/mL", rangeM: "< 20", rangeF: "< 20", rangeK: "< 20" },
        { name: "Anticuerpos Anti-GAD (Diabetes Autoinmune)", unit: "U/mL", rangeM: "< 10", rangeF: "< 10", rangeK: "< 10" },
        { name: "Anticuerpos Anti-Insulina (IAA)", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
    ],
    "Coproparasitoscópico Ampliado": [
        { name: "Quistes de Parásitos en Heces", unit: "por campo", rangeM: "No se observan", rangeF: "No se observan", rangeK: "No se observan" },
        { name: "Trofozoítos en Heces", unit: "por campo", rangeM: "No se observan", rangeF: "No se observan", rangeK: "No se observan" },
        { name: "Huevos de Helmintos en Heces", unit: "por campo", rangeM: "No se observan", rangeF: "No se observan", rangeK: "No se observan" },
        { name: "Fibras Musculares en Heces", unit: "", rangeM: "Escasas digeridas", rangeF: "Escasas digeridas", rangeK: "Escasas" },
        { name: "Almidones en Heces", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Eritrocitos en Heces", unit: "por campo", rangeM: "No se observan", rangeF: "No se observan", rangeK: "No se observan" },
    ],
    "Grupo Sanguíneo y Compatibilidad": [
        { name: "Grupo Sanguíneo ABO", unit: "", rangeM: "A, B, AB u O", rangeF: "A, B, AB u O", rangeK: "A, B, AB u O" },
        { name: "Factor Rh", unit: "", rangeM: "Positivo o Negativo", rangeF: "Positivo o Negativo", rangeK: "Positivo o Negativo" },
        { name: "Coombs Directo", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
        { name: "Coombs Indirecto", unit: "", rangeM: "Negativo", rangeF: "Negativo", rangeK: "Negativo" },
    ],
};

// Build manifest and fragments
const manifest = [];
let totalCount = 0;

for (const [panelName, biomarkers] of Object.entries(panels)) {
    for (const bm of biomarkers) {
        const s = slug(bm.name);
        const entry = {
            slug: s,
            name: bm.name,
            panel: panelName,
            unit: bm.unit,
            rangeM: bm.rangeM,
            rangeF: bm.rangeF,
            rangeK: bm.rangeK,
            // Placeholder intro for Ollama to fill later
            intro: "Contenido pendiente de generación por IA. Este biomarcador será enriquecido con una explicación detallada de más de 1000 palabras incluyendo: qué es, para qué sirve en el cuerpo, qué significa tenerlo alto, qué significa tenerlo bajo, historia clínica del descubrimiento, y datos curiosos.",
            highMeaning: "Pendiente de generación por IA.",
            lowMeaning: "Pendiente de generación por IA.",
            relatedStudyUrl: "/estudios"
        };

        manifest.push(entry);

        // Write individual fragment
        const fragPath = path.join(fragDir, s + '.json');
        fs.writeFileSync(fragPath, JSON.stringify(entry, null, 2));
        totalCount++;
    }
}

// Write manifest
const manifestPath = path.join(__dirname, 'src', 'data', 'biomarkers.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log('✅ Generados ' + totalCount + ' biomarcadores.');
console.log('📂 Manifest: ' + manifestPath);
console.log('📁 Fragmentos: ' + fragDir);

// Summary by panel
for (const [panelName, biomarkers] of Object.entries(panels)) {
    console.log('  ' + panelName + ': ' + biomarkers.length + ' parámetros');
}
