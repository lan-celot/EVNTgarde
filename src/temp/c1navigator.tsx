import { useNavigate } from "react-router-dom";
import "./navigator.css";

const C1Navigator = () => {
	const navigate = useNavigate();
	const cards = [
		{
			title: "Account Password",
			icon: "", // Add your icon paths here when available
			path: "/chapterOne/accpass/", // All lowercase, consistent with routes
		},
		{
			title: "Registration Login",
			icon: "",
			path: "/chapterOne/reglog",
		},
		{
			title: "Home Page",
			icon: "",
			path: "/chapterOne/homepage",
		},
	];

	return (
		<div className="service-cards">
			{cards.map((card, index) => (
				<div
					className="card"
					key={index}
					onClick={() => {
						console.log("Navigating to:", card.path);
						navigate(card.path);
					}}
				>
					<img className="card-icon" src={card.icon} alt={card.title} />{" "}
					{/* Add src attribute */}
					<p>{card.title}</p>
				</div>
			))}
		</div>
	);
};

export default C1Navigator;
