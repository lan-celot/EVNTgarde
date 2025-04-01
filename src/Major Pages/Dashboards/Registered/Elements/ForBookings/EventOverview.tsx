const EventOverview: React.FC = () => {
	return (
		<div className="flex flex-col gap-5">
			{/* Event Name and Description Box */}
			<div className="border border-gray-300 rounded-md p-4">
				{/* Placeholder for Event Name */}
				<div className="mb-2 h-10 bg-gray-100 rounded"></div>
				{/* Placeholder for Description */}
				<div className="h-16 bg-gray-100 rounded"></div>
				{/* Event Details Box */}
				<div className="p-4 grid grid-cols-2 gap-2">
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
			</div>
		</div>
	);
};

export default EventOverview;
