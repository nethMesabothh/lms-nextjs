import { pgEnum, pgTable, text, integer, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { CourseSectionTable } from "./courseSection";
import { relations } from "drizzle-orm";
import { UserLessonCompleteTable } from "./userLessonComplete";

export const lessonStatus = ["public", "private", "preview"] as const;
export type lessonStatus = (typeof lessonStatus)[number];
export const lessonStatusEnum = pgEnum("lesson_status", lessonStatus);

export const LessonTable = pgTable("lessons", {
	id,
	name: text().notNull(),
	description: text(),
	youtubeVideoId: text().notNull(),
	order: integer().notNull(),
	status: lessonStatusEnum().notNull().default("private"),
	sectionId: uuid()
		.notNull()
		.references(() => CourseSectionTable.id, { onDelete: "cascade" }),
	createdAt,
	updatedAt,
});

export const LessonRelationships = relations(LessonTable, ({ one, many }) => ({
	section: one(CourseSectionTable, {
		fields: [LessonTable.sectionId],
		references: [CourseSectionTable.id],
	}),
	userLessonsComplete: many(UserLessonCompleteTable),
}));
