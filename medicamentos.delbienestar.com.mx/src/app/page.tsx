import fs from 'fs';
import path from 'path';
import MedicationClient from '@/components/MedicationClient';

// Parse the JSON data
async function getMedications() {
  const filePath = path.join(process.cwd(), 'scripts', 'medication-master-list.json');
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("No se encontró el archivo maestro de medicamentos.");
    return [];
  }
}

export default async function Home() {
  const medications = await getMedications();

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <MedicationClient initialMedications={medications} />
    </main>
  );
}
