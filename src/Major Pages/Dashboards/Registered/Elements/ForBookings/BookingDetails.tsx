import { useState } from "react";
import Bookings from "../../Main Page/Bookings";
import { Button } from "@/Layout/combined-ui";

const BookingDetails: React.FC = () => {
	const [showOtherComponent, setShowOtherComponent] = useState(false);

	// Handler to toggle visibility of OtherComponent
	const handleClick = () => {
		setShowOtherComponent(!showOtherComponent);
	};

	return (
		<div>
			<p>for chap 2</p>
		</div>
	);
};

export default BookingDetails;
