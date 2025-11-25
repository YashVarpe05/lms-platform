import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { emailOTP } from "better-auth/plugins";
import { env } from "./env";
import { resend } from "./resend";
import { admin } from "better-auth/plugins";
export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql", // or "mysql", "sqlite", ...etc
	}),
	socialProviders: {
		github: {
			clientId: env.AUTH_GITHUB_CLIENT_ID,
			clientSecret: env.AUTH_GITHUB_SECRET,
		},
	},
	plugins: [
		emailOTP({
			async sendVerificationOTP({ email, otp }) {
				// Implement your email sending logic here
				await resend.emails.send({
					from: "Yash LMS <onboarding@resend.dev>",
					to: [email],
					subject: "Yash LMS - Email Verification",
					html: `
						<!DOCTYPE html>
						<html>
						<head>
							<meta charset="utf-8">
							<title>Email Verification</title>
							<style>
								body {
									font-family: Arial, sans-serif;
									line-height: 1.6;
									color: #333;
								}
								.container {
									max-width: 600px;
									margin: 0 auto;
									padding: 20px;
									background-color: #f9f9f9;
								}
								.header {
									background-color: #4a154b;
									padding: 20px;
									text-align: center;
									color: white;
								}
								.content {
									background-color: white;
									padding: 30px;
									border-radius: 5px;
									margin-top: 20px;
									box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
								}
								.otp-code {
									font-size: 32px;
									font-weight: bold;
									letter-spacing: 5px;
									padding: 10px 20px;
									background-color: #f0f0f0;
									border-radius: 4px;
									color: #4a154b;
									text-align: center;
									margin: 30px 0;
								}
								.footer {
									margin-top: 20px;
									text-align: center;
									font-size: 12px;
									color: #999;
								}
							</style>
						</head>
						<body>
							<div class="container">
								<div class="header">
									<h1>Yash LMS</h1>
								</div>
								<div class="content">
									<h2>Verify Your Email Address</h2>
									<p>Thank you for registering with Yash LMS. Please use the verification code below to complete your registration:</p>
									
									<div class="otp-code">${otp}</div>
									
									<p>This code will expire in 10 minutes. If you did not request this verification, please ignore this email.</p>
								</div>
								<div class="footer">
									<p>&copy; ${new Date().getFullYear()} Yash LMS. All rights reserved.</p>
								</div>
							</div>
						</body>
						</html>
					`,
				});
			},
		}),
		admin(),
	],
});
