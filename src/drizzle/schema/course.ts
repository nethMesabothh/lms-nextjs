import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { createAt, id, updateAt } from "../schemaHelpers";
import { CourseProductTable } from "./courseProduct";

export const CourseTable = pgTable("courses", {
	id,
	name: text().notNull(),
	description: text().notNull(),
	createAt,
	updateAt,
});

export const CourseRelationships = relations(CourseTable, ({ one, many }) => ({
	courseProducts: many(CourseProductTable),
}));
