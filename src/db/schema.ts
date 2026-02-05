import { pgTable, text, integer, real, timestamp, boolean, uuid, jsonb } from 'drizzle-orm/pg-core';

// Tabla de categorías (migrada de SQLite)
export const categories = pgTable('categories', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    icon: text('icon'),
    image: text('image'),
    isActive: boolean('is_active').notNull().default(true),
    order: integer('order').notNull().default(0),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Tabla de subcategorías
export const subcategories = pgTable('subcategories', {
    id: text('id').primaryKey(),
    categoryId: text('category_id').notNull().references(() => categories.id),
    name: text('name').notNull(),
    description: text('description'),
    isActive: boolean('is_active').notNull().default(true),
    order: integer('order').notNull().default(0),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Tabla de estudios
export const studies = pgTable('studies', {
    id: text('id').primaryKey(),
    slug: text('slug').notNull().unique(),
    name: text('name').notNull(),
    categoryId: text('category_id').notNull().references(() => categories.id),
    subcategoryId: text('subcategory_id').references(() => subcategories.id),
    description: text('description'),
    preparation: text('preparation'),
    turnaroundTime: text('turnaround_time'),
    priceRegular: real('price_regular').notNull(),
    pricePromotional: real('price_promotional'),
    profitMargin: real('profit_margin').default(0),
    image: text('image'),
    isActive: boolean('is_active').notNull().default(true),
    views: integer('views').notNull().default(0),
    // Detailed SEO Content
    whatIsIt: text('what_is_it'),
    whatDoesItDetect: jsonb('what_does_it_detect'),
    benefits: jsonb('benefits'),
    detailedPreparation: jsonb('detailed_preparation'),
    included: jsonb('included'),
    faqs: jsonb('faqs'),
    searchTerms: jsonb('search_terms'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ============================================
// NUEVAS TABLAS PARA AUTENTICACIÓN
// ============================================

// Tabla de usuarios con roles
export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(), // Hasheado con bcrypt
    role: text('role', { enum: ['super_admin', 'admin', 'editor', 'viewer'] }).notNull().default('viewer'),
    isActive: boolean('is_active').notNull().default(true),
    lastLogin: timestamp('last_login'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Tabla de sesiones para NextAuth
export const sessions = pgTable('sessions', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    sessionToken: text('session_token').notNull().unique(),
    expires: timestamp('expires').notNull(),
});

// Tabla de cuentas (para OAuth futuro)
export const accounts = pgTable('accounts', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
});

// Tabla de verificación de tokens
export const verificationTokens = pgTable('verification_tokens', {
    identifier: text('identifier').notNull(),
    token: text('token').notNull().unique(),
    expires: timestamp('expires').notNull(),
});

// Tabla de logs de actividad (auditoría)
export const activityLogs = pgTable('activity_logs', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.id),
    action: text('action').notNull(), // "login", "logout", "create_study", etc.
    resource: text('resource'), // "studies", "users", "settings"
    resourceId: text('resource_id'),
    details: text('details'), // JSON string con detalles
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    timestamp: timestamp('timestamp').notNull().defaultNow(),
});

// Tabla de configuración de APIs
export const apiConfigs = pgTable('api_configs', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull().unique(), // "tilde_ia", "ollama", "openai"
    displayName: text('display_name').notNull(),
    baseUrl: text('base_url').notNull(),
    port: integer('port'),
    apiKey: text('api_key'), // Debe encriptarse antes de guardar
    isActive: boolean('is_active').notNull().default(true),
    lastTested: timestamp('last_tested'),
    testStatus: text('test_status', { enum: ['online', 'offline', 'unknown'] }).default('unknown'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Tabla de citas/agenda médica
export const appointments = pgTable('appointments', {
    id: uuid('id').primaryKey().defaultRandom(),
    // Información del paciente
    patientName: text('patient_name').notNull(),
    patientEmail: text('patient_email').notNull(),
    patientPhone: text('patient_phone').notNull(),
    // Estudio  
    studyId: text('study_id').notNull(),
    studyName: text('study_name').notNull(),
    // Fecha y hora preferida
    preferredDate: timestamp('preferred_date', { mode: 'date' }).notNull(),
    preferredTime: text('preferred_time').notNull(), // "09:00", "14:30", etc
    // Notas adicionales
    notes: text('notes'),
    // Estado de la cita
    status: text('status', {
        enum: ['pending', 'confirmed', 'completed', 'cancelled']
    }).notNull().default('pending'),
    // Admin notes (interno)
    adminNotes: text('admin_notes'),
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    confirmedAt: timestamp('confirmed_at'),
    cancelledAt: timestamp('cancelled_at'),
});

