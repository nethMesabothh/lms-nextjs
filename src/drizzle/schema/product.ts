import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createAt, id, updateAt } from "../schemaHelpers";
import { CourseProductTable } from "./courseProduct";

export const productStatus = ["public", "private"] as const;
export type ProductStatus = (typeof productStatus)[number];
export const productStatusEnum = pgEnum("product_status", productStatus);

export const ProductTable = pgTable("products", {
	id,
	name: text().notNull(),
	description: text().notNull(),
	imageUrl: text().notNull(),
	priceInDollar: integer().notNull(),
	status: productStatusEnum().notNull().default("private"),
	createAt,
	updateAt,
});

export const ProductRelationships = relations(
	ProductTable,
	({ one, many }) => ({
		courseProducts: many(CourseProductTable),
	})
);
