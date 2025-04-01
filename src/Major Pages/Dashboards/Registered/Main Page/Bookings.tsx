import BookingDetails from "../Elements/ForBookings/BookingDetails";
import { useState } from "react";
import { User, MapPin } from "lucide-react";

const Bookings: React.FC = () => {
	const [currentComponent, setCurrentComponent] = useState<"bookings" | "details">("bookings");
	const [activeStatus, setActiveStatus] = useState<"Pending" | "Upcoming" | "Past">("Pending");

	const handleSwitch = (component: "bookings" | "details") => {
		setCurrentComponent(component);
	};

	const handleStatusChange = (status: "Pending" | "Upcoming" | "Past") => {
		setActiveStatus(status);
	};
	
	// sample lang to see if the buttons work
	const bookingsData = {
		Pending: [
			{
				id: 1,
				date: "Mar 26",
				day: "Wednesday",
				title: "Super Duper Long Event Placeholder",
				startTime: "5:30 PM",
				endTime: "10:00 PM",
				customer: "Customer Name",
				location: "Location Name",
				guests: "1,234 Guests",
			}
		],
		Upcoming: [
			{
				id: 2,
				date: "Mar 28",
				day: "Friday",
				title: "Super Duper Long Event Placeholder",
				startTime: "5:30 PM",
				endTime: "10:00 PM",
				customer: "Customer Name",
				location: "Location Name",
				guests: "1,234 Guests",
			}
		],
		Past: [
			{
				id: 3,
				date: "Mar 30",
				day: "Sunday",
				title: "Super Duper Long Event Placeholder",
				startTime: "5:30 PM",
				endTime: "10:00 PM",
				customer: "Customer Name",
				location: "Location Name",
				guests: "1,234 Guests",
			}
		]
	};

	return (
		<div style={{ marginLeft: "16rem" }}>
			<div className="mb-4">
				<button
					onClick={() => handleSwitch("bookings")}
					className="bg-blue-500 text-white p-2 rounded mr-4"
				>
					Bookings
				</button>
				<button
					onClick={() => handleSwitch("details")}
					className="bg-blue-500 text-white p-2 rounded"
				>
					Details
				</button>
			</div>

			{currentComponent === "bookings" && (
				<div>
					<h3 className="text-4xl font-bold ml-6 mt-4 text-[#2D2C3C]">Bookings</h3>
					{/* Status buttons */}
					<div className="flex justify-end mb-6">
						<div className="inline-flex bg-gray-100 rounded-lg p-1">
							{["Pending", "Upcoming", "Past"].map((status) => (
								<button
									key={status}
									onClick={() => handleStatusChange(status as "Pending" | "Upcoming" | "Past")}
									className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
										activeStatus === status
											? "bg-white shadow-sm text-gray-800"
											: "text-gray-600 hover:text-gray-800"
									}`}
								>
									{status}
								</button>
							))}
						</div>
					</div>

					{/* Bookings List (sample only) */} 
					<div className="relative">
						{bookingsData[activeStatus].map((booking) => (
							<div key={booking.id} className="flex mb-12 relative">
								<div className="w-32 text-center mr-4">
									<div className="font-bold">{booking.date}</div>
									<div className="text-gray-500 text-sm">{booking.day}</div>
								</div>

								<div className="flex-1 border rounded-lg p-6 shadow-sm bg-white">
									<h3 className="text-xl font-semibold text-blue-600 mb-2">{booking.title}</h3>
									<p className="text-gray-600 mb-4">{booking.startTime} – {booking.endTime}</p>
									<div className="grid grid-cols-2 gap-4">
										<div className="flex items-center">
											<User className="text-gray-400 mr-2" size={18} />
											<span className="text-gray-600">{booking.customer}</span>
										</div>
										<div className="flex items-center">
											<MapPin className="text-gray-400 mr-2" size={18} />
											<span className="text-gray-600">{booking.location}</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{currentComponent === "details" && <BookingDetails />}
		</div>
	);
};

export default Bookings;