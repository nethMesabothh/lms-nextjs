import { userRole } from "@/drizzle/schema";

export function canAccessAdminPage({ role }: { role: userRole | undefined }) {
	return role === "admin";
}
