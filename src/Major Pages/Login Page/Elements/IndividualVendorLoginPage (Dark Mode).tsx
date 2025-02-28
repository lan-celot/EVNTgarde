import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import Select from "react-select";
import Logo from "../assets/OrganizerLogo.png"; // Ensure correct relative path
import "../Main-Page/RegistrationLogin.css"; // Ensure correct relative path
import { useNavigate } from "react-router-dom";
import { 
  auth, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  googleProvider, 
  yahooProvider, 
  db 
} from "../../../functions/firebase"
  import { doc, setDoc } from "firebase/firestore";
import { UserData, LoginCredentials, RegistrationData } from "../../../functions/types.ts";
import {
  updateUserType,
  updateContactInfo,
  updateBusinessInfo,
  updateIndustry,
  updateServices,
  updatePreferences
} from "../../../functions/userAccount";

const countryCodes = [{ code: "+63", flag: "https://flagcdn.com/w40/ph.png", name: "Philippines" }];

const LoginPageDark: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user, setUser] = useState<UserData>({ 
    userType: "vendor", 
    email: "", 
    password: "", 
    phone: "", 
    companyName: "", 
    preferences: [] 
  });
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      const userId = userCredential.user.uid;
      const updatedUser = updateUserType(user, "vendor");
      await setDoc(doc(db, "users", userId), updatedUser);
      console.log("User created and saved to Firestore:", updatedUser);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };


  return (
    <div className="flex h-screen items-center justify-center bg-gray-300 font-[Poppins]">
      <div className="flex w-[1440px] h-[650px] bg-blue-600 rounded-xl shadow-lg overflow-hidden">
        <div className="w-2/5 bg-blue-600 text-white flex flex-col items-center justify-center text-center p-8">
          <img src={Logo} className="w-52 mb-6" alt="Logo" />
          <p>Discover tailored events services.</p>
          <p>Sign up for personalized services today!</p>
        </div>
        <div className="w-3/5 bg-white p-10 flex flex-col justify-center rounded-l-[50px] shadow-md">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Sign Up</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                placeholder="Enter your company name"
                className="w-full px-4 py-2 border rounded-md focus:outline-blue-500"
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Phone Number</label>
              <div className="flex items-center border rounded-md">
                <Select
                  options={countryCodes.map((country) => ({ value: country.code, label: country.code }))}
                  defaultValue={{ value: selectedCountry.code, label: selectedCountry.code }}
                  onChange={(selectedOption: any) => setSelectedCountry(countryCodes.find(c => c.code === selectedOption.value) || selectedCountry)}
                  className="w-28"
                />
                <input
                  type="text"
                  placeholder="Enter company phone number"
                  className="w-full px-2 py-2 focus:outline-none"
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:outline-blue-500"
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="border p-3 w-full rounded-md"
                  onChange={(e) => handleInputChange("password", e.target.value)}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPageDark;