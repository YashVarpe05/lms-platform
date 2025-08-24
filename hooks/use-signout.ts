"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/router";
import { toast } from "sonner";

export function useSignOut() {
	const router = useRouter();

	const handleSignout = async function sigOut() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/");
					toast.success("signed out Successfully ");
				},
				onError: () => {
					toast.error("Failed to sign out");
				},
			},
		});
	};
	return handleSignout;
}
