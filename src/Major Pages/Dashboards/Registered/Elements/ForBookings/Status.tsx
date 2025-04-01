const Status: React.FC = () => {
	return (
		<div className="flex flex-col gap-5">
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
		</div>
	);
};

export default Status;
