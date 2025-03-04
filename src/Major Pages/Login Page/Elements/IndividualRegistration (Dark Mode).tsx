import { Eye, EyeOff } from "lucide-react"
import type React from "react"
import { useState, useEffect } from "react"
import Select from "react-select"
import Logo from "/src/assets/OrganizerLogo.png"
import "../Main Page/RegistrationLogin.css";
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../../functions/authFunctions"
import { createUserAccount } from "../../../functions/userAccount"

const countryCodes = [{ code: "+63", flag: "https://flagcdn.com/w40/ph.png", name: "Philippines" }]

const SoloRegistrationDark: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0])
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const [companyName, setCompanyName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")

  const validatePassword = (pass: string): string => {
    if (pass.length < 12) return "Password must be at least 12 characters long."
    if (!/[A-Z]/.test(pass)) return "Password must include at least one uppercase letter."
    if (!/\d/.test(pass)) return "Password must include at least one number."
    if (!/[!@#$%^&*_]/.test(pass)) return "Password must include at least one special character (!@#$%^&*_)."
    return ""
  }

  useEffect(() => {
    setPasswordError(validatePassword(password))
  }, [password])

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.")
    } else {
      setConfirmPasswordError("")
    }
  }, [password, confirmPassword])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!companyName || !email || !password || !confirmPassword) {
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
      const userData = createUserAccount("individual", email, {
        companyName,
        phoneNumber: `${selectedCountry.code}${phoneNumber}`,
      })

      await registerUser(email, password, "individual", userData)

      navigate("/individual-vendor-login-dark")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }


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
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
              <label className="block text-sm font-medium text-white">
                Company Name
              </label>
              <input
              type="text"
              placeholder="Enter your company name"
              className="w-full px-4 py-2 border rounded-md focus:outline-blue-500"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
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
              className="w-full px-4 py-2 border rounded-md focus:outline-blue-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">Enter Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="border p-3 w-full rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
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
              <label className="block text-sm font-medium text-white">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="border p-3 w-full rounded-md"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>}
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-10 py-5 rounded-full font-bold hover:bg-blue-700 text-lg w-full max-w-lg"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </div>

            <p className="text-center text-sm text-white mt-2">
              Already have an account?{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline"
                onClick={(e) => {
                  e.preventDefault(); // Prevents default anchor behavior
                  navigate("/individual-vendor-login-dark"); // Redirects to LoginPage
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

export default SoloRegistrationDark;
