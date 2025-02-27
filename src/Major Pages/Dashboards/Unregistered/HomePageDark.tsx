"use client";
import { Search, Filter, Sun } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom"; // Correct import
import "../../../Layout/globals.css";


export default function HomePageDark() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleSunClick = () => {
        // Retain the current link (do nothing)
        if (location.pathname === "/home-dark") {
            navigate("/");
        }
    };

	return (
		<>
			{/* Header */}
			<header className="sticky top-0 z-50 w-full bg-[#1E3A6D] text-white">
				<div className="w-full px-8 flex h-14 items-center justify-between gap-6">
					<a href="/" className="flex items-center gap-2">
						<img
							src="../../src/assets/OrganizerLogo.png"
							alt="Logo"
							className=" h-8 w-auto object-contain"
						/>
					</a>
					<nav className="hidden md:block">
						<ul className="flex space-x-8">
							{["Home", "About", "Contact"].map((item, index) => (
								<li key={index}>
									<a
										href={`/${item.toLowerCase()}`}
										className="text-white hover:text-yellow-400"
									>
										{item}
									</a>
								</li>
							))}
						</ul>
					</nav>
					<div className="flex items-center gap-4">
                    <button onClick={handleSunClick} className="p-2 text-white hover:text-gray-200">
                        <Sun className="h-5 w-5" />
                        </button>
						<a href="/login" className="text-white hover:text-yellow-400">
							Log in
						</a>
						<a href="/role-selection" className="text-white hover:text-yellow-400">
							Register
						</a>
					</div>
				</div>
			</header>

			<main className="w-full bg-gray-900 text-white">
				{/* Welcome Banner Section */}
				<section className="relative overflow-hidden bg-gray-900">
					<div className="absolute inset-0">
						<img
							src="../../src/assets/banner.jpg"
							alt="Concert background"
							className="h-full w-full object-cover"
						/>
						<div className="absolute inset-0 bg-black/60"></div>
					</div>
					<div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:py-24">
						<div className="flex flex-col sm:flex-row items-center justify-center">
							<div className="mb-8 sm:mb-0 sm:mr-8 flex-shrink-0">
								<img
									src="../../src/assets/OrganizerLogo.png"
									alt="Event Logo"
									className="h-65 sm:h-64 lg:h-[250px]  w-auto object-contain"
								/>
							</div>
							<div className="text-center sm:text-left flex flex-col justify-center self-center">
								<h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
									Welcome to Your Event Management Hub
								</h1>
								<p className="mt-6 max-w-lg text-lg text-gray-300 sm:mx-auto md:mt-8 md:max-w-xl md:text-xl lg:mx-0">
									Discover tailored events services and manage everything from
									one central dashboard.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Search & Filter */}
				<div className="bg-[#1A1A1A] py-8">
					<div className="container mx-auto px-4 flex items-center justify-center gap-4">
						<div className="w-full flex justify-center px-4 gap-4 relative">
							{/* Search Bar */}
							<div className="relative w-[400px] md:w-[500px] lg:w-[600px]">
								<Search
									className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
									size={20}
								/>
								<input
									type="text"
									placeholder="Search events..."
									className="w-full pl-10 pr-4 py-2 rounded-lg border bg-[#2C2C2C] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							{/* Filter Button */}
							<button className="bg-[#2C2C2C] text-white px-4 py-2 rounded-lg flex items-center gap-2 border border-gray-600 hover:bg-gray-700">
								<Filter size={20} />
								<span>Filter</span>
							</button>
						</div>
					</div>
				</div>

				{/* Organizer & Vendor */}
				<section className="w-screen max-w-7xl mx-auto py-12 px-4">
					{["Organizers", "Vendors"].map((section, index) => (
						<div key={index} className="mb-12">
							<h2 className="text-2xl font-semibold mb-6 text-gray-200">List of {section}</h2>
							<div className="grid grid-cols-1 sm:grid-cols-8 lg:grid-cols-3 gap-8">
								{Array.from({ length: 6 }).map((_, i) => {
									const specialties =
										section === "Organizers"
											? ["Wedding", "Birthday", "Fellowship", "Baptism", "Community Development", "Fun Run"]
											: ["Florist", "Caterer", "Photographer", "Decorators", "Tech Provider", "Transportation Rentals"];
									const title = specialties[i];
									const price = section === "Organizers" ? "PHP 1000" : "PHP 500-2000";

									return (
										<div key={i} className="bg-[#1E1E1E] rounded-lg shadow-md overflow-hidden">
											<div className="relative">
												<img
													src="../../src/assets/vendor.jpg"
													alt={section}
													className="w-full h-50 object-cover opacity-80"
												/>
											</div>
											<div className="p-4">
												<h3 className="font-semibold mb-2 text-gray-300">{title}</h3>
												<p className="text-sm text-gray-400">Location</p>
												<p className="text-sm text-gray-400">Full-day Service</p>
												<div className="flex items-center mt-2">
													<span className="text-sm text-gray-300">{price}</span>
													<svg className="w-4 h-4 ml-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
														<path d="M10 15l-5.878 3.09 1.123-6.545L.583 5.948 6.136 5.411 10 1l3.864 4.411 5.553.537-4.762 4.497 1.123 6.545L10 15z" />
													</svg>
													<span className="text-sm text-gray-400 ml-1">10 ratings</span>
												</div>
											</div>
										</div>
									);
								})}
							</div>
							<div className="mt-8 text-center">
								<a
									href={`/${section.toLowerCase()}`}
									className="inline-block bg-gray-800 text-gray-300 px-6 py-2 rounded-lg hover:bg-gray-700 transition"
								>
									See More
								</a>
							</div>
						</div>
					))}
				</section>

				{/* Footer */}
				<footer className="bg-[#1E3A6D] text-white py-4 flex flex-col items-center px-6">
					<div className="w-full flex flex-wrap justify-evenly text-left">
						<div className="flex flex-col items-start ml-4 mb-4">
							<img
								src="../../src/assets/Organizerlogo.png"
								alt="Logo"
								className="h-20 w-auto"
							/>
							<span className="text-sm font-bold mt-4 tracking-wide text-gray-200">
								Your next successful event starts here
							</span>
						</div>
                        <div className="flex-1 flex justify-start space-x-8 flex-wrap">
							{/* Company Info */}
							<div className="min-w-[150px]">
								<div className="md:col-span-1">
									<h4 className="font-semibold mb-2 text-sm">Company Info</h4>
									<ul className="space-y-1">
										<li>
											<a href="#" className="hover:underline text-xs">
												About Us
											</a>
										</li>
										<li>
											<a href="#" className="hover:underline text-xs">
												Contact Us
											</a>
										</li>
									</ul>
								</div>
							</div>

							{/* Categories */}
							<div className="min-w-[150px]">
								<div className="md:col-span-1">
									<h4 className="font-semibold mb-2 text-sm">Categories</h4>
									<ul className="space-y-1">
										<li>
											<a href="#" className="hover:underline text-xs">
												Concerts & Gigs
											</a>
										</li>
										<li>
											<a href="#" className="hover:underline text-xs">
												Festivals & Lifestyle
											</a>
										</li>
										<li>
											<a href="#" className="hover:underline text-xs">
												Business & Networking
											</a>
										</li>
										<li>
											<a href="#" className="hover:underline text-xs">
												Food & Drinks
											</a>
										</li>
										<li>
											<a href="#" className="hover:underline text-xs">
												Performing Arts
											</a>
										</li>
										<li>
											<a href="#" className="hover:underline text-xs">
												Workshops, Conferences & Classes
											</a>
										</li>
									</ul>
								</div>
							</div>

							{/* Follow Us */}
							<div className="md:col-span-1">
								<h4 className="font-semibold mb-2 text-sm">Follow Us</h4>
								<ul className="space-y-1">
									<li>
										<a href="#" className="hover:underline text-xs">
											Facebook
										</a>
									</li>
									<li>
										<a href="#" className="hover:underline text-xs">
											Instagram
										</a>
									</li>
									<li>
										<a href="#" className="hover:underline text-xs">
											Twitter
										</a>
									</li>
									<li>
										<a href="#" className="hover:underline text-xs">
											YouTube
										</a>
									</li>
								</ul>
							</div>

							{/* Help */}
							<div className="md:col-span-1">
								<h4 className="font-semibold mb-2 text-sm">Help</h4>
								<ul className="space-y-1">
									<li>
										<a href="#" className="hover:underline text-xs">
											Account Support
										</a>
									</li>
									<li>
										<a href="#" className="hover:underline text-xs">
											Listing Events
										</a>
									</li>
									<li>
										<a href="#" className="hover:underline text-xs">
											Event Ticketing
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Footer Copyright Section */}
					<div className="mt-8 border-t border-blue-500 pt-4 text-center text-sm w-full">
						© {new Date().getFullYear()} Platform. All rights reserved.
					</div>
				</footer>
			</main>
		</>
	);
}
