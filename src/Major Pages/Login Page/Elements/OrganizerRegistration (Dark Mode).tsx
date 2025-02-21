import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import Select from "react-select";
import Logo from "../assets/OrganizerLogo.png";
import "../RegistrationLogin.css";

// For Organizer
const countryCodes = [
	{ code: "+63", flag: "https://flagcdn.com/w40/ph.png", name: "Philippines" },
];

const OrganizerRegistrationDark: React.FC = () => {
	const [selected, setSelected] = useState("");
	const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const options = [
		{ value: "", label: "Please select one" },
		{ value: "option1", label: "Option 1" },
		{ value: "option2", label: "Option 2" },
		{ value: "option3", label: "Option 3" },
	];

	return (
		<div className="flex h-screen items-center justify-center bg-gray-300 font-[Poppins]">
			<div className="flex w-[1440px] h-[650px] bg-blue-600 rounded-xl shadow-lg overflow-hidden">
				{/* Left Panel */}
				<div className="w-2/5 bg-blue-600 text-white flex flex-col items-center justify-center text-center p-8">
					<img src={Logo} className="w-52 mb-6" alt="Logo" />
					<p>Discover tailored events services.</p>
					<p>Sign up for personalized services today!</p>
				</div>

				<div className="w-3/5 bg-gray-700 p-10 flex flex-col justify-center rounded-l-[50px] shadow-md">
					<h2 className="text-2xl font-bold text-white mb-4">Sign Up</h2>

					<form className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-white">
								Company Name
							</label>
							<input
								type="text"
								placeholder="Enter your company name"
								className="w-full px-3 py-1.5 border bg-gray-700 rounded-md text-sm focus:outline-blue-500"
								required
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-white">
								Company Phone Number
							</label>
							<div className="flex items-center bg-gray-700 border border-gray-300 rounded-md px-3 py-2">
								<Select
									options={countryCodes.map((country) => ({
										value: country.code,
										label: (
											<div className="flex items-center">
												<img
													src={country.flag}
													alt={country.name}
													className="w-6 h-4 mr-2"
												/>
												{country.code}
											</div>
										),
									}))}
									defaultValue={{
										value: selectedCountry.code,
										label: (
											<div className="flex items-center">
												<img
													src={selectedCountry.flag}
													alt={selectedCountry.name}
													className="w-6 h-4 mr-2"
												/>
												{selectedCountry.code}
											</div>
										),
									}}
									onChange={(selectedOption: any) => {
										const country = countryCodes.find(
											(c) => c.code === selectedOption.value
										);
										if (country) setSelectedCountry(country);
									}}
									className="w-28"
									styles={{
										control: (base) => ({
											...base,
											backgroundColor: "black",
											borderColor: "#D1D5DB", // gray-300
											color: "black",
										}),
										singleValue: (base) => ({
											...base,
											color: "black",
										}),
										menu: (base) => ({
											...base,
											backgroundColor: "black",
										}),
										option: (base, { isFocused }) => ({
											...base,
											backgroundColor: isFocused ? "black" : "black",
											color: "white",
										}),
									}}
								/>
								<input
									type="text"
									placeholder="Enter company phone number"
									className="w-full px-3 py-1.5 border rounded-md text-sm focus:outline-blue-500"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-white">
								Company E-mail Address
							</label>
							<input
								type="email"
								placeholder="Enter your company email"
								className="w-full px-3 py-1.5 border rounded-md text-sm focus:outline-blue-500"
								required
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-white">
								Enter Password
							</label>
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									placeholder="Enter password"
									className="w-full px-3 py-1.5 border rounded-md text-sm focus:outline-blue-500"
									required
								/>
								<button
									type="button"
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-white">
								Confirm Password
							</label>
							<div className="relative">
								<input
									type={showConfirmPassword ? "text" : "password"}
									placeholder="Confirm password"
									className="w-full px-3 py-1.5 border rounded-md text-sm focus:outline-blue-500"
									required
								/>
								<button
									type="button"
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								>
									{showConfirmPassword ? (
										<EyeOff size={20} />
									) : (
										<Eye size={20} />
									)}
								</button>
							</div>
						</div>

						<div className="w-full">
							<label className="block text-sm font-medium text-white">
								System Preferences
							</label>
							<div className="flex justify-center text-gray-700 text-white items-center mt-2">
								{["Procurement", "Inventory", "Reservation", "Logistics"].map(
									(preference) => (
										<label key={preference} className="flex items-center mx-2">
											<input type="radio" name="preference" className="mr-2" />
											{preference}
										</label>
									)
								)}
							</div>
						</div>

						<div className="relative w-full">
							<label className="block text-sm font-medium text-white">
								Industry
							</label>
							<select
								className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-700 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
								value={selected}
								onChange={(e) => setSelected(e.target.value)}
							>
								{options.map((option) => (
									<option
										key={option.value}
										value={option.value}
										className="text-white"
									>
										{option.label}
									</option>
								))}
							</select>
						</div>

						<div className="flex justify-center">
							<button
								type="submit"
								className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 text-base w-full max-w-md"
							>
								Create Account
							</button>
						</div>

						<p className="text-center text-white text-gray-600 mt-2">
							Already have an account?{" "}
							<a href="#" className="text-blue-600 hover:underline">
								Log in
							</a>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default OrganizerRegistrationDark;
