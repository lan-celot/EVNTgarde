import React from "react";
import Logo from "../assets/OrganizerLogo.png";
import "../RegistrationLogin.css";

//For Role Selection

const RoleSelection: React.FC = () => {
	return (
		<div className="flex h-screen items-center justify-center bg-gray-300 font-[Poppins]">
			<div className="flex w-[1440px] h-[650px] bg-blue-600 rounded-xl shadow-lg overflow-hidden">
				<div className="w-2/5 bg-blue-600 text-white flex flex-col items-center justify-center text-center p-8">
					<img src={Logo} className="w-52 mb-6" alt="Logo" />
					<p>Discover tailored events services.</p>
					<p>Sign up for personalized services today!</p>
				</div>

				<div className="w-3/5 bg-white p-10 flex flex-col justify-center text-center rounded-l-[50px] shadow-md">
					<h2 className="text-4xl font-bold text-grey-800 mb-8">
						Select your role
					</h2>
					<form className="flex flex-col space-y-4 items-center">
						<button
							type="submit"
							className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 w-52 shadow-md transition"
						>
							Individual
						</button>
						<button
							type="submit"
							className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 w-52 shadow-md transition"
						>
							Organizer
						</button>
						<button
							type="submit"
							className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 w-52 shadow-md transition"
						>
							Vendor
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RoleSelection;
