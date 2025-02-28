import { Eye, EyeOff } from "lucide-react";
import type React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import Logo from "/src/assets/OrganizerLogo.png";
import "../Main Page/RegistrationLogin.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../functions/authFunctions";
import { createUserAccount } from "../../../functions/userAccount";

const countryCodes = [
  { code: "+63", flag: "https://flagcdn.com/w40/ph.png", name: "Philippines" },
];

const VendorRegistration: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [vendorType, setVendorType] = useState("");
  const [servicesOffered, setServicesOffered] = useState("");
  const [systemPreference, setSystemPreference] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const options = [
    { value: "", label: "Please select one" },
    { value: "Catering", label: "Catering" },
    { value: "Photography", label: "Photography" },
    { value: "Event Planning", label: "Event Planning" },
  ];

  const validatePassword = (pass: string): string => {
    if (pass.length < 12)
      return "Password must be at least 12 characters long.";
    if (!/[A-Z]/.test(pass))
      return "Password must include at least one uppercase letter.";
    if (!/\d/.test(pass)) return "Password must include at least one number.";
    if (!/[!@#$%^&*_]/.test(pass))
      return "Password must include at least one special character (!@#$%^&*_).";
    return "";
  };

  useEffect(() => {
    setPasswordError(validatePassword(password));
  }, [password]);

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !companyName ||
      !phoneNumber ||
      !email ||
      !password ||
      !confirmPassword ||
      !vendorType ||
      !systemPreference
    ) {
      setError("All fields are required");
      return;
    }

    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (confirmPasswordError) {
      setError(confirmPasswordError);
      return;
    }

    setIsLoading(true);

    try {
      const userData = createUserAccount("vendor", email, {
        companyName,
        phoneNumber: `${selectedCountry.code}${phoneNumber}`,
        vendorType,
        servicesOffered,
        systemPreference,
      });

      await registerUser(email, password, "vendor", userData);

      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-300 font-[Poppins]">
      <div className="flex w-[1440px] h-[650px] bg-blue-600 rounded-xl shadow-lg overflow-hidden">
        {/* Left Panel */}
        <div className="w-2/5 bg-blue-600 text-white flex flex-col items-center justify-center text-center p-8">
          <img
            src={Logo || "/placeholder.svg"}
            className="w-52 mb-6"
            alt="Logo"
          />
          <p>Discover tailored events services.</p>
          <p>Sign up for personalized services today!</p>
        </div>

        <div className="w-3/5 bg-white p-10 flex flex-col justify-center rounded-l-[50px] shadow-md overflow-y-auto">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Sign Up</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded-md"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Phone Number
              </label>
              <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
                <Select
                  options={countryCodes.map((country) => ({
                    value: country.code,
                    label: (
                      <div className="flex items-center">
                        <img
                          src={country.flag || "/placeholder.svg"}
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
                          src={selectedCountry.flag || "/placeholder.svg"}
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
                      backgroundColor: "white",
                      borderColor: "#D1D5DB",
                      color: "black",
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: "black",
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "white",
                    }),
                    option: (base, { isFocused }) => ({
                      ...base,
                      backgroundColor: isFocused ? "#F3F4F6" : "white",
                      color: "black",
                    }),
                  }}
                />
                <input
                  type="text"
                  className="w-full border p-2 rounded-md"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company E-mail Address
              </label>
              <input
                type="email"
                className="w-full border p-2 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border p-2 rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {passwordError && (
                  <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                )}

                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className={`w-full px-3 py-1.5 border rounded-md text-sm focus:outline-blue-500 ${
                    confirmPasswordError ? "border-red-500" : ""
                  }`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              {confirmPasswordError && (
                <p className="text-red-500 text-xs mt-1">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <div className="full flex items-center space-x-4">
              <label className="block text-sm font-medium text-gray-700">
                I am a
              </label>
              <div className="flex justify-center text-gray-700 items-center">
                {["Solo Vendor", "Company Vendor"].map((type) => (
                  <label key={type} className="flex items-center mx-2">
                    <input
                      type="radio"
                      name="vendorType"
                      value={type}
                      checked={vendorType === type}
                      onChange={() => setVendorType(type)}
                      className="mr-2"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div className="relative w-full">
              <select
                className="w-full px-1 py-1 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={servicesOffered}
                onChange={(e) => setServicesOffered(e.target.value)}
              >
                {options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="text-black"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                System Preferences
              </label>
              <div className="flex justify-center text-gray-700 items-center mt-2">
                {["Procurement", "Inventory", "Reservation", "Logistics"].map(
                  (preference) => (
                    <label key={preference} className="flex items-center mx-2">
                      <input
                        type="radio"
                        name="systemPreference"
                        value={preference}
                        checked={systemPreference === preference}
                        onChange={() => setSystemPreference(preference)}
                        className="mr-2"
                      />
                      {preference}
                    </label>
                  )
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 text-base w-full max-w-md"
              >
                Create Account
              </button>
            </div>

            <p className="text-center text-sm text-gray-600 mt-2">
              Already have an account?{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorRegistration;
