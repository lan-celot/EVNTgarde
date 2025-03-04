import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/OrganizerLogo.png";
import "../Main Page/RegistrationLogin.css";
import { registerUser, checkIfUserExists } from "../../../functions/authFunctions";

const SoloRegistration: React.FC = () => {
  const navigate = useNavigate();

  // State for Step 1
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);

  // State for Step 2
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName) {
      alert("First and last name are required");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    setIsLoading(true);
    try {
      const userExists = await checkIfUserExists(email);
      if (userExists) {
        setError("This email is already registered.");
        setIsLoading(false);
        return;
      }
  
      await registerUser(email, password, "customer", { firstName, lastName, phoneNumber });
  
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex h-screen items-center justify-center bg-gray-300 font-[Poppins] p-4">
      <div className="flex w-[1440px] h-[650px] bg-blue-600 rounded-xl shadow-lg overflow-hidden font-poppins">
        <div className="w-2/5 bg-blue-600 text-white flex flex-col items-center justify-center text-center p-8">
          <img src={Logo} className="max-w-xs mb-4" alt="Logo" />
          <p className="text-lg font-medium mb-2">Discover tailored events services.</p>
          <p className="text-lg font-medium mb-2">Sign up for personalized services today!</p>
        </div>

        <div className="w-3/5 bg-white p-12 flex flex-col justify-center rounded-l-[50px] shadow-md">
          {step === 1 ? (
            <form className="space-y-6" onSubmit={handleProceed}>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Sign Up</h2>
              <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full px-4 py-2 border rounded-md" />
              <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full px-4 py-2 border rounded-md" />
              <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
              <button type="submit" className="bg-blue-600 text-white px-10 py-4 rounded-full w-full">Proceed</button>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Create Account</h2>
              {error && <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 border rounded-md" />
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 border rounded-md" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
              </div>
              <div className="relative">
                <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full px-4 py-2 border rounded-md" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-10 py-5 rounded-full w-full" disabled={isLoading}>{isLoading ? "Creating Account..." : "Create Account"}</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoloRegistration;