import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { CourseTable } from "./course";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";

export const UserCourseAccessTable = pgTable(
	"user_course_access",
	{
		userId: uuid()
			.notNull()
			.references(() => UserTable.id, { onDelete: "cascade" }),
		courseId: uuid()
			.notNull()
			.references(() => CourseTable.id, { onDelete: "cascade" }),
		createdAt,
		updatedAt,
	},
	(table) => [primaryKey({ columns: [table.userId, table.courseId] })]
);

export const UserCourseAccessRelationships = relations(
	UserCourseAccessTable,
	({ one, many }) => ({
		user: one(UserTable, {
			fields: [UserCourseAccessTable.userId],
			references: [UserTable.id],
		}),
		course: one(CourseTable, {
			fields: [UserCourseAccessTable.courseId],
			references: [CourseTable.id],
		}),
	})
);
