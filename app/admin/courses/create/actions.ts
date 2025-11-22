"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchemas";
import { request } from "@arcjet/next";

const aj = arcjet
	.withRule(
		detectBot({
			mode: "LIVE",
			allow: [],
		})
	)
	.withRule(
		fixedWindow({
			mode: "LIVE",
			window: "1m",
			max: 5,
		})
	);

export async function CreateCourse(
	data: CourseSchemaType
): Promise<ApiResponse> {
	// const session = await auth.api.getSession({
	// 	headers: await headers(),
	// });

	const session = await requireAdmin();

	if (!session?.user?.id) {
		return {
			status: "error",
			message: "Unauthorized - Please log in",
		};
	}

	try {
		const req = await request();
		const decision = await aj.protect(req, {
			fingerprint: session.user.id,
		});

		if (decision.isDenied()) {
			if (decision.reason.isRateLimit()) {
				return {
					status: "error",
					message: "Too many requests - please try again later",
				};
			} else {
				return {
					status: "error",
					message: "you are a bot! if this is a mistake contact support",
				};
			}
		}

		const validation = courseSchema.safeParse(data);

		if (!validation.success) {
			return {
				status: "error",
				message: "Invalid form data",
			};
			// throw new Error("Something failed");
		}
		await prisma.course.create({
			data: {
				...validation.data,
				userId: session.user.id,
			},
		});
		return {
			status: "success",
			message: "Course created successfully",
		};
	} catch (error) {
		console.log(error);

		return {
			status: "error",
			message: "Failed to create course",
		};
	}
}
