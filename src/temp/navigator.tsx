import { useNavigate } from "react-router-dom";
import "./navigator.css";

const Navigator = () => {
	const navigate = useNavigate();
	const cards = [
		{
			title: "Chapter One Works",
			icon: "",
			path: "/chapterOne",
		},
		{
			title: "Chapter Two Works",
			icon: "",
			path: "/chapterTwo",
		},
		{
			title: "Chapter Three Works",
			icon: "",
			path: "/chapterThree",
		},
		{
			title: "Chapter Four Works",
			icon: "",
			path: "/chapterFour",
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

export default Navigator;
