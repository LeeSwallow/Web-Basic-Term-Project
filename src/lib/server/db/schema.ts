import { pgTable, uuid, text, boolean, timestamp, integer, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
	id: uuid('id').primaryKey().default(crypto.randomUUID()),
	name: text('name').notNull(),
	email: text('email').notNull(),
	password: text('password').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const todos = pgTable('todo', {
	id: uuid('id').primaryKey().default(crypto.randomUUID()),
	content: text('content').notNull(),
	completed: boolean('completed').notNull().default(false),
	hidden: boolean('hidden').notNull().default(false),
	pomodoroCount: integer('pomodoro_count').notNull().default(0),
	minPomodoroCount: integer('min_pomodoro_count').notNull().default(0),
	userId: uuid('user_id')
		.references(() => users.id)
		.notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
	dueDate: timestamp('due_date')
});

export const session = pgTable('session', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type Session = typeof session.$inferSelect;
export type User = typeof users.$inferSelect;
export type Todo = typeof todos.$inferSelect;