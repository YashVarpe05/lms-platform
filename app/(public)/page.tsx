"use client";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface featuresProps {
	title: string;
	description: string;
	icon: string;
}

const features: featuresProps[] = [
	{
		title: "Comprehensive Course",
		description:
			"Access a wide range of carefully curated designed by industry experts.",
		icon: "📖",
	},
	{
		title: "Interactive Learning",
		description:
			"Engage with interactive content and assessments to reinforce your understanding.",
		icon: "🧩",
	},
	{
		title: "Progress Tracking",
		description:
			"Monitor your progress and achievements throughout the course.",
		icon: "📈",
	},
	{
		title: "Community Support",
		description:
			"Connect with fellow learners and instructors for guidance and support.",
		icon: "⏰",
	},
];

export default function Home() {
	const router = useRouter();
	const { data: session } = authClient.useSession();

	async function signOut() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/");
					toast.success("Successfully signed out!");
				},
			},
		});
	}

	return (
		<>
			<section className="relative py-20">
				<div className="flex flex-col items-center text-center space-y-8">
					<Badge variant="outline">The Future of Online Education</Badge>
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight ">
						Elevate your Learning Experience
					</h1>
					<p className="max-w-[700px] text-muted-foreground md:text-xl ">
						Discover a new way to learn with our modern, interactive learning
						management system. Access high-quality resources and tools to
						enhance your educational journey.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 mt-8">
						<Link href="/courses" className={buttonVariants({ size: "lg" })}>
							Explore Courses
						</Link>
						{session ? (
							<Button onClick={signOut} size="lg" variant="outline">
								Sign Out
							</Button>
						) : (
							<Link
								href="/login"
								className={buttonVariants({ size: "lg", variant: "outline" })}
							>
								Sign In
							</Link>
						)}
					</div>
				</div>
			</section>
			<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{features.map((feature, index) => (
					<Card key={index} className="hover:shadow-lg transition-shadow">
						<CardHeader>
							<div className="text-4xl mb-4">{feature.icon}</div>
							<CardTitle>{feature.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">{feature.description}</p>
						</CardContent>
					</Card>
				))}
			</section>
		</>
	);
}
