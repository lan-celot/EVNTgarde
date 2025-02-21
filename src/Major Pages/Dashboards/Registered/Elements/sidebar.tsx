"use client";

import type React from "react";

import { cn } from "../Miscs/utils";
import {
	LayoutDashboard,
	CalendarDays,
	Star,
	Package,
	Settings,
	HelpCircle,
	LogOut,
	Menu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../Elements/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../Elements/ui/tooltip";
import { useState } from "react";

const sidebarItems = [
	{
		title: "Dashboard",
		icon: LayoutDashboard,
		href: "/dashboard",
	},
	{
		title: "Bookings",
		icon: CalendarDays,
		href: "/bookings",
	},
	{
		title: "Reviews",
		icon: Star,
		href: "/reviews",
	},

	{
		title: "Packages",
		icon: Package,
		href: "/packages",
	},
	{
		title: "Settings",
		icon: Settings,
		href: "/settings",
	},
	{
		title: "Help Center",
		icon: HelpCircle,
		href: "/help",
	},
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

export function Sidebar({ className }: SidebarProps) {
	const pathname = usePathname();
	const [isCollapsed, setIsCollapsed] = useState(true);

	return (
		<TooltipProvider delayDuration={0}>
			<div
				className={cn(
					"flex h-screen flex-col bg-[#2B579A] transition-all duration-300 dark:bg-[#1E3A6D]",
					isCollapsed ? "w-16" : "w-64",
					className
				)}
			>
				<div className="p-3">
					<Button
						variant="ghost"
						size="icon"
						className="mb-2 h-10 w-10 text-white hover:bg-white/10"
						onClick={() => setIsCollapsed(!isCollapsed)}
					>
						<Menu className="h-5 w-5" />
					</Button>
				</div>
				<div className="flex flex-1 flex-col items-start gap-4 p-3">
					{sidebarItems.map((item) => (
						<Tooltip key={item.href}>
							<TooltipTrigger asChild>
								<Link
									href={item.href}
									className={cn(
										"flex h-10 items-center gap-3 rounded-lg px-3 text-white transition-colors hover:bg-white/10",
										pathname === item.href && "bg-white/10",
										isCollapsed ? "w-10 justify-center" : "w-full"
									)}
								>
									<item.icon className="h-5 w-5 shrink-0" />
									{!isCollapsed && <span>{item.title}</span>}
								</Link>
							</TooltipTrigger>
							{isCollapsed && (
								<TooltipContent
									side="right"
									className="border-0 bg-gray-900 text-white"
								>
									{item.title}
								</TooltipContent>
							)}
						</Tooltip>
					))}
				</div>

				<div className="p-3">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								className={cn(
									"flex h-10 items-center gap-3 text-white hover:bg-white/10",
									isCollapsed ? "w-10 justify-center" : "w-full"
								)}
							>
								<LogOut className="h-5 w-5 shrink-0" />
								{!isCollapsed && <span>Log out</span>}
							</Button>
						</TooltipTrigger>
						{isCollapsed && (
							<TooltipContent
								side="right"
								className="border-0 bg-gray-900 text-white"
							>
								Log out
							</TooltipContent>
						)}
					</Tooltip>
				</div>
			</div>
		</TooltipProvider>
	);
}
