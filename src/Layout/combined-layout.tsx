import { Button } from "../Major Pages/Dashboards/Registered/Elements/ui/combined-ui";
import { useLocation, Outlet } from "react-router-dom";
import { ThemeToggle } from "../functions/ThemeToogle";
import { Bell } from "lucide-react";
import { Sidebar } from "./sidebar";

interface CombinedLayoutProps {
	isLoggedIn?: boolean;
}

export default function CombinedLayout({
	isLoggedIn = localStorage.getItem("isAuthenticated") === "true",
}: CombinedLayoutProps) {
	const storedUserType = localStorage.getItem("userType");
	const userType =
		storedUserType === "individual" ? "customer" : storedUserType;

	const location = useLocation();
	const isHomePage =
		location.pathname === "/" ||
		location.pathname === "/customer" ||
		location.pathname === "/vendor" ||
		location.pathname === "/organizer";

	const showWelcomeBanner =
		isHomePage &&
		(userType === "customer" ||
			userType === "organizer" ||
			userType === "vendor");

	return (
		<div className="flex min-h-screen">
			{isLoggedIn && <Sidebar logout={() => console.log("User logged out")} />}
			<div className="flex flex-1 flex-col transition-all duration-300">
				<div className="HeaderContainer" style={{ marginLeft: "16rem" }}>
					<Header />
				</div>
				{showWelcomeBanner && <WelcomeBanner />}
				<div className="MainContainer">
					<div className="MainContent">
						<Outlet /> {/* Use Outlet instead of children prop */}
					</div>
				</div>
				{!isLoggedIn && (
					<div className="FooterContainer">
						<Footer />
					</div>
				)}
			</div>
		</div>
	);
}

function Header() {
	return (
		<header className="sticky top-0 z-50 w-full bg-[#2B579A] text-white dark:bg-[#1E3A6D]">
			<div className="container flex h-14 items-center">
				<div className="flex items-center"></div>
				<div className="flex items-center gap-2 ml-auto">
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-blue-600 dark:hover:bg-blue-800"
					>
						<Bell className="h-5 w-5" />
						<span className="sr-only">Toggle Notifications</span>
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-blue-600 dark:hover:bg-blue-800"
					>
						<ThemeToggle />
						<span className="sr-only">Toggle Theme</span>
					</Button>
				</div>
			</div>
		</header>
	);
}

function Footer() {
	return (
		<footer className="bg-[#2B579A] text-white dark:bg-[rgb(30,58,109)] py-8">
			<div className="container mx-auto px-4">
				<div className="text-center text-sm">
					© {new Date().getFullYear()} Platform. All rights reserved.
				</div>
			</div>
		</footer>
	);
}

function WelcomeBanner() {
	return (
		<section className="relative overflow-hidden bg-gray-900">
			<div className="absolute inset-0">
				<img
					src="/images/banner.jpg"
					alt="Event crowd"
					className="h-full w-full object-cover z-10"
				/>
				<div className="absolute inset-0 bg-black/60" />
			</div>
			<div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:py-24">
				<div className="flex flex-col sm:flex-row items-center justify-center">
					<div className="mb-8 sm:mb-0 sm:mr-8 flex-shrink-0">
						<img
							src="/src/assets/OrganizerLogo.png"
							alt="Logo"
							className="h-48 sm:h-64 lg:h-99 max-w-xs sm:max-w-sm object-contain"
						/>
					</div>
					<div className="text-center sm:text-left flex flex-col justify-center self-center">
						<h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
							Welcome to Your Event Management Hub
						</h1>
						<p className="mt-6 max-w-lg text-lg text-gray-300 sm:mx-auto md:mt-8 md:max-w-xl md:text-xl lg:mx-0">
							Discover tailored events services and manage everything from one
							central dashboard. Your next successful event starts here.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
