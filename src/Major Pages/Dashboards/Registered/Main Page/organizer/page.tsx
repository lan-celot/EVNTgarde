import { useState } from "react";
import { Button, Input } from "../../Elements/ui/combined-ui";
import { VendorCard } from "../../Elements/vendor-card";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { searchAndFilterItems } from "../../../../../functions/search";

// Update the OrganizerPage component to accept and pass the logout prop
interface OrganizerPageProps {
	logout: () => void;
}

export default function Home({}: OrganizerPageProps) {
	// State for showing more vendors and events
	const [visibleVendors, setVisibleVendors] = useState(3);
	const [visibleEvents, setVisibleEvents] = useState(3);

	// Add state for search and filters
	const [vendorSearchQuery, setVendorSearchQuery] = useState("");
	const [eventSearchQuery, setEventSearchQuery] = useState("");
	const [showFilters, setShowFilters] = useState(false);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	// Function to load more vendors
	const handleLoadMoreVendors = () => {
		setVisibleVendors((prev) => prev + 3); // Show 3 more vendors
	};

	// Function to load more past events
	const handleLoadMoreEvents = () => {
		setVisibleEvents((prev) => prev + 3); // Show 3 more past events
	};

	// Toggle a category selection
	const toggleCategory = (category: string) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category]
		);
	};

	// Clear all filters
	const clearFilters = () => {
		setSelectedCategories([]);
		setVendorSearchQuery("");
		setEventSearchQuery("");
	};

	// Get all unique locations for the filter menu
	const vendorLocations = [
		...new Set(vendors.map((vendor) => vendor.location)),
	];

	const filteredVendors = searchAndFilterItems(
		vendors,
		vendorSearchQuery,
		selectedCategories.length > 0 ? selectedCategories : undefined
	);

	const filteredEvents = searchAndFilterItems(
		pastEvents,
		eventSearchQuery,
		selectedCategories.length > 0 ? selectedCategories : undefined
	);

	return (
		<div className="flex min-h-screen">
			{/* Dynamic margin based on sidebar state */}
			<div
				className="flex flex-1 flex-col transition-all duration-300"
				style={{ marginLeft: "16rem" }}
			>
				<div className="container px-4 py-8 sm:px-6 lg:px-8">
					{/* Find Vendors Section */}
					<div className="mb-12">
						<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
							<h2 className="text-2xl font-semibold">Find Vendors</h2>
							<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
								<div className="relative flex-grow sm:max-w-xs">
									<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
									<Input
										placeholder="Search for Vendors..."
										className="pl-10 placeholder-gray-700 dark:placeholder-gray-400"
										value={vendorSearchQuery}
										onChange={(e) => setVendorSearchQuery(e.target.value)}
									/>
									{vendorSearchQuery && (
										<button
											onClick={() => setVendorSearchQuery("")}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
										>
											<X className="h-4 w-4" />
										</button>
									)}
								</div>
								<Button
									variant="outline"
									className="w-full sm:w-auto"
									onClick={() => setShowFilters(!showFilters)}
								>
									<SlidersHorizontal className="mr-2 h-4 w-4" />
									Filters
								</Button>
							</div>
						</div>

						{/* Filter dropdown */}
						{showFilters && (
							<div className="mb-6 rounded-lg border bg-card p-4 shadow-sm">
								<h3 className="mb-3 font-medium">Filter by Location</h3>
								<div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
									{vendorLocations.map((location) => (
										<div key={location} className="flex items-center space-x-2">
											<input
												type="checkbox"
												id={`location-${location}`}
												checked={selectedCategories.includes(location)}
												onChange={() => toggleCategory(location)}
												className="h-4 w-4 rounded border-gray-300"
											/>
											<label
												htmlFor={`location-${location}`}
												className="text-sm"
											>
												{location}
											</label>
										</div>
									))}
								</div>
								<div className="mt-4 flex justify-end">
									<Button variant="outline" size="sm" onClick={clearFilters}>
										Clear Filters
									</Button>
								</div>
							</div>
						)}

						{filteredVendors.length === 0 ? (
							<div className="my-12 text-center">
								<p className="text-muted-foreground">
									No vendors found matching your search criteria.
								</p>
								<Button variant="link" onClick={clearFilters} className="mt-2">
									Clear filters
								</Button>
							</div>
						) : (
							<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
								{filteredVendors.slice(0, visibleVendors).map((vendor) => (
									<VendorCard
										key={vendor.id}
										{...vendor}
										showHireButton={true}
									/>
								))}
							</div>
						)}

						{visibleVendors < filteredVendors.length && (
							<div className="mt-8 text-center">
								<Button
									variant="outline"
									size="lg"
									className="w-full sm:w-auto"
									onClick={handleLoadMoreVendors}
								>
									See More
								</Button>
							</div>
						)}
					</div>

					{/* Past Events Section */}
					<div className="mt-12">
						<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
							<h2 className="text-2xl font-semibold">Past Events</h2>
							<div className="relative flex-grow sm:max-w-xs">
								<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									placeholder="Search past events..."
									className="pl-10 placeholder-gray-700 dark:placeholder-gray-400"
									value={eventSearchQuery}
									onChange={(e) => setEventSearchQuery(e.target.value)}
								/>
								{eventSearchQuery && (
									<button
										onClick={() => setEventSearchQuery("")}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
									>
										<X className="h-4 w-4" />
									</button>
								)}
							</div>
						</div>

						{filteredEvents.length === 0 ? (
							<div className="my-12 text-center">
								<p className="text-muted-foreground">
									No events found matching your search criteria.
								</p>
								<Button
									variant="link"
									onClick={() => setEventSearchQuery("")}
									className="mt-2"
								>
									Clear search
								</Button>
							</div>
						) : (
							<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
								{filteredEvents.slice(0, visibleEvents).map((event) => (
									<VendorCard
										key={event.id}
										{...event}
										showHireButton={false}
									/>
								))}
							</div>
						)}

						{visibleEvents < filteredEvents.length && (
							<div className="mt-8 text-center">
								<Button
									variant="outline"
									size="lg"
									className="w-full sm:w-auto"
									onClick={handleLoadMoreEvents}
								>
									See More
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

// Vendor Data
// Added specialty field for filtering in every vendor data
const vendors = [
	{
		id: 1,
		name: "Vendor 1",
		location: "Manila",
		price: 1000,
		ratings: 10,
		timeSlot: "08:00 AM - 06:00 PM",
		image: "/images/vendor.jpg",
		isFavorite: false,
		specialty: "Manila",
	},
	{
		id: 2,
		name: "Vendor 2",
		location: "Quezon City",
		price: 1200,
		ratings: 15,
		timeSlot: "09:00 AM - 05:00 PM",
		image: "/images/vendor.jpg",
		isFavorite: false,
		specialty: "Quezon City",
	},
	{
		id: 3,
		name: "Vendor 3",
		location: "Makati",
		price: 800,
		ratings: 8,
		timeSlot: "10:00 AM - 04:00 PM",
		image: "/images/vendor.jpg",
		isFavorite: false,
		specialty: "Makati",
	},
	{
		id: 4,
		name: "Vendor 4",
		location: "Taguig",
		price: 1500,
		ratings: 20,
		timeSlot: "07:00 AM - 09:00 PM",
		image: "/images/vendor.jpg",
		isFavorite: false,
		specialty: "Taguig",
	},
	{
		id: 5,
		name: "Vendor 5",
		location: "Pasig",
		price: 950,
		ratings: 12,
		timeSlot: "08:30 AM - 07:00 PM",
		image: "/images/vendor.jpg",
		isFavorite: false,
		specialty: "Pasig",
	},
	{
		id: 6,
		name: "Vendor 6",
		location: "Cebu",
		price: 2000,
		ratings: 25,
		timeSlot: "06:00 PM - 02:00 AM",
		image: "/images/vendor.jpg",
		isFavorite: false,
		specialty: "Cebu",
	},
];

// Past Events Data
const pastEvents = [
	{
		id: 1,
		name: "Smith-Johnson Wedding",
		location: "Grand Plaza Hotel",
		timeSlot: "00:00 AM - 00:00 PM",
		price: 5000,
		ratings: 150,
		image: "/images/event.jpg",
		isFavorite: false,
		specialty: "Wedding",
	},
	{
		id: 2,
		name: "Innovators Conference 2024",
		location: "Innovation Center",
		timeSlot: "00:00 AM - 00:00 PM",
		price: 4500,
		ratings: 120,
		image: "/images/event.jpg",
		isFavorite: false,
		specialty: "Conference",
	},
	{
		id: 3,
		name: "Tech Expo 2024",
		location: "City Convention Center",
		timeSlot: "00:00 AM - 00:00 PM",
		price: 6000,
		ratings: 180,
		image: "/images/event.jpg",
		isFavorite: false,
		specialty: "Expo",
	},
	{
		id: 4,
		name: "Music Festival 2024",
		location: "Beach Resort",
		timeSlot: "00:00 AM - 00:00 PM",
		price: 7000,
		ratings: 200,
		image: "/images/event.jpg",
		isFavorite: false,
		specialty: "Festival",
	},
	{
		id: 5,
		name: "Fashion Week 2024",
		location: "Downtown Arena",
		timeSlot: "00:00 AM - 00:00 PM",
		price: 5500,
		ratings: 170,
		image: "/images/event.jpg",
		isFavorite: false,
		specialty: "Fashion",
	},
	{
		id: 6,
		name: "Charity Gala 2024",
		location: "Luxury Ballroom",
		timeSlot: "00:00 AM - 00:00 PM",
		price: 6500,
		ratings: 190,
		image: "/images/event.jpg",
		isFavorite: false,
		specialty: "Charity",
	},
];
