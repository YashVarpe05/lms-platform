import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		BETTER_AUTH_SECRET: z.string().min(1),
		BETTER_AUTH_URL: z.string().url(),
		AUTH_GITHUB_CLIENT_ID: z.string().min(1),
		AUTH_GITHUB_SECRET: z.string().min(1),
		RESEND_API_KEY: z.string().min(1),
	},

	// If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually

	// For Next.js >= 13.4.4, you only need to destructure client variables:
	experimental__runtimeEnv: {
		NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
	},
});
