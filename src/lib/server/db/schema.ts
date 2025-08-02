import {
	pgTable,
	text,
	timestamp,
	index,
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
		id: uuid('id').primaryKey().defaultRandom(),

		// Relationship back to the main agent
		agentId: uuid('agent_id')
			.notNull()
			.references(() => agents.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade'
			}),

		// The user who created / owns the profile
		userId: uuid('user_id').notNull(),

		// Access code given to the agent
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