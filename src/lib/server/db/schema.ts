import {
	pgTable,
	text,
	timestamp,
	index,
	uniqueIndex,
	integer,
	uuid as pgUuid
} from 'drizzle-orm/pg-core';

const uuid = pgUuid;

export const agents = pgTable(
	'agents',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		surname: text('surname').notNull(),
		firstName: text('first_name').notNull(),
		otherName: text('other_name'),
		email: text('email').notNull(),
		phone: text('phone').notNull(),
		nin: text('nin').notNull().unique(),
		state: text('state').notNull(),
		lga: text('lga').notNull(),
		address: text('address').notNull(),
		createdAt: timestamp('created_at').defaultNow(),
		updatedAt: timestamp('updated_at').defaultNow(),
		deletedAt: timestamp('deleted_at'),
		isActive: text('is_active').default('true').notNull(),
		isAdmitted: text('is_admitted').default('false').notNull(),
		isDeleted: text('is_deleted').default('false').notNull()
	},
	(table) => ({
		emailIndex: index('agents_email_idx').on(table.email),
		phoneIndex: index('agents_phone_idx').on(table.phone),
		stateIndex: index('agents_state_idx').on(table.state),
		lgaIndex: index('agents_lga_idx').on(table.lga),
		activeIndex: index('agents_is_active_idx').on(table.isActive),
		deletedIndex: index('agents_is_deleted_idx').on(table.isDeleted)
	})
);

export const agentProfiles = pgTable(
	'agent_profiles',
	{
		id: uuid('id').primaryKey().notNull()
			.references(() => agents.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade'
			}),
		agentId: text('agent_id')
			.notNull(),
		userId: text('user_id').notNull(),
		accessCode: text('access_code').notNull(),
		passportUrl: text('passport_url'),
		signatureUrl: text('signature_url'),

		createdAt: timestamp('created_at').defaultNow(),
		updatedAt: timestamp('updated_at').defaultNow(),
		deletedAt: timestamp('deleted_at')
	},
	(table) => ({
		agentIndex: index('agent_profiles_agent_id_idx').on(table.agentId),
		userIndex: index('agent_profiles_user_id_idx').on(table.userId),
		accessCodeIndex: index('agent_profiles_access_code_idx').on(table.accessCode)
	})
);

// User table
export const user = pgTable('user', {
	id: text('id').primaryKey().unique(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	email: text('email').notNull().unique(),
	verified: integer('verified').default(0),
	fullName: text('full_name').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
	profilePicture: text('profile_picture').default(''),
	bio: text('bio').default(''),
	country: text('country').default(''),
	state: text('state').default(''),
	city: text('city').default(''),
	address: text('address').default(''),
	phoneNumber: text('phone_number').notNull().unique(),
	phoneVerified: integer('phone_verified').default(0),
	hasPin: integer('has_pin').default(0),
	pinHash: text('pin_hash'),
	banned: integer('banned').default(0),
	passwordChangedAt: timestamp('password_changed_at').$onUpdate(() => new Date()),
	role: text('role').default('user')
}, (table) => ({
	usernameIdx: uniqueIndex('user_username_idx').on(table.username),
	emailIdx: uniqueIndex('user_email_idx').on(table.email),
	phoneIdx: uniqueIndex('user_phone_idx').on(table.phoneNumber),
	createdAtIdx: index('user_created_at_idx').on(table.createdAt),
	updatedAtIdx: index('user_updated_at_idx').on(table.updatedAt),
	countryIdx: index('user_country_idx').on(table.country),
	stateIdx: index('user_state_idx').on(table.state),
	cityIdx: index('user_city_idx').on(table.city),
	addressIdx: index('user_address_idx').on(table.address),
	profilePictureIdx: index('user_profile_picture_idx').on(table.profilePicture),
	bioIdx: index('user_bio_idx').on(table.bio),
	phoneVerifiedIdx: index('user_phone_verified_idx').on(table.phoneVerified),
	hasPinIdx: index('user_has_pin_idx').on(table.hasPin),
	bannedIdx: index('user_banned_idx').on(table.banned),
	passwordChangedAtIdx: index('user_password_changed_at_idx').on(table.passwordChangedAt)
}));

// User roles
export const userRole = pgTable('user_role', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: text('user_id').references(() => user.id), // changed to text to match
	role: text('role').notNull().default('user')
});

// Sessions
export const sessions = pgTable(
	'sessions',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		userId: text('user_id').notNull(),
		token: text('token').notNull().unique(),
		csrfToken: text('csrf_token').notNull(),
		refreshToken: text('refresh_token').notNull(),
		createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
		expiresAt: timestamp('expires_at').notNull()
	},
	(table) => ({
		userIdIdx: index('sessions_user_id_idx').on(table.userId),
		expiresAtIdx: index('sessions_expires_at_idx').on(table.expiresAt),
		csrfTokenIdx: uniqueIndex('sessions_csrf_token_idx').on(table.csrfToken),
		refreshTokenIdx: uniqueIndex('sessions_refresh_token_idx').on(table.refreshToken)
	})
);



// Agents
export type AgentSelect = typeof agents.$inferSelect;
export type AgentInsert = typeof agents.$inferInsert;

// AgentProfiles
export type AgentProfileSelect = typeof agentProfiles.$inferSelect;
export type AgentProfileInsert = typeof agentProfiles.$inferInsert;

// User
export type UserSelect = typeof user.$inferSelect;
export type UserInsert = typeof user.$inferInsert;

// UserRole
export type UserRoleSelect = typeof userRole.$inferSelect;
export type UserRoleInsert = typeof userRole.$inferInsert;

// Sessions
export type SessionSelect = typeof sessions.$inferSelect;
export type SessionInsert = typeof sessions.$inferInsert;
