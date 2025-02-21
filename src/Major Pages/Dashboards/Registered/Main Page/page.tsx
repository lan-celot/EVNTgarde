/////////////////////////* MAIN PAGE FOR DEMO ONLY.... MUST EDIT */////////////////////////
"use client";

import { useRouter } from "next/navigation";
import { Button } from "../Elements/ui/button";

export default function Home() {
	const router = useRouter();

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-6">
			<h1 className="text-2xl font-bold">Select Your Role</h1>

			<div className="flex gap-4">
				<Button onClick={() => router.push("/customer")}>Customer</Button>
				<Button onClick={() => router.push("/organizer")}>Organizer</Button>
				<Button onClick={() => router.push("/vendor")}>Vendor</Button>
			</div>
		</div>
	);
}
