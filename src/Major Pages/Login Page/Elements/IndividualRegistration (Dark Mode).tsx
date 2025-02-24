import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import Select from "react-select";
import Logo from "../assets/OrganizerLogo.png";
import "../RegistrationLogin.css";

//For Individual

const countryCodes = [
	{ code: "+63", flag: "https://flagcdn.com/w40/ph.png", name: "Philippines" },
];

const SoloRegistrationDark: React.FC = () => {
	const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	return (
		<div className="flex h-screen items-center justify-center bg-gray-300 font-[Poppins]">
			<div className="flex w-[1440px] h-[650px] bg-blue-600 rounded-xl shadow-lg overflow-hidden">
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
								className="w-full px-4 py-2 border rounded-md focus:outline-blue-500"
								required
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-white">
								Company Phone Number
							</label>
							<div className="flex items-center bg-gray-700 border rounded-md">
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
												<span className="text-white">{country.code}</span>
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
											backgroundColor: "#374151", // bg-gray-700
											borderColor: "#4B5563", // border-gray-600
											color: "white",
										}),

										singleValue: (base) => ({
											...base,
											color: "white",
										}),

										menu: (base) => ({
											...base,
											backgroundColor: "#374151", // bg-gray-700 for dropdown list
										}),

										option: (base, { isFocused }) => ({
											...base,
											backgroundColor: isFocused ? "#4B5563" : "#374151", // Darker gray on hover
											color: "white",
										}),
									}}
								/>

								<input
									type="text"
									placeholder="Enter company phone number"
									className="w-full px-2 py-2 focus:outline-none"
									required
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
								className="w-full px-4 py-2 border rounded-md focus:outline-blue-500"
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
									className="border p-3 w-full rounded-md"
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
									className="border p-3 w-full rounded-md"
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

						<div className="flex justify-center">
							<button
								type="submit"
								className="bg-blue-600 text-white px-10 py-5 rounded-full font-bold hover:bg-blue-700 text-lg w-full max-w-lg"
							>
								{" "}
								Create Account{" "}
							</button>
						</div>

						<p className="text-center text-sm text-white mt-2">
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

export default SoloRegistrationDark;
