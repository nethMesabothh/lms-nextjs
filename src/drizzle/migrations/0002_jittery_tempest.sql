ALTER TABLE "user" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "courses" RENAME COLUMN "createAt" TO "createdAt";--> statement-breakpoint
ALTER TABLE "courses" RENAME COLUMN "updateAt" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "course_product" RENAME COLUMN "createAt" TO "createdAt";--> statement-breakpoint
ALTER TABLE "course_product" RENAME COLUMN "updateAt" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "course_section" RENAME COLUMN "createAt" TO "createdAt";--> statement-breakpoint
ALTER TABLE "course_section" RENAME COLUMN "updateAt" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "lessons" RENAME COLUMN "createAt" TO "createdAt";--> statement-breakpoint
ALTER TABLE "lessons" RENAME COLUMN "updateAt" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "createAt" TO "createdAt";--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "updateAt" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "purchases" RENAME COLUMN "createAt" TO "createdAt";--> statement-breakpoint
ALTER TABLE "purchases" RENAME COLUMN "updateAt" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "deleteAt" TO "deletedAt";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "createAt" TO "createdAt";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "updateAt" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "user_course_access" RENAME COLUMN "createAt" TO "createdAt";--> statement-breakpoint
ALTER TABLE "user_course_access" RENAME COLUMN "updateAt" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "user_lesson_complete" RENAME COLUMN "createAt" TO "createdAt";--> statement-breakpoint
ALTER TABLE "user_lesson_complete" RENAME COLUMN "updateAt" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "user_clerkUserId_unique";--> statement-breakpoint
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user_course_access" DROP CONSTRAINT "user_course_access_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user_lesson_complete" DROP CONSTRAINT "user_lesson_complete_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_course_access" ADD CONSTRAINT "user_course_access_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_lesson_complete" ADD CONSTRAINT "user_lesson_complete_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_clerkUserId_unique" UNIQUE("clerkUserId");