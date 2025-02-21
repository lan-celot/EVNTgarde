"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../Elements/ui/card";
import { CalendarDays, Star, Package, Users } from "lucide-react";

export default function DashboardPage() {
	const [stats] = useState([
		{
			title: "Total Bookings",
			value: "1,245",
			icon: CalendarDays,
			color: "bg-blue-500",
		},
		{
			title: "Total Reviews",
			value: "324",
			icon: Star,
			color: "bg-yellow-500",
		},
		{
			title: "Active Packages",
			value: "12",
			icon: Package,
			color: "bg-green-500",
		},
		{ title: "New Users", value: "58", icon: Users, color: "bg-purple-500" },
	]);

	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
					Dashboard
				</h1>
				<p className="mt-2 text-gray-600 dark:text-gray-400">
					Welcome to your dashboard! Here you can manage your bookings, reviews,
					and settings.
				</p>
			</div>

			{/* Statistics Cards */}
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{stats.map((stat, index) => (
					<Card
						key={index}
						className="group hover:shadow-lg transition-shadow duration-300"
					>
						<CardHeader className="flex items-center gap-4">
							<div className={`p-3 rounded-full ${stat.color} text-white`}>
								<stat.icon className="w-6 h-6" />
							</div>
							<CardTitle className="text-lg font-medium">
								{stat.title}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-bold text-gray-900 dark:text-white">
								{stat.value}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Recent Activities */}
			<div className="mt-8">
				<h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
					Recent Activities
				</h2>
				<ul className="mt-4 space-y-4">
					<li className="p-4 border rounded-lg dark:border-gray-700 dark:bg-gray-800">
						<p className="text-gray-700 dark:text-gray-300">
							📅 You have 5 upcoming bookings this week.
						</p>
					</li>
					<li className="p-4 border rounded-lg dark:border-gray-700 dark:bg-gray-800">
						<p className="text-gray-700 dark:text-gray-300">
							⭐ A user left a 5-star review on your service.
						</p>
					</li>
					<li className="p-4 border rounded-lg dark:border-gray-700 dark:bg-gray-800">
						<p className="text-gray-700 dark:text-gray-300">
							📦 New package added to your profile.
						</p>
					</li>
				</ul>
			</div>
		</div>
	);
}
1;
