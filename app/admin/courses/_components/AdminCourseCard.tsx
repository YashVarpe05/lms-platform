import { AdminCourseType } from "@/app/data/admin/admin-get-courses";
import { Card, CardContent } from "@/components/ui/card";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
	data: AdminCourseType;
}

export function AdminCourseCard({ data }: iAppProps) {
	const thumbnailUrl = useConstructUrl(data.fileKey);
	return (
		<Card className="group relative">
			{/* absolute dropdrown */}
			<div></div>
			<Image
				width={600}
				height={400}
				src={thumbnailUrl}
				alt="Thumbnail Url"
				className="w-full rounded-t-lg aspect-video h-full object-cover"
			/>
			<CardContent>
				<Link
					href={`/admin/courses/${data.id}`}
					className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
				>
					{data.title}
				</Link>
				<p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
					{data.smallDescription}
				</p>
				<div className="mt-4 flex items-center gap-x-5">
					<div>
						<TimerIcon />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

// https://yashvarpe-lms.t3.storage.dev/
