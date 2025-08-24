import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggleButton from "../ui/theme-toggle-button";

export function SiteHeader() {
	return (
		<header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="mx-2 data-[orientation=vertical]:h-4"
				/>
				<h1 className="text-base font-medium">YASH LMS.</h1>
				<div className="ml-auto flex items-center gap-2">
					<ThemeToggleButton
						variant="gif"
						url="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZW5kenVvcnloNDltbDM4ejYzbDRodHB1Y3I0N3NhenNyczlqNmdpayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/vPJTbOfDncJjCQ4yx8/giphy.gif"
					/>
				</div>
			</div>
		</header>
	);
}
