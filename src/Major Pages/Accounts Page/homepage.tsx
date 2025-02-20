"use client";
import "../../Layout/globals.css";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image } from "lucide-react";
import { Sun, Moon, Search, Filter } from "lucide-react";

export default function HomePage() {
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", darkMode);
	}, [darkMode]);

	return (
		<>
			{/* Header */}
			<header className="fixed top-0 left-0 right-0 z-50 bg-sky-700 shadow-md">
				<div className="container mx-auto px-4 py-4 flex justify-between items-center">
					<a href="/" className="flex items-center space-x-2">
						<img
							src="../../src/assets/OrganizerLogo.png"
							alt="Logo"
							className="w-20 h-20 object-contain"
						/>
					</a>
					<nav className="hidden md:block">
						<ul className="flex space-x-8">
							{["Home", "About", "Contact"].map((item, index) => (
								<li key={index}>
									<a
										href={`/${item.toLowerCase()}`}
										className="text-white hover:text-gray-200"
									>
										{item}
									</a>
								</li>
							))}
						</ul>
					</nav>
					<div className="flex items-center gap-4">
						<button
							className="p-2 text-white hover:text-gray-200"
							onClick={() => setDarkMode(!darkMode)}
						>
							{darkMode ? (
								<Sun className="h-5 w-5" />
							) : (
								<Moon className="h-5 w-5" />
							)}
						</button>
						<a href="/login" className="text-white hover:text-gray-200">
							Log in
						</a>
						<a
							href="/register"
							className="px-4 py-2 text-sm font-medium text-white hover:text-gray-200"
						>
							Register
						</a>
					</div>
				</div>
			</header>

			<main className="px-6 pt-24">
				{/* Hero Section */}
				<div className="relative h-[calc(100vh-6rem)] w-full">
					<img
						src="../../src/assets/concert.jpg"
						alt="Concert background"
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-black opacity-50"></div>
					<div className="absolute inset-0 flex flex-col md:flex-row items-center container mx-auto px-4">
						<div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
							<img
								src="../../src/assets/OrganizerLogo.png"
								alt="Event Logo"
								className="w-64 max-h-250"
							/>
						</div>
						<div className="w-full md:w-1/2 text-center md:text-left">
							<h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
								Welcome to Your Event Management Hub
							</h1>
							<p className="text-xl md:text-2xl mb-8 text-white">
								Discover tailored events services and manage everything from one
								central dashboard.
							</p>
						</div>
					</div>
				</div>

				{/* Search & Filter */}
				<div className="bg-gray-100 dark:bg-gray-100 py-8">
					<div className="container mx-auto px-4 flex items-center justify-center gap-4">
						<div className="relative flex-grow">
							<input
								type="text"
								placeholder="Search events..."
								className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
							/>
							<Search
								className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
								size={20}
							/>
						</div>
						<button className="bg-white text-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 border hover:bg-gray-100">
							<Filter size={20} />
							<span>Filter</span>
						</button>
					</div>
				</div>

				{/* Content Sections */}
				<section className="container mx-auto py-12 px-4">
					{["Organizers", "Vendors"].map((section, index) => (
						<div key={index} className="mb-12">
							<h2 className="text-2xl font-semibold mb-6">List of {section}</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
								{Array.from({ length: 6 }).map((_, i) => (
									<div
										key={i}
										className="bg-white rounded-lg shadow-md overflow-hidden"
									>
										<img
											src="/placeholder.svg"
											alt={section}
											className="w-full h-48 object-cover"
										/>
										<div className="p-4">
											<h3 className="font-semibold mb-2">{section} Name</h3>
											<p className="text-sm text-gray-600">
												Short description of the {section.toLowerCase()}.
											</p>
										</div>
									</div>
								))}
							</div>
							<div className="mt-8 text-center">
								<a
									href={`/${section.toLowerCase()}`}
									className="inline-block bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
								>
									See More
								</a>
							</div>
						</div>
					))}
				</section>
			</main>

			<footer className="w-full bg-sky-700 text-white py-4 flex flex-col items-center px-6">
				{" "}
				{/* Removed max-w-6xl to allow full-width on smaller screens */}
				<div className="w-full flex justify-between flex-wrap">
					{" "}
					{/* Added flex-wrap */}
					<img
						src="../../src/assets/logo.png"
						alt="Logo"
						className="h-10 mr-auto ml-4 mb-4"
					/>{" "}
					{/* Ensure logo.png is in your public directory & added margin */}
					<div className="flex-1 flex justify-start space-x-8 flex-wrap">
						{" "}
						{/* Added flex-wrap */}
						{[
							{ title: "About Us", links: ["Our Story", "Team", "Careers"] },
							{ title: "Support", links: ["Help Center", "Contact Us", "FAQ"] },
							{ title: "Legal", links: ["Privacy Policy", "Terms of Service"] },
						].map((section, index) => (
							<div key={index} className="text-sm mb-4">
								{" "}
								{/* Added margin-bottom */}
								<h4 className="font-semibold mb-2">{section.title}</h4>
								<ul className="space-y-1">
									{section.links.map((link, i) => (
										<li key={i}>
											<a href="#" className="hover:underline">
												{link}
											</a>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
				{/* Footer Copyright Section */}
				<div className="mt-8 border-t border-blue-500 pt-4 text-center text-sm w-full">
					© {new Date().getFullYear()} Platform. All rights reserved.{" "}
					{/* Dynamic year */}
				</div>
			</footer>
		</>
	);
}
