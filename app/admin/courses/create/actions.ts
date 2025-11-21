"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchemas";
import { headers } from "next/headers";

export async function CreateCourse(
	data: CourseSchemaType
): Promise<ApiResponse> {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		return {
			status: "error",
			message: "Unauthorized - Please log in",
		};
	}

	try {
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
