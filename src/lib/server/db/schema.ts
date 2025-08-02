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
		isActive: text('is_active').default('false').notNull(),
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
