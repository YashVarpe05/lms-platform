"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useSignOut() {
	const router = useRouter();

	const handleSignout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					toast.success("signed out Successfully");
					router.push("/");
				},
				onError: () => {
					toast.error("Failed to sign out");
				},
			},
		});
	};
	return handleSignout;
}
