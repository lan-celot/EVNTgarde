import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaGlobe } from 'react-icons/fa';

type StatusType = 'awaiting' | 'accepted' | 'completed';

interface StatusProps {
	initialStatus?: StatusType;
}

const Status: React.FC<StatusProps> = ({ initialStatus = 'completed' }) => {

	const [status, setStatus] = useState<StatusType>(initialStatus);

	const organizerData = {
		name: "Organizer Name",
		role: "Organizer",
		email: "santo.tomas@gmail.com",
		phone: "0919-683-2396",
		avatarUrl: "https://placehold.co/100x100/87CEEB/FFF",
		dates: {
			requestDate: "Aug 1, 2025",
			acceptedDate: "Aug 10, 2025",
			paymentDate: "Aug 1, 2025",
			completedDate: "Aug 10, 2025"
		},
		socialLinks: {
			facebook: "@linktofacebook",
			instagram: "@linktoinstagram",
			linkedin: "@linktolinkedin",
			website: "@linktowebsite"
		}
	};

	const handleShareExperience = () => {
		console.log("Sharing experience...");

	};

	return (
		<div className="flex flex-col max-w-md mx-auto shadow-lg rounded-lg overflow-hidden bg-white">
			{/* Organizer Info Box */}
			<div className="p-6">
				<div className="flex items-center">
					<div className="w-12 h-12 rounded-full overflow-hidden mr-4">
						<img
							src={organizerData.avatarUrl}
							alt={organizerData.name}
							className="w-full h-full object-cover"
						/>
					</div>
					<div>
						<h2 className="text-xl font-semibold text-gray-800">{organizerData.name}</h2>
						<p className="text-gray-500">{organizerData.role}</p>
					</div>
				</div>

				<div className="mt-6">
					<div className="mb-4">
						<p className="text-gray-600 font-medium">Email</p>
						<p className="text-gray-500">{organizerData.email}</p>
					</div>

					<div>
						<p className="text-gray-600 font-medium">Phone</p>
						<p className="text-gray-500">{organizerData.phone}</p>
					</div>
				</div>
			</div>

			{/* Status Section - Conditionally rendered based on status */}
			{status === 'awaiting' ? (
				<>
					<hr className="border-gray-200 m-0" />
					<div className="p-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-2">Awaiting Response</h2>
						<p className="text-gray-500">
							You have booked this organizer, please wait for the organizer to respond to your event request.
						</p>
					</div>
				</>
			) : status === 'accepted' ? (
				<>
					{/* Accepted Banner */}
					<div className="bg-yellow-400 p-6 text-white">
						<h2 className="text-2xl font-bold mb-2">Accepted</h2>
						<p>
							The event has been accepted, and all the payments for the vendor <span className="font-bold">have been settled.</span>
						</p>
					</div>

					{/* Event Details with Dates */}
					<div className="p-6 space-y-4">
						<div>
							<p className="text-gray-800 font-medium">Request Date</p>
							<p className="text-gray-500">{organizerData.dates.requestDate}</p>
						</div>

						<div>
							<p className="text-gray-800 font-medium">Date Accepted</p>
							<p className="text-gray-500">{organizerData.dates.acceptedDate}</p>
						</div>

						<div>
							<p className="text-gray-800 font-medium">Payment Due Date</p>
							<p className="text-gray-500">{organizerData.dates.paymentDate}</p>
						</div>

						<div>
							<p className="text-gray-800 font-medium">Date Completed</p>
							<p className="text-gray-500">-</p>
						</div>

						<button
							onClick={() => setStatus('completed')}
							className="w-full mt-4 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
						>
							Mark Event as Completed
						</button>
					</div>
				</>
			) : (
				<>
					{/* Completed Banner - Green background as shown in the image */}
					<div className="bg-green-700 p-6 text-white">
						<h2 className="text-2xl font-bold mb-2">Completed</h2>
						<p>
							The event has concluded, and all the payments have been received
						</p>
					</div>

					{/* Event Details with Dates - order matches the image */}
					<div className="p-6 space-y-4">
						<div>
							<p className="text-gray-800 font-medium">Request Date</p>
							<p className="text-gray-500">{organizerData.dates.requestDate}</p>
						</div>

						<div>
							<p className="text-gray-800 font-medium">Date Accepted</p>
							<p className="text-gray-500">{organizerData.dates.acceptedDate}</p>
						</div>

						<div>
							<p className="text-gray-800 font-medium">Date Completed</p>
							<p className="text-gray-500">{organizerData.dates.completedDate}</p>
						</div>

						<div>
							<p className="text-gray-800 font-medium">Payment Date</p>
							<p className="text-gray-500">{organizerData.dates.paymentDate}</p>
						</div>

						{/* Share Experience button */}
						<button
							onClick={handleShareExperience}
							className="w-full mt-4 py-3 bg-blue-600 rounded-md text-white font-medium hover:bg-blue-700 transition-colors"
						>
							Share Experience
						</button>
					</div>
				</>
			)}

			{status === 'awaiting' && (
				<>
					<hr className="border-gray-200 m-0" />
					<div className="p-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h2>

						<div className="space-y-3">
							<div className="flex items-center">
								<FaFacebook className="text-gray-600 w-6 h-6 mr-3" />
								<span className="text-gray-500">{organizerData.socialLinks.facebook}</span>
							</div>

							<div className="flex items-center">
								<FaInstagram className="text-gray-600 w-6 h-6 mr-3" />
								<span className="text-gray-500">{organizerData.socialLinks.instagram}</span>
							</div>

							<div className="flex items-center">
								<FaLinkedin className="text-gray-600 w-6 h-6 mr-3" />
								<span className="text-gray-500">{organizerData.socialLinks.linkedin}</span>
							</div>

							<div className="flex items-center">
								<FaGlobe className="text-gray-600 w-6 h-6 mr-3" />
								<span className="text-gray-500">{organizerData.socialLinks.website}</span>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Status;