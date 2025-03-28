import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { CourseTable } from "./course";
import { ProductTable } from "./product";
import { createAt, updateAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";

export const CourseProductTable = pgTable(
	"course_product",
	{
		courseId: uuid()
			.notNull()
			.references(() => CourseTable.id, { onDelete: "restrict" }),
		productId: uuid()
			.notNull()
			.references(() => ProductTable.id, { onDelete: "cascade" }),
		createAt,
		updateAt,
	},
	(table) => [primaryKey({ columns: [table.courseId, table.productId] })]
);

export const CourseProductRelationships = relations(
	CourseProductTable,
	({ one }) => ({
		course: one(CourseTable, {
			fields: [CourseProductTable.courseId],
			references: [CourseTable.id],
		}),
		product: one(ProductTable, {
			fields: [CourseProductTable.productId],
			references: [ProductTable.id],
		}),
	})
);
