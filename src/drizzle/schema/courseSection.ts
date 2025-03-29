import { pgEnum, pgTable, text, integer, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { CourseTable } from "./course";
import { relations } from "drizzle-orm";
import { LessonTable } from "./lesson";

export const courseSectionStatus = ["public", "private"] as const;
export type CourseSectionStatus = (typeof courseSectionStatus)[number];
export const courseSectionStatusEnum = pgEnum(
	"course_section_status",
	courseSectionStatus
);

export const CourseSectionTable = pgTable("course_section", {
	id,
	name: text().notNull(),
	status: courseSectionStatusEnum().notNull().default("private"),
	order: integer().notNull(),
	courseId: uuid()
		.notNull()
		.references(() => CourseTable.id, { onDelete: "cascade" }),
	createdAt,
	updatedAt,
});

export const CourseSectionRelationships = relations(
	CourseSectionTable,
	({ one, many }) => ({
		course: one(CourseTable, {
			fields: [CourseSectionTable.courseId],
			references: [CourseTable.id],
		}),
		lessons: many(LessonTable),
	})
);
