"use client";

import { tryCatch } from "@/hooks/try-catch";
import {
	courseCategories,
	courseLevels,
	courseSchema,
	CourseSchemaType,
	courseStatus,
} from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { CreateCourse } from "../../../create/actions";
import { toast } from "sonner";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import slugify from "slugify";
import { Loader2, PlusIcon, SparkleIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/rich-text-editor/Editor";
import { Uploader } from "@/components/file-uploader/Uploader";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { editCourse } from "../actions";
import { AdminCourseSingularType } from "@/app/data/admin/admin-get-course";

interface iAppProps {
	data: AdminCourseSingularType;
}

export function EditCourseForm({ data }: iAppProps) {
	const [pending, startTransition] = useTransition();
	const router = useRouter();
	const form = useForm<CourseSchemaType>({
		resolver: zodResolver(courseSchema),
		defaultValues: {
			title: data.title,
			description: data.description,
			fileKey: data.fileKey,
			price: data.price,
			duration: data.duration,
			level: data.level,
			category: data.category as CourseSchemaType["category"],
			status: data.status,
			slug: data.slug,
			smallDescription: data.smallDescription,
		},
	});
	function onSubmit(values: CourseSchemaType) {
		// try {
		// } catch {}
		startTransition(async () => {
			const { data: result, error } = await tryCatch(
				editCourse(values, data.id)
			);

			if (error) {
				toast.error("An unexpected error occurred. Please try again.");
				return;
			}
			if (result.status === "success") {
				toast.success(result.message);
				form.reset();
				router.push("/admin/courses");
			} else if (result.status === "error") {
				toast.error(result.message);
			}
		});
	}
	return (
		<Form {...form}>
			<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Title" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex gap-4 items-end">
					<FormField
						control={form.control}
						name="slug"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Slug</FormLabel>
								<FormControl>
									<Input placeholder="Slug" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="button"
						className="w-fit"
						onClick={() => {
							const titleValue = form.getValues("title");
							const slug = slugify(titleValue);
							form.setValue("slug", slug, { shouldValidate: true });
						}}
					>
						Generate Slug <SparkleIcon className="ml-1" size={16} />
					</Button>
				</div>
				<FormField
					control={form.control}
					name="smallDescription"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Small Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Small Description"
									className="min-h-[120px]"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<RichTextEditor field={field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="fileKey"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Thumbnail image</FormLabel>
							<FormControl>
								<Uploader onChange={field.onChange} value={field.value} />
								{/* <Input placeholder="Thumbnail Url" {...field} /> */}
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select Category" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{courseCategories.map((category) => (
											<SelectItem key={category} value={category}>
												{category}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="level"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Level</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select Value" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{courseLevels.map((level) => (
											<SelectItem key={level} value={level}>
												{level}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="duration"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Duration (Hours)</FormLabel>
								<FormControl>
									<Input
										placeholder="Duration (Hours)"
										type="number"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price (₹) </FormLabel>
								<FormControl>
									<Input placeholder="Price" type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select Status" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{courseStatus.map((status) => (
										<SelectItem key={status} value={status}>
											{status}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="cursor-pointer" type="submit" disabled={pending}>
					{pending ? (
						<>
							Updating...
							<Loader2 className="animate-spin ml-1" />
						</>
					) : (
						<>
							Update
							<PlusIcon className="ml-1" size={16} />
						</>
					)}
				</Button>
			</form>
		</Form>
	);
}
