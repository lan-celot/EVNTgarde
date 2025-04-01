import { Link } from "react-router-dom";

const BookingDetails: React.FC = () => {
	return (
		<div className="flex flex-col w-full mx-auto">
			{/* Back Button */}
			<div className="mb-5">
				<button className="flex items-center bg-transparent border-none cursor-pointer">
					<Link to="/bookings"></Link>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						className="bi bi-arrow-left w-4 h-4"
						viewBox="0 0 16 16"
					>
						<path
							fillRule="evenodd"
							d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
						/>
					</svg>
					<span className="ml-2">Back</span>
				</button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
				{/* Left Column */}
				<div className="flex flex-col gap-5">
					{/* Event Name and Description Box */}
					<div className="border border-gray-300 rounded-md p-4">
						{/* Placeholder for Event Name */}
						<div className="mb-2 h-10 bg-gray-100 rounded"></div>
						{/* Placeholder for Description */}
						<div className="h-16 bg-gray-100 rounded"></div>
					</div>

					{/* Event Details Box */}
					<div className="border border-gray-300 rounded-md p-4 grid grid-cols-2 gap-2">
						{/* Placeholder for Date */}
						<div className="h-5 bg-gray-100 rounded"></div>
						{/* Placeholder for Organizer */}
						<div className="h-5 bg-gray-100 rounded"></div>
						{/* Placeholder for Time */}
						<div className="h-5 bg-gray-100 rounded"></div>
						{/* Placeholder for Guests */}
						<div className="h-5 bg-gray-100 rounded"></div>
						{/* Placeholder for Location */}
						<div className="col-span-2 h-5 bg-gray-100 rounded"></div>
					</div>

					{/* Navigation Tabs Box */}
					<div className="border-b border-gray-300 flex">
						<button className="flex-1 py-2 border-none bg-transparent cursor-pointer border-b-2 border-blue-500 font-semibold">
							Services
						</button>
						<button className="flex-1 py-2 border-none bg-transparent cursor-pointer text-gray-600">
							Venue Map
						</button>
						<button className="flex-1 py-2 border-none bg-transparent cursor-pointer text-gray-600">
							Timeline
						</button>
					</div>

					{/* Requested Services Box */}
					<div className="border border-gray-300 rounded-md p-4">
						{/* Placeholder for Requested Services Title */}
						<div className="mb-2 h-5 bg-gray-100 rounded"></div>
						{/* Placeholder for List of Services */}
						<div className="mb-1 h-10 bg-gray-100 rounded"></div>
						<div className="mb-1 h-10 bg-gray-100 rounded"></div>
						<div className="mb-1 h-10 bg-gray-100 rounded"></div>
						{/* Placeholder for Upload File Button */}
						<div className="mt-4 h-10 bg-gray-200 rounded"></div>
					</div>
				</div>

				{/* Right Column */}
				<div className="flex flex-col gap-5">
					{/* Attached Files Box */}
					<div className="border border-gray-300 rounded-md p-4">
						{/* Placeholder for Attached Files Title */}
						<div className="mb-2 h-5 bg-gray-100 rounded"></div>
						{/* Placeholder for File Information */}
						<div className="h-14 bg-gray-100 rounded mb-2"></div>
					</div>

					{/* Organizer Info Box */}
					<div className="border border-gray-300 rounded-md p-4">
						{/* Placeholder for Organizer Name */}
						<div className="mb-2 h-5 bg-gray-100 rounded"></div>
						{/* Placeholder for Email */}
						<div className="mb-2 h-7 bg-gray-100 rounded"></div>
						{/* Placeholder for Phone */}
						<div className="mb-2 h-7 bg-gray-100 rounded"></div>
					</div>

					{/* Awaiting Response Box */}
					<div className="border border-gray-300 rounded-md p-4 bg-gray-50">
						{/* Placeholder for Awaiting Response Text */}
						<div className="h-14 bg-gray-200 rounded"></div>
					</div>

					{/* Get in Touch Box */}
					<div className="border border-gray-300 rounded-md p-4">
						{/* Placeholder for Get in Touch Title */}
						<div className="mb-2 h-5 bg-gray-100 rounded"></div>
						{/* Placeholder for Social Links */}
						<div className="mb-1 h-5 bg-gray-100 rounded"></div>
						<div className="mb-1 h-5 bg-gray-100 rounded"></div>
						<div className="mb-1 h-5 bg-gray-100 rounded"></div>
						<div className="mb-1 h-5 bg-gray-100 rounded"></div>
					</div>

					{/* Budget Breakdown Box */}
					<div className="border border-gray-300 rounded-md p-4">
						{/* Placeholder for Budget Breakdown Title */}
						<div className="mb-2 h-5 bg-gray-100 rounded"></div>
						{/* Placeholder for Total Expenses */}
						<div className="mb-2 h-7 bg-gray-100 rounded"></div>
						{/* Placeholder for Budget Items */}
						<div className="mb-1 h-5 bg-gray-100 rounded"></div>
						<div className="mb-1 h-5 bg-gray-100 rounded"></div>
						<div className="mb-1 h-5 bg-gray-100 rounded"></div>
						<div className="mb-1 h-5 bg-gray-100 rounded"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookingDetails;
