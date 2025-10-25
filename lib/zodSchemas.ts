import z, { file } from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export const courseStatus = ["Draft", "Published", "Archived"] as const;
export const courseCategories = [
	"development",
	"Business",
	"Finance",
	"IT & Software",
	"Design",
	"Marketing",
	"Personal Development",
	"Photography",
	"Health & Fitness",
	"Music",
	"Lifestyle",
	"Teaching & Academics",
] as const;
export const courseSchema = z.object({
	title: z
		.string()
		.min(3, { message: "Title Must be at least 3 characters long " })
		.max(100, { message: "Title Must be at least 100 characters long" }),
	description: z
		.string()
		.min(3, { message: "Description Must be at least 3 characters long" })
		.max(2555, {
			message: "Description Must be at least 2555 characters long",
		}),
	fileKey: z
		.string()
		.min(1, { message: "File Key Must be at least 1 character long" }),
	price: z.coerce.number().min(1, { message: "Price Must be at least 1" }),
	duration: z.coerce
		.number()
		.min(1, { message: "Duration Must be at least 1" })
		.max(500, { message: "Duration Must be at most 500" }),
	level: z.enum(courseLevels, {
		message: "Level Must be one of Beginner, Intermediate, Advanced",
	}),
	categories: z.enum(courseCategories,{message: "Category Must be one of: " + courseCategories.join(", ")}),
	smallDescription: z
		.string()
		.min(3, { message: "Small Description Must be at least 3 characters long" })
		.max(200, {
			message: "Small Description Must be at most 200 characters long",
		}),
	slug: z
		.string()
		.min(3, { message: "Slug Must be at least 3 characters long" }),
	status: z.enum(courseStatus, {
		message: "Status Must be one of: " + courseStatus.join(", "),
	}),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
