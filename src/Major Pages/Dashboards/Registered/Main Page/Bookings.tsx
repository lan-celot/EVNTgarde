import BookingDetails from "../Elements/ForBookings/BookingDetails";
import { useState } from "react";

const Bookings: React.FC = () => {
	const [currentComponent, setCurrentComponent] = useState<
		"bookings" | "details"
	>("bookings");

	const handleSwitch = (component: "bookings" | "details") => {
		setCurrentComponent(component);
	};

	return (
		<div style={{ marginLeft: "16rem" }}>
			<h3>Temporary component switching</h3>
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

			{/*DITO MUNA LALAGAY CONTENTS FOR CHAP 1 */}
			{currentComponent === "bookings" && (
				<div>
					<p>for chap 1</p>
				</div>
			)}

			{currentComponent === "details" && <BookingDetails />}
		</div>
	);
};

export default Bookings;
