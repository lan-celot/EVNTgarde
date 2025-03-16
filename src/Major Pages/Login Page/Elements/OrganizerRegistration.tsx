import { Eye, EyeOff, Moon, Sun } from "lucide-react"
import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Logo from "@/assets/OrganizerLogo.png"
import "@/Major Pages/Login Page/Main Page/RegistrationLogin.css"
import { registerUser } from "../../../functions/authFunctions"
import { createUserAccount } from "../../../functions/userAccount"

const OrganizerRegistration: React.FC = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark"
  })

  // Step 1 form state
  const [companyName, setCompanyName] = useState("")
  const [industry, setIndustry] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [preferences, setPreferences] = useState<string[]>([])

  // Step 2 form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Common state
  const [error, setError] = useState("")

  // Industry options
  const industryOptions = [
    { value: "", label: "Please select one" },
    { value: "events", label: "Events Management" },
    { value: "hospitality", label: "Hospitality" },
    { value: "entertainment", label: "Entertainment" },
    { value: "food", label: "Food & Beverage" },
  ]

  // Preference options
  const preferenceOptions = ["Procurement", "Inventory", "Reservation", "Logistics"]

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark"
    setIsDarkMode(!isDarkMode)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", !isDarkMode)
  }

  // Apply theme on component mount
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [])

  // Password validation
  useEffect(() => {
    const validatePassword = (pass: string): string => {
      if (pass.length < 12) return "Password must be at least 12 characters long."
      if (!/[A-Z]/.test(pass)) return "Password must include at least one uppercase letter."
      if (!/\d/.test(pass)) return "Password must include at least one number."
      if (!/[!@#$%^&*_]/.test(pass)) return "Password must include at least one special character (!@#$%^&*_)."
      return ""
    }

    setPasswordError(validatePassword(password))
  }, [password])

  // Confirm password validation
  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.")
    } else {
      setConfirmPasswordError("")
    }
  }, [password, confirmPassword])

  // Load data from session storage when moving to step 2
  useEffect(() => {
    if (currentStep === 2) {
      const storedData = sessionStorage.getItem("organizerRegistration")
      if (storedData) {
        const data = JSON.parse(storedData)
        setCompanyName(data.companyName)
        setIndustry(data.industry)
        setPhoneNumber(data.phoneNumber.replace("+63", ""))
        setPreferences(data.preferences)
      }
    }
  }, [currentStep])

  // Handle preference change
  const handlePreferenceChange = (preference: string) => {
    if (preferences.includes(preference)) {
      setPreferences(preferences.filter((p) => p !== preference))
    } else {
      setPreferences([...preferences, preference])
    }
  }

  // Handle step 1 submission
  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault()

    if (!companyName || !industry) {
      setError("Company name and industry are required")
      return
    }

    if (preferences.length === 0) {
      setError("Please select at least one system preference")
      return
    }

    // Store form data in sessionStorage to retrieve in part 2
    sessionStorage.setItem(
      "organizerRegistration",
      JSON.stringify({
        companyName,
        industry,
        phoneNumber: phoneNumber ? `+63${phoneNumber}` : "",
        preferences,
      }),
    )

    // Move to step 2
    setCurrentStep(2)
  }

  // Handle final submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password || !confirmPassword) {
      setError("All fields are required")
      return
    }

    if (passwordError) {
      setError(passwordError)
      return
    }

    if (confirmPasswordError) {
      setError(confirmPasswordError)
      return
    }

    setIsLoading(true)

    try {
      // Create user account with data from both parts
      const userData = createUserAccount("organizer", email, {
        companyName,
        industry,
        phoneNumber: phoneNumber ? `+63${phoneNumber}` : "",
        preferences,
      })

      // Register user with Firebase
      await registerUser(email, password, "organizer", userData)

      // Clear session storage
      sessionStorage.removeItem("organizerRegistration")

      // Navigate to login page
      navigate("/login")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-300 font-[Poppins] p-4">
      <div className="flex w-[1440px] h-[650px] bg-blue-600 rounded-xl shadow-lg overflow-hidden font-poppins">
        {/* Left Side - Logo & Text */}
        <div className="w-2/5 bg-blue-600 text-white flex flex-col items-center justify-center text-center p-8">
          <img src={Logo || "/placeholder.svg"} className="max-w-xs mb-4" alt="Logo" />
          <p className="text-lg font-medium mb-2">Discover tailored events services.</p>
          <p className="text-lg font-medium mb-2">Sign up for personalized services today!</p>
        </div>

        {/* Right Side - Form */}
        <div
          className={`w-3/5 ${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"} p-12 flex flex-col justify-center rounded-l-[50px] shadow-md relative`}
        >
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {isDarkMode ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-gray-800" />}
          </button>

          <h2 className="text-4xl font-bold mb-6">Sign Up</h2>

          {error && <div className="bg-red-500 text-white p-3 rounded-md mb-4">{error}</div>}

          {currentStep === 1 ? (
            /* Step 1 Form */
            <form className="space-y-6" onSubmit={handleProceed}>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your company name"
                  className={`w-full px-4 py-2 border rounded-md text-sm focus:outline-blue-500 ${
                    isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                  }`}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                  Company Industry
                </label>
                <select
                  className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"
                  }`}
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  required
                >
                  {industryOptions.map((option) => (
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
                <label className={`block mb-2 ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                  Phone number (optional)
                </label>
                <div
                  className={`flex items-center border rounded-md ${
                    isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  }`}
                >
                  <span className={`px-3 py-2 ${isDarkMode ? "text-white" : "text-gray-700"}`}>+63</span>
                  <input
                    type="text"
                    placeholder="000 0000 000"
                    className={`w-full px-4 py-2 rounded-md focus:outline-none ${
                      isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"
                    }`}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                  System Preferences
                </label>
                <div
                  className={`flex justify-start space-x-6 items-center mt-2 ${
                    isDarkMode ? "text-white" : "text-gray-700"
                  }`}
                >
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

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 text-base w-full max-w-md"
                >
                  Proceed
                </button>
              </div>

              <p className={`text-center mt-4 ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Log in
                </a>
              </p>
            </form>
          ) : (
            /* Step 2 Form */
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                  Company E-mail Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your company email"
                  className={`w-full px-4 py-2 border rounded-md text-sm focus:outline-blue-500 ${
                    isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                  Enter Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className={`w-full px-4 py-2 border rounded-md text-sm ${
                      passwordError && password ? "border-red-500" : ""
                    } ${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"}`}
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
                  <p className={`text-sm mt-1 ${isDarkMode ? "text-red-400" : "text-red-500"}`}>{passwordError}</p>
                )}
              </div>

              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className={`w-full px-4 py-2 border rounded-md text-sm ${
                      confirmPasswordError && confirmPassword ? "border-red-500" : ""
                    } ${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"}`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {confirmPasswordError && confirmPassword && (
                  <p className={`text-sm mt-1 ${isDarkMode ? "text-red-400" : "text-red-500"}`}>
                    {confirmPasswordError}
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 text-base w-full max-w-md flex justify-center items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : null}
                  Submit
                </button>
              </div>

              <div className="flex justify-center mt-4">
                <button type="button" className="text-blue-600 hover:underline" onClick={() => setCurrentStep(1)}>
                  Back to previous step
                </button>
              </div>

              <p className={`text-center mt-2 ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Log in
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrganizerRegistration

