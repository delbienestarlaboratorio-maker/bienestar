// Database schema for study relationships and panels
// Enables intelligent study recommendations and panel creation

import { pgTable, text, integer, decimal, timestamp, boolean, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { studies } from '../schema';

// ==========================================
// STUDY RELATIONSHIPS
// ==========================================

export const studyRelationships = pgTable('study_relationships', {
    id: uuid('id').defaultRandom().primaryKey(),

    // Study being viewed
    studyId: text('study_id').notNull().references(() => studies.id),

    // Related study
    relatedStudyId: text('related_study_id').notNull().references(() => studies.id),

    // Type of relationship
    relationshipType: text('relationship_type').notNull(), // 'similar', 'complementary', 'prerequisite', 'follow-up'

    // Strength of relationship (1-10)
    strength: integer('strength').notNull().default(5),

    // Reason for relationship (for display)
    reason: text('reason'),

    // Display order
    displayOrder: integer('display_order').default(0),

    // Metadata
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// ==========================================
// STUDY PANELS
// ==========================================

export const studyPanels = pgTable('study_panels', {
    id: uuid('id').defaultRandom().primaryKey(),

    // Panel info
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),

    // Pricing
    basePrice: decimal('base_price', { precision: 10, scale: 2 }).notNull(),
    discountPercentage: integer('discount_percentage').notNull().default(0), // 0-100

    // Categories
    category: text('category').notNull(),
    subcategory: text('subcategory'),

    // Medical info
    medicalSpecialty: text('medical_specialty'), // 'nephrology', 'cardiology', etc.
    recommendedFor: text('recommended_for'), // JSON array of conditions

    // SEO
    metaTitle: text('meta_title'),
    metaDescription: text('meta_description'),

    // Display
    displayOrder: integer('display_order').default(0),
    isActive: boolean('is_active').default(true),
    isFeatured: boolean('is_featured').default(false),

    // Stats (for tracking popularity)
    viewCount: integer('view_count').default(0),
    purchaseCount: integer('purchase_count').default(0),

    // Metadata
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// ==========================================
// PANEL ITEMS (Many-to-Many)
// ==========================================

export const panelItems = pgTable('panel_items', {
    id: uuid('id').defaultRandom().primaryKey(),

    // Panel
    panelId: uuid('panel_id').notNull().references(() => studyPanels.id, { onDelete: 'cascade' }),

    // Study
    studyId: text('study_id').notNull().references(() => studies.id),

    // Display order within panel
    displayOrder: integer('display_order').default(0),

    // Optional: Override study price for this panel
    customPrice: decimal('custom_price', { precision: 10, scale: 2 }),

    // Is this study required or optional in the panel?
    isRequired: boolean('is_required').default(true),

    // Metadata
    createdAt: timestamp('created_at').defaultNow().notNull()
});

// ==========================================
// STUDY RECOMMENDATIONS (Analytics)
// ==========================================

export const studyRecommendations = pgTable('study_recommendations', {
    id: uuid('id').defaultRandom().primaryKey(),

    // Source study (what user was viewing)
    sourceStudyId: text('source_study_id').notNull().references(() => studies.id),

    // Recommended study or panel
    recommendationType: text('recommendation_type').notNull(), // 'study' or 'panel'
    recommendationId: text('recommendation_id').notNull(), // studyId or panelId

    // Analytics
    impressions: integer('impressions').default(0), // How many times shown
    clicks: integer('clicks').default(0), // How many times clicked
    conversions: integer('conversions').default(0), // How many times added to cart

    // Performance metrics
    ctr: decimal('ctr', { precision: 5, scale: 2 }).default('0'), // Click-through rate
    conversionRate: decimal('conversion_rate', { precision: 5, scale: 2 }).default('0'),

    // Metadata
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// ==========================================
// COMPETITOR VISITS (Analytics)
// ==========================================

export const competitorVisits = pgTable('competitor_visits', {
    id: uuid('id').defaultRandom().primaryKey(),

    // Session info
    sessionId: text('session_id').notNull(),

    // Competitor info
    competitorName: text('competitor_name').notNull(),
    competitorDomain: text('competitor_domain').notNull(),
    referrer: text('referrer'),

    // User info
    userAgent: text('user_agent'),
    deviceType: text('device_type'), // 'mobile', 'desktop', 'tablet'

    // Did they convert?
    didConvert: boolean('did_convert').default(false),
    conversionValue: decimal('conversion_value', { precision: 10, scale: 2 }),

    // Metadata
    timestamp: timestamp('timestamp').defaultNow().notNull()
});

// ==========================================
// DYNAMIC PRICING ANALYTICS
// ==========================================

export const pricingAnalytics = pgTable('pricing_analytics', {
    id: uuid('id').defaultRandom().primaryKey(),

    // Study info
    studyId: text('study_id').notNull().references(() => studies.id),

    // Session info
    sessionId: text('session_id').notNull(),

    // Pricing
    basePrice: decimal('base_price', { precision: 10, scale: 2 }).notNull(),
    finalPrice: decimal('final_price', { precision: 10, scale: 2 }).notNull(),
    discountPercentage: decimal('discount_percentage', { precision: 5, scale: 2 }).notNull(),

    // Factors applied (JSON)
    appliedFactors: text('applied_factors'), // JSON array of factors

    // Visitor info
    visitedCompetitor: boolean('visited_competitor').default(false),
    competitorName: text('competitor_name'),
    timeOnSite: integer('time_on_site'), // seconds
    pageViews: integer('page_views'),

    // Conversion
    addedToCart: boolean('added_to_cart').default(false),
    purchased: boolean('purchased').default(false),

    // Metadata
    timestamp: timestamp('timestamp').defaultNow().notNull()
});

// ==========================================
// CART ABANDONMENTS
// ==========================================

export const cartAbandonments = pgTable('cart_abandonments', {
    id: uuid('id').defaultRandom().primaryKey(),

    // Session info
    sessionId: text('session_id').notNull(),
    userEmail: text('user_email'), // if logged in

    // Cart info
    items: text('items').notNull(), // JSON array of cart items
    totalValue: decimal('total_value', { precision: 10, scale: 2 }).notNull(),

    // Recovery attempts
    emailSent: boolean('email_sent').default(false),
    emailSentAt: timestamp('email_sent_at'),
    smsSent: boolean('sms_sent').default(false),
    smsSentAt: timestamp('sms_sent_at'),

    // Recovery
    recovered: boolean('recovered').default(false),
    recoveredAt: timestamp('recovered_at'),
    recoveryValue: decimal('recovery_value', { precision: 10, scale: 2 }),

    // Metadata
    abandonedAt: timestamp('abandoned_at').defaultNow().notNull()
});
