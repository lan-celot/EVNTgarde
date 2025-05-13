import { Eye, EyeOff } from "lucide-react";
import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/OrganizerLogo.png";
import { registerUser, signInWithGoogle, signInWithYahoo } from "../../functions/authFunctions";
import { useTheme } from "../../functions/ThemeContext";
import { FcGoogle } from "react-icons/fc";
import { AiFillYahoo } from "react-icons/ai";
import { createUserAccount } from "../../functions/userAccount";

type VendorType = "Solo Vendor" | "Company Vendor" | "";

const VendorRegistration: React.FC<{ step: number }> = ({ step = 1 }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(step);
  const { isDarkMode } = useTheme();

  const [vendorType, setVendorType] = useState<VendorType>("");
  const [vendorName, setVendorName] = useState("");
  const [businessOffering, setBusinessOffering] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [termsAccepted] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [hasSelectedVendorType, setHasSelectedVendorType] = useState(false);

  useEffect(() => {
    setCurrentStep(step);
  }, [step]);

  const [error, setError] = useState("");

  const offeringOptions = [
    { value: "", label: "Please select service offered" },
    { value: "catering", label: "Catering" },
    { value: "venue", label: "Venue Rental" },
    { value: "entertainment", label: "Entertainment" },
    { value: "decoration", label: "Decoration" },
    { value: "photography", label: "Photography" },
  ];

  const preferenceOptions = [
    "Procurement",
    "Inventory",
    "Reservations",
    "Logistics",
  ];

  useEffect(() => {
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

    setPasswordError(validatePassword(password));
  }, [password]);

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (currentStep === 3) {
      const storedData = sessionStorage.getItem("vendorRegistration");
      if (storedData) {
        const data = JSON.parse(storedData);
        setVendorType(data.vendorType);
        setVendorName(data.vendorName);
        setBusinessOffering(data.businessOffering);
        setPreferences(data.preferences);
      }
    }
  }, [currentStep]);

  const handlePreferenceChange = (preference: string) => {
    if (preferences.includes(preference)) {
      setPreferences(preferences.filter((p) => p !== preference));
    } else {
      setPreferences([...preferences, preference]);
    }
  };

  const handleGetStarted = () => {
    if (!vendorType) {
      setError("Please select a vendor type.");
      return;
    }
    setHasSelectedVendorType(true);
  };

  const handleProceed = () => {
    navigate("/register/vendor/step2");
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (!vendorType || !vendorName || !businessOffering) {
      setError("Vendor type, name, and business offering are required");
      return;
    }

    if (preferences.length === 0) {
      setError("Please select at least one system preference");
      return;
    }

    sessionStorage.setItem(
      "vendorRegistration",
      JSON.stringify({
        vendorType,
        vendorName,
        businessOffering,
        preferences,
      })
    );

    navigate("/register/vendor/step3");
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate("/role-selection");
    } else if (currentStep === 2) {
      navigate("/register/vendor");
    } else {
      navigate("/register/vendor/step2");
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (!termsAccepted) {
      setError("You must agree to the Terms and Conditions");
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
      // Get stored data
      const storedData = JSON.parse(sessionStorage.getItem("vendorRegistration") || "{}");
      
      // Create user account with data from all parts
      const userData = createUserAccount("vendor", email, {
        vendorType,
        businessName: vendorName,
        services: businessOffering,
        phoneNumber: phoneNumber ? `+63${phoneNumber}` : "",
        gender: storedData.gender,
        address: storedData.address,
      });

      // Register user with Firebase
      const firebaseUser = await registerUser(email, password, "vendor", userData);

      // Register user with PostgreSQL
      try {
        const response = await fetch('http://localhost:5000/api/registerVendor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: vendorName, // Using business name as first name
            lastName: "", // Empty for vendors
            email,
            password,
            phoneNo: phoneNumber ? `+63${phoneNumber}` : null,
            preferences: preferences.join(','),
            customerType: "vendor",
            vendorType: vendorType.toLowerCase(),
            service: businessOffering,
            gender: storedData.gender,
            address: storedData.address
          }),
        });

        if (!response.ok) {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Database registration failed");
          } else {
            throw new Error("Database registration failed");
          }
        }

        // Success: clear storage, navigate, etc.
        sessionStorage.removeItem("vendorRegistration");
        navigate("/login");
      } catch (dbError: any) {
        // If PostgreSQL registration fails, delete the Firebase user
        if (firebaseUser) {
          try {
            await firebaseUser.delete();
          } catch (deleteError) {
            console.error("Error deleting Firebase user after failed database registration:", deleteError);
          }
        }
        throw new Error(`Database registration error: ${dbError.message}`);
      }
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setError("");
    try {
      await signInWithGoogle("vendor");
      navigate("/vendor");
    } catch (err: any) {
      setError("Failed to sign up with Google. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleYahooSignUp = async () => {
    setIsLoading(true);
    setError("");
    try {
      await signInWithYahoo("vendor");
      navigate("/vendor");
    } catch (err: any) {
      setError("Failed to sign up with Yahoo. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-300 font-[Poppins] p-4">
      <div
        className={`flex w-[1440px] h-[650px] ${
          isDarkMode ? "bg-gray-800" : "bg-blue-600"
        } rounded-xl shadow-lg overflow-hidden font-poppins`}
      >
        {/* Left Side - Logo & Text */}
        <div
          className={`w-2/5 ${
            isDarkMode ? "bg-gray-800" : "bg-blue-600"
          } text-white flex flex-col items-center justify-center text-center p-8`}
        >
          <img
            src={Logo || "/placeholder.svg"}
            className="max-w-xs mb-4"
            alt="Logo"
          />
          <p className="text-lg font-medium mb-2">
            Discover tailored events services.
          </p>
          <p className="text-lg font-medium mb-2">
            Sign up for personalized services today!
          </p>
        </div>

        {/* Right Side - Form */}
        <div
          className={`w-3/5 ${
            isDarkMode ? "bg-black text-white" : "bg-white text-gray-800"
          } p-12 flex flex-col justify-center rounded-l-[50px] shadow-md relative overflow-y-auto`}
        >
          {currentStep === 1 ? (
            !hasSelectedVendorType ? (
              <>
                <h2 className="text-4xl font-bold mb-6">Sign Up</h2>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-4">
                    Are you a solo vendor or part of a company?
                  </h3>
                  <p className="text-lg mb-6">
                    This helps us understand how to showcase your offerings.
                  </p>

                  {/* Add Radio Buttons with Border Styling */}
                  <div className="space-y-4">
                    <label
                      className={`flex items-start p-4 border rounded-lg cursor-pointer ${
                        vendorType === "Solo Vendor"
                          ? "border-blue-500 bg-gray-500 dark:bg-blue-900/30"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      <input
                        type="radio"
                        name="vendorType"
                        className="mt-1 mr-3"
                        checked={vendorType === "Solo Vendor"}
                        onChange={() => setVendorType("Solo Vendor")}
                      />
                      <div>
                        <p className="font-medium">I'm a solo vendor</p>
                      </div>
                    </label>

                    <label
                      className={`flex items-start p-4 border rounded-lg cursor-pointer ${
                        vendorType === "Company Vendor"
                          ? "border-blue-500 bg-gray-500 dark:bg-blue-200/30"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      <input
                        type="radio"
                        name="vendorType"
                        className="mt-1 mr-3"
                        checked={vendorType === "Company Vendor"}
                        onChange={() => setVendorType("Company Vendor")}
                      />
                      <div>
                        <p className="font-medium">I'm a company vendor</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Buttons Container */}
                <div className="flex justify-between gap-4 mt-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    Start Over
                  </button>
                  <button
                    type="button"
                    onClick={handleGetStarted}
                    className={`flex-1 px-6 py-3 ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-300"
                        : "bg-blue-600 "
                    } rounded-xl shadow-lg overflow-hidden font-poppins`}
                    disabled={!vendorType}
                  >
                    Get Started
                  </button>
                </div>

                <p
                  className={`text-center mt-4 ${
                    isDarkMode ? "text-white" : "text-gray-700"
                  }`}
                >
                  Already have an account?{" "}
                  <a href="/login" className="text-blue-600 hover:underline">
                    Log in
                  </a>
                </p>
              </>
            ) : vendorType === "Solo Vendor" ? (
              <>
                <h2 className="text-4xl font-bold mb-6">Sign Up</h2>

                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4">
                    You're a Solo Vendor!
                  </h3>
                  <p className="text-lg mb-6">
                    Perfect Pick! Showcase your services/business to organizers.
                    We'll help you get set up right away.
                  </p>
                </div>

                <div className="flex justify-center items-center gap-5">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    Start Over
                  </button>
                  <button
                    type="button"
                    onClick={handleProceed}
                    className={`flex-1 px-6 py-3 ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-300"
                        : "bg-blue-600 "
                    } rounded-xl shadow-lg overflow-hidden font-poppins`}
                  >
                    Proceed
                  </button>
                </div>

                <p
                  className={`text-center mt-4 ${
                    isDarkMode ? "text-white" : "text-gray-700"
                  }`}
                >
                  Already have an account?{" "}
                  <a href="/login" className="text-blue-600 hover:underline">
                    Log in
                  </a>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold mb-6">Sign Up</h2>

                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4">
                    You're a Company Vendor!
                  </h3>
                  <p className="text-lg mb-6">
                    Perfect Pick! Showcase your services/business to organizers.
                    We'll help you get set up right away.
                  </p>
                </div>

                <div className="flex justify-center items-center gap-5">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    Start Over
                  </button>
                  <button
                    type="button"
                    onClick={handleProceed}
                    className={`flex-1 px-6 py-3 ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-300"
                        : "bg-blue-600 "
                    } rounded-xl shadow-lg overflow-hidden font-poppins`}
                  >
                    Proceed
                  </button>
                </div>

                <p
                  className={`text-center mt-4 ${
                    isDarkMode ? "text-white" : "text-gray-700"
                  }`}
                >
                  Already have an account?{" "}
                  <a href="/login" className="text-blue-600 hover:underline">
                    Log in
                  </a>
                </p>
              </>
            )
          ) : currentStep === 2 ? (
            <>
              <h2 className="text-4xl font-bold mb-6">Sign Up</h2>

              {error && (
                <div className="bg-red-500 text-white p-3 rounded-md mb-4">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  className={`flex items-center justify-center gap-2 px-23 py-3 rounded-lg border w-full md:w-auto 
                    ${
                      isDarkMode
                        ? "bg-black border-gray-600 text-white hover:bg-gray-700"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-100"
                    }`}
                  disabled={isLoading}
                >
                  <FcGoogle size={20} />
                  <span className="font-medium">Sign up with Google</span>
                </button>
                <button
                  type="button"
                  onClick={handleYahooSignUp}
                  className={`flex items-center justify-center gap-2 px-23 py-3 rounded-lg border w-full md:w-auto 
                    ${
                      isDarkMode
                        ? "bg-black border-gray-600 text-white hover:bg-gray-900"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-100"
                    }`}
                  disabled={isLoading}
                >
                  <AiFillYahoo size={20} className="text-purple-600" />
                  <span className="font-medium">Sign up with Yahoo</span>
                </button>
              </div>

              <div className="relative flex items-center py-2 mb-4">
                <div
                  className={`flex-grow border-t ${
                    isDarkMode ? "border-gray-600" : "border-gray-300"
                  }`}
                ></div>
                <span
                  className={`flex-shrink mx-4 text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  OR
                </span>
                <div
                  className={`flex-grow border-t ${
                    isDarkMode ? "border-gray-600" : "border-gray-300"
                  }`}
                ></div>
              </div>

              <form className="space-y-6" onSubmit={handleNext}>
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-700"
                    }`}
                  >
                    Business Name
                  </label>
                  <input
                    type="text"
                    placeholder="John's Catering"
                    className={`w-full px-4 py-2 border rounded-md text-sm focus:outline-blue-500 ${
                      isDarkMode
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white text-gray-800 border-gray-300"
                    }`}
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-700"
                    }`}
                  >
                    Services Offered
                  </label>
                  <select
                    className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white text-gray-800 border-gray-300"
                    }`}
                    value={businessOffering}
                    onChange={(e) => setBusinessOffering(e.target.value)}
                    required
                  >
                    {offeringOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className={isDarkMode ? "text-white" : "text-gray-800"}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-700"
                    }`}
                  >
                    System Preferences
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {preferenceOptions.map((preference) => (
                      <label key={preference} className="flex items-center">
                        <input
                          type="checkbox"
                          name="preference"
                          className="mr-2"
                          checked={preferences.includes(preference)}
                          onChange={() => handlePreferenceChange(preference)}
                        />
                        {preference}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center items-center gap-5">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-43 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className={`flex-1 px-6 py-3 ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-300"
                        : "bg-blue-600 hover:bg-blue-300"
                    } rounded-xl shadow-lg overflow-hidden font-poppins`}
                  >
                    Next
                  </button>
                </div>

                <p
                  className={`text-center mt-4 ${
                    isDarkMode ? "text-white" : "text-gray-700"
                  }`}
                >
                  Already have an account?{" "}
                  <a href="/login" className="text-blue-600 hover:underline">
                    Log in
                  </a>
                </p>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold mb-6">Sign Up</h2>

              {error && (
                <div className="bg-red-500 text-white p-3 rounded-md mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleCreateAccount}>
                <div className="mb-4">
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-700"
                    }`}
                  >
                    Phone Number (optional)
                  </label>
                  <div className="flex items-center border rounded-md">
                    <span
                      className={`px-3 py-2 ${
                        isDarkMode ? "text-white" : "text-gray-700"
                      }`}
                    >
                      +63
                    </span>
                    <input
                      type="text"
                      placeholder="000 0000 000"
                      className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                        isDarkMode
                          ? "bg-gray-700 text-white border-gray-600"
                          : "bg-white text-gray-800 border-gray-300"
                      }`}
                      value={phoneNumber}
                      onChange={(e) =>
                        setPhoneNumber(e.target.value.replace(/\D/g, ""))
                      }
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-700"
                    }`}
                  >
                    Business Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="business@example.com"
                    className={`w-full px-4 py-2 border rounded-md text-sm focus:outline-blue-500 ${
                      isDarkMode
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white text-gray-800 border-gray-300"
                    }`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-700"
                    }`}
                  >
                    Enter Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className={`w-full px-4 py-2 border rounded-md text-sm ${
                        passwordError && password ? "border-red-500" : ""
                      } ${
                        isDarkMode
                          ? "bg-gray-700 text-white border-gray-600"
                          : "bg-white text-gray-800 border-gray-300"
                      }`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                  {passwordError && password && (
                    <p
                      className={`text-sm mt-1 ${
                        isDarkMode ? "text-red-400" : "text-red-500"
                      }`}
                    >
                      {passwordError}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-700"
                    }`}
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      className={`w-full px-4 py-2 border rounded-md text-sm ${
                        confirmPasswordError && confirmPassword
                          ? "border-red-500"
                          : ""
                      } ${
                        isDarkMode
                          ? "bg-gray-700 text-white border-gray-600"
                          : "bg-white text-gray-800 border-gray-300"
                      }`}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {confirmPasswordError && confirmPassword && (
                    <p
                      className={`text-sm mt-1 ${
                        isDarkMode ? "text-red-400" : "text-red-500"
                      }`}
                    >
                      {confirmPasswordError}
                    </p>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className={`flex-1 px-6 py-3 ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-300"
                        : "bg-blue-600  hover:bg-blue-300"
                    } rounded-xl shadow-lg overflow-hidden font-poppins`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : null}
                    Create Account
                  </button>
                </div>

                <p
                  className={`text-center mt-4 ${
                    isDarkMode ? "text-white" : "text-gray-700"
                  }`}
                >
                  Already have an account?{" "}
                  <a href="/login" className="text-blue-600 hover:underline">
                    Log in
                  </a>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorRegistration;
