// Schema para correlaciones médicas de estudios
import { pgTable, uuid, varchar, text, integer, decimal, boolean, timestamp } from 'drizzle-orm/pg-core';
import { studies } from '@/db/schema';


// Correlaciones entre estudios (recomendaciones médicas)
export const studyCorrelations = pgTable('study_correlations', {
    id: uuid('id').primaryKey().defaultRandom(),

    // Estudio principal
    studyId: uuid('study_id').references(() => studies.id, { onDelete: 'cascade' }).notNull(),

    // Estudio complementario
    complementaryStudyId: uuid('complementary_study_id').references(() => studies.id, { onDelete: 'cascade' }).notNull(),

    // Tipo de relación médica
    relationType: varchar('relation_type', { length: 50 }).notNull(),
    // 'complements' | 'prerequisite' | 'upgrade' | 'alternative'

    // Razón médica para la recomendación
    medicalReason: text('medical_reason').notNull(),

    // Valor clínico que aporta
    clinicalValue: text('clinical_value').notNull(),

    // Prioridad (1-10)
    priority: integer('priority').default(5),

    // Descuento en bundle (%)
    bundleDiscount: decimal('bundle_discount', { precision: 5, scale: 2 }).default('0.00'),

    // Activo
    isActive: boolean('is_active').default(true),

    // Metadata
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
});

// Biomarcadores que analiza cada estudio
export const studyBiomarkers = pgTable('study_biomarkers', {
    id: uuid('id').primaryKey().defaultRandom(),

    studyId: uuid('study_id').references(() => studies.id, { onDelete: 'cascade' }).notNull(),

    // Nombre del biomarcador
    biomarkerName: varchar('biomarker_name', { length: 100 }).notNull(),

    // Categoría médica
    category: varchar('category', { length: 50 }),

    // Qué mide
    measures: text('measures'),

    // Rango normal
    normalRange: varchar('normal_range', { length: 100 }),

    // Activo
    isActive: boolean('is_active').default(true),

    createdAt: timestamp('created_at').defaultNow()
});
