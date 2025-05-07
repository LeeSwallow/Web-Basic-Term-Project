import { pgTable, uuid, text, boolean, timestamp, integer } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: uuid('id').primaryKey(),
	name: text('name').notNull(),
	loginId: text('login_id').notNull(),
	password: text('password').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});

export const todo = pgTable('todo', {
	id: uuid('id').primaryKey(),
	content: text('content'),
	completed: boolean('completed'),
	pomodoroCount: integer('pomodoro_count'),
	minPomodoroCount: integer('min_pomodoro_count'),
	userId: uuid('user_id').references(() => user.id),
	dueDate: timestamp('due_date'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});
