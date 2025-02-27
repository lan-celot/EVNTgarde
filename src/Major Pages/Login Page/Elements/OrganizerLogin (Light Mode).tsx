import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import Logo from "../assets/OrganizerLogo.png";
import "../RegistrationLogin.css";

//For Organizer

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex h-screen items-center justify-center bg-gray-300 font-[Poppins]">
      <div className="flex w-[1440px] h-[650px] bg-blue-600 rounded-xl shadow-lg overflow-hidden">
        <div className="w-2/5 bg-blue-600 text-white flex flex-col items-center justify-center text-center p-8">
          <img src={Logo} className="w-52 mb-6" alt="Logo" />
          <p>Discover tailored events services.</p>
          <p>Log in now to unlock your personalized experience!</p>
        </div>

        <div className="w-3/5 bg-white p-10 flex flex-col justify-center rounded-l-[50px] shadow-md">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Log In</h2>
          <form className="flex flex-col space-y-4">
            <label className="text-sm">Enter your company email*</label>
            <input
              type="email"
              placeholder="Email"
              className="border p-3 rounded-md"
              required
            />

            <label className="text-sm">Enter your password*</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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

            <div className="flex justify-between items-center text-sm">
              <a href="#" className="text-blue-600">
                Forgot password?
              </a>
            </div>

            <label className="flex items-center space-x-2 text-gray-500">
              <input type="checkbox" />
              <span>Keep me logged in</span>
            </label>

            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded-full font-bold hover:bg-blue-700"
            >
              {" "}
              Log in{" "}
            </button>

            <div className="text-center text-sm">
              Don't have an account?{" "}
              <a href="#" className="text-blue-600">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
