import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { VendorCard } from "../Elements/Cards/vendor-card";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button, Input } from "../../../../Layout/combined-ui";
import { mockOrganizers } from "../../../../functions/mockData";
import { Loc } from "../../../../functions/accsEventsCollections";

// Update the component to accept and use the logout prop
const Dashboard: React.FC = () => {
	const navigate = useNavigate(); // Initialize navigate
	const [visibleOrganizers, setVisibleOrganizers] = useState(3);
	const [visibleBookings, setVisibleBookings] = useState(3);
	const [visiblePackages, setVisiblePackages] = useState(3);
	const organizers = mockOrganizers;
	const formatLocation = (location: Loc): string => {
		if (!location) return "Unknown Location"; // Handle undefined
		return `${location.address}, ${location.city}, ${location.state} ${location.zipCode}`;
	};

	//For Organizer Filtering
	const [sortCriteria, setSortCriteria] = useState("price"); // Default sorting by price
	const [sortOrder, setSortOrder] = useState("asc");

	//For Filter Selection
	const sortedOrganizers = [...mockOrganizers].sort((a, b) => {
		let valueA, valueB;

		switch (sortCriteria) {
			case "price":
				valueA = a.price;
				valueB = b.price;
				break;
			case "rating":
				valueA = a.rating;
				valueB = b.rating;
				break;
			case "timeSlot":
				valueA = a.timeSlot.length;
				valueB = b.timeSlot.length;
				break;
			case "location":
				valueA = a.address.city.toLowerCase();
				valueB = b.address.city.toLowerCase();
				return sortOrder === "asc"
					? valueA.localeCompare(valueB)
					: valueB.localeCompare(valueA);
			default:
				return 0;
		}

		return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
	});

	//For event searching
	const [searchQuery, setSearchQuery] = useState("");
	const filterBySearch = (booking: { name: string }) => {
		return booking.name.toLowerCase().includes(searchQuery.toLowerCase());
	};
	const [selectedTime, setSelectedTime] = useState("");
	const timeOptions = Array.from({ length: 24 }, (_, i) => {
		const hour = i % 12 || 12; // Convert 0 to 12 for AM/PM format
		const period = i < 12 ? "AM" : "PM";
		return `${hour}:00 ${period}`;
	});
	const filterByTimeSlot = (booking: any) => {
		if (!selectedTime) return true; // Show all if no filter applied

		const [eventStart, eventEnd] = booking.timeSlot
			.split(" - ")
			.map((time: any) => new Date(`2000-01-01 ${time}`).getTime());

		const selectedTimeValue = new Date(`2000-01-01 ${selectedTime}`).getTime();

		return selectedTimeValue >= eventStart && selectedTimeValue <= eventEnd;
	};

	//For searhced events
	const filteredBookings = bookings // First, get only the visible bookings
		.filter(filterByTimeSlot) // Then, filter by time slot
		.filter(filterBySearch); // Finally, filter by search input

	//For package customization
	const [showModal, setShowModal] = useState(false);
	const [customPackage, setCustomPackage] = useState({
		name: "",
		category: "",
		location: "",
		timeSlot: "Full-Day Service",
		price: "",
		ratings: "",
	});

	// Store favorite vendors in state
	const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

	// Toggle favorite state for vendors
	const handleToggleFavorite = (id: number, type: string) => {
		setFavorites((prev) => ({
			...prev,
			[`${type}-${id}`]: !prev[`${type}-${id}`], // Unique key per type
		}));
	};

	const handleSeeMore = (section: string) => {
		if (section === "organizers") setVisibleOrganizers((prev) => prev + 3);
		if (section === "bookings") setVisibleBookings((prev) => prev + 3);
		if (section === "packages") setVisiblePackages((prev) => prev + 3);
	};

	return (
		<div className="flex min-h-screen">
			<div
				className="flex flex-1 flex-col transition-all duration-300"
				style={{ marginLeft: "16rem" }}
			>
				<div className="container px-4 py-8 sm:px-6 lg:px-8">
					{/* Organizers Section */}
					<div className="mb-12">
						<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
							<h2 className="text-2xl font-semibold">Find Organizers</h2>

							<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
								{/* Search Bar */}
								<div className="relative flex-grow sm:max-w-xs">
									<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
									<Input
										placeholder="Search for Organizers..."
										className=" placeholder-gray-700 dark:placeholder-gray-400" // hehe para kita sa light mode
									/>
								</div>

								{/* Sorting Dropdown */}
								<select
									value={sortCriteria}
									onChange={(e) => setSortCriteria(e.target.value)}
									className="border p-2 rounded"
								>
									<option value="price">Price</option>
									<option value="rating">Rating</option>
									<option value="timeSlot">Available Time Slots</option>
									<option value="location">Location</option>
								</select>

								{/* Toggle Ascending/Descending */}
								<Button
									variant="outline"
									onClick={() =>
										setSortOrder(sortOrder === "asc" ? "desc" : "asc")
									}
									className="w-full sm:w-auto"
								>
									<SlidersHorizontal className="mr-2 h-4 w-4" />
									{sortOrder === "asc" ? "Ascending" : "Descending"}
								</Button>
							</div>
						</div>

						{/* Sorted Vendor List */}
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{sortedOrganizers.slice(0, visibleOrganizers).map((organizer) => (
								<VendorCard
									key={`organizer-${organizer.organizerId}`}
									id={organizer.organizerId}
									name={organizer.organizationName}
									location={formatLocation(organizer.address)}
									price={organizer.price}
									ratings={organizer.rating || 0}
									image={organizer.image || "/images/vendor.jpg"}
									timeSlot={
										organizer.timeSlot.length
											? organizer.timeSlot.join(", ")
											: "No time slots available"
									}
									isFavorite={!!favorites[`organizer-${organizer.organizerId}`]}
									onToggleFavorite={() =>
										handleToggleFavorite(organizer.organizerId, "organizer")
									}
									showHireButton={false}
								/>
							))}
						</div>

						{visibleOrganizers < organizers.length && (
							<div className="mt-8 text-center">
								<Button
									variant="outline"
									size="lg"
									onClick={() => handleSeeMore("organizers")}
								>
									See More
								</Button>
							</div>
						)}
					</div>

					{/* Bookings Section */}
					<div className="mb-12">
						<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
							<h2 className="text-2xl font-semibold">Book an Event</h2>

							<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
								{/* Search Bar */}
								<div className="relative flex-grow sm:max-w-xs">
									<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
									<Input
										placeholder="Search for Events..."
										className=" placeholder-gray-700 dark:placeholder-gray-400" // hehe para kita sa light mode
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
									/>
								</div>

								{/* Time Slot Filter Dropdown */}
								<select
									value={selectedTime}
									onChange={(e) => setSelectedTime(e.target.value)}
									className="border p-2 rounded"
								>
									<option value="">All Time Slots</option>
									{timeOptions.map((time) => (
										<option key={time} value={time}>
											{time}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{filteredBookings.slice(0, visibleBookings).map((booking) => (
								<VendorCard
									key={`booking-${booking.id}`}
									{...booking}
									isFavorite={!!favorites[`booking-${booking.id}`]}
									onToggleFavorite={() =>
										handleToggleFavorite(booking.id, "booking")
									}
									showHireButton={false}
								/>
							))}
						</div>

						{visibleBookings < filteredBookings.length && (
							<div className="mt-8 text-center">
								<Button
									variant="outline"
									size="lg"
									onClick={() => handleSeeMore("bookings")}
								>
									See More
								</Button>
							</div>
						)}
					</div>

					{/* Organizer Packages Section */}
					<div className="mt-12">
						<div className="mb-6 text-2xl flex items-center gap-2">
							<h2 className="text-2xl font-semibold leading-none">
								Organizer Packages
							</h2>
							<p className="text-sm text-gray-500 leading-none">
								Didn't see what you're looking for?{" "}
								<span
									className="text-blue-500 cursor-pointer hover:underline"
									onClick={() => setShowModal(true)}
								>
									Customize your own package!
								</span>
							</p>
						</div>

						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{packages.slice(0, visiblePackages).map((pkg) => (
								<VendorCard
									key={`package-${pkg.id}`}
									{...pkg}
									isFavorite={!!favorites[`package-${pkg.id}`]}
									onToggleFavorite={() =>
										handleToggleFavorite(pkg.id, "package")
									}
									showHireButton={false}
									onClick={(id) => navigate(`/organizers/${id}`)} // Use navigate here
								/>
							))}
						</div>

						{visiblePackages < packages.length && (
							<div className="mt-8 text-center">
								<Button
									variant="outline"
									size="lg"
									onClick={() => handleSeeMore("packages")}
								>
									See More
								</Button>
							</div>
						)}
					</div>
					{showModal && (
						<div
							className="fixed inset-0 bg-gray-75 bg-opacity-30 flex items-center justify-center z-50"
							onClick={() => setShowModal(false)} // Closes modal on background click
						>
							<div
								className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-auto"
								onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
							>
								<h3 className="text-lg font-semibold mb-4">
									Customize Your Package
								</h3>

								<input
									type="text"
									placeholder="Package Name"
									className="w-full border p-2 rounded mb-2"
									value={customPackage.name}
									onChange={(e) =>
										setCustomPackage({
											...customPackage,
											name: e.target.value,
										})
									}
								/>

								<select
									className="w-full border p-2 rounded mb-2"
									value={customPackage.category}
									onChange={(e) =>
										setCustomPackage({
											...customPackage,
											category: e.target.value,
										})
									}
								>
									<option value="">Select Category</option>
									<option value="Wedding Package">Wedding Package</option>
									<option value="Corporate Event">Corporate Event</option>
									<option value="Birthday Package">Birthday Package</option>
								</select>

								<input
									type="text"
									placeholder="Location"
									className="w-full border p-2 rounded mb-2"
									value={customPackage.location}
									onChange={(e) =>
										setCustomPackage({
											...customPackage,
											location: e.target.value,
										})
									}
								/>

								<select
									className="w-full border p-2 rounded mb-2"
									value={customPackage.timeSlot}
									onChange={(e) =>
										setCustomPackage({
											...customPackage,
											timeSlot: e.target.value,
										})
									}
								>
									<option value="Full-Day Service">Full-Day Service</option>
									<option value="Half-Day Service">Half-Day Service</option>
								</select>

								<input
									type="number"
									placeholder="Price"
									className="w-full border p-2 rounded mb-2"
									value={customPackage.price}
									onChange={(e) =>
										setCustomPackage({
											...customPackage,
											price: e.target.value,
										})
									}
								/>

								<input
									type="number"
									placeholder="Ratings"
									className="w-full border p-2 rounded mb-4"
									value={customPackage.ratings}
									onChange={(e) =>
										setCustomPackage({
											...customPackage,
											ratings: e.target.value,
										})
									}
								/>

								<div className="flex justify-end gap-2">
									<button
										className="px-4 py-2 border rounded"
										onClick={() => setShowModal(false)}
									>
										Cancel
									</button>
									<button
										className="px-4 py-2 bg-blue-500 text-white rounded"
										onClick={() => {
											console.log("Customized Package:", customPackage);
											setShowModal(false);
										}}
									>
										Save
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

// Updated Sample Data (More Entries Added)

const bookings = [
	{
		id: 1,
		name: "Corporate Gala Night",
		category: "Corporate Event",
		location: "Makati Ballroom",
		timeSlot: "07:00 PM - 11:00 PM",
		price: 15000,
		ratings: 30,
		image: "/images/vendor.jpg",
		isFavorite: false,
	},
	{
		id: 2,
		name: "Beach Wedding",
		category: "Wedding",
		location: "Boracay Beachfront",
		timeSlot: "04:00 PM - 10:00 PM",
		price: 20000,
		ratings: 40,
		image: "/images/vendor.jpg",
		isFavorite: false,
	},
	{
		id: 3,
		name: "Birthday Party",
		category: "Birthday",
		location: "Quezon City",
		timeSlot: "02:00 PM - 06:00 PM",
		price: 8000,
		ratings: 15,
		image: "/images/vendor.jpg",
		isFavorite: false,
	},
	{
		id: 4,
		name: "Music Festival",
		category: "Concert",
		location: "Clark Field",
		timeSlot: "06:00 PM - 02:00 AM",
		price: 30000,
		ratings: 60,
		image: "/images/vendor.jpg",
		isFavorite: false,
	},
	{
		id: 5,
		name: "Christmas Party",
		category: "Holiday Party",
		location: "Makati",
		timeSlot: "06:00 PM - 10:00 PM",
		price: 10000,
		ratings: 20,
		image: "/images/vendor.jpg",
		isFavorite: false,
	},
	{
		id: 6,
		name: "Product Launch",
		category: "Corporate Event",
		location: "BGC",
		timeSlot: "10:00 AM - 04:00 PM",
		price: 12000,
		ratings: 25,
		image: "/images/vendor.jpg",
		isFavorite: false,
	},
];

const packages = [
	{
		id: 11,
		name: "Silver Wedding Package",
		category: "Wedding Package",
		location: "Tagaytay",
		timeSlot: "Full-Day Service",
		price: 50000,
		ratings: 15,
		image: "/images/vendor.jpg",
		isFavorite: false,
	},
	{
		id: 21,
		name: "Corporate VIP Package",
		category: "Corporate Event",
		location: "BGC",
		timeSlot: "Full-Day Service",
		price: 80000,
		ratings: 20,
		image: "/images/vendor.jpg",
		isFavorite: false,
	},
	{
		id: 31,
		name: "Birthday Bash Package",
		category: "Birthday Package",
		location: "Quezon City",
		timeSlot: "Half-Day Service",
		price: 20000,
		ratings: 10,
		image: "/images/vendor.jpg",
		isFavorite: false,
	},
	{
		id: 41,
		name: "Platinum Wedding Package",
		category: "Wedding Package",
		location: "Palawan",
		timeSlot: "Full-Day Service",
		price: 100000,
		ratings: 35,
		image: "/images/vendor.jpg",
		isFavorite: false,
	},
	{
		id: 51,
		name: "Corporate Team Building Package",
		category: "Corporate Event",
		location: "Batangas",
		timeSlot: "Full-Day Service",
		price: 60000,
		ratings: 25,
		image: "/images/vendor.jpg",
		isFavorite: false,
	},
	{
		id: 61,
		name: "Birthday Party Package",
		category: "Birthday Package",
		location: "Makati",
		timeSlot: "Half-Day Service",
		price: 15000,
		ratings: 12,
		image: "/images/vendor.jpg",
		isFavorite: false,
	},
];

export default Dashboard;
