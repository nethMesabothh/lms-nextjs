import { Button } from "@/components/ui/button";
import { canAccessAdminPage } from "@/permission/general";
import { getCurrentUser } from "@/services/clerk";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { Suspense } from "react";

export default function ConsumerLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
}

function Navbar() {
	return (
		<header className="flex h-12 shadow bg-background z-10">
			<nav className="flex gap-4 container">
				<Link
					className="mr-auto text-lg hover:underline px-2 flex items-center"
					href="/"
				>
					CCS
				</Link>
				<Suspense>
					<SignedIn>
						<AdminLink />
						<Link
							href="/courses"
							className="hover:bg-accent/10 flex items-center px-2"
						>
							My Course
						</Link>
						<Link
							href="/purchases"
							className="hover:bg-accent/10 flex items-center px-2"
						>
							Purchase History
						</Link>
						<div className="size-8 self-center">
							<UserButton
								appearance={{
									elements: {
										userButtonAvatarBox: { width: "100%", height: "100%" },
									},
								}}
							/>
						</div>
					</SignedIn>
				</Suspense>
				<Suspense>
					<SignedOut>
						<Button className="self-center" asChild>
							<SignInButton>Sign In</SignInButton>
						</Button>
					</SignedOut>
				</Suspense>
			</nav>
		</header>
	);
}

async function AdminLink() {
	const user = await getCurrentUser({ allData: true });

	console.log(user.user?.name);

	if (!canAccessAdminPage(user)) return null;

	return (
		<Link href="/admin" className="hover:bg-accent/10 flex items-center px-2">
			Admin
		</Link>
	);
}
