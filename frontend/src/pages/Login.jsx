import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Label from "../components/Label";
import Input from "../components/Input/InputField";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

import { login } from "../services/auth";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/apps");
    } catch (err) {
      setMessage("Email atau password salah");
    }
  };

  return (
    <div className="flex md:justify-center md:items-center min-h-screen">
      <div className="w-full max-w-lg mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-2xl dark:bg-gray-800 transition-all duration-300">
        <div className="flex justify-center m-2">
          <img src={logo} alt="PT Permata Bukit Hijau" className="w-24 h-15" />
        </div>
        <div>
          <div className="mb-6 sm:mb-8">
            <h2 className="mt-3 mb-2 text-2xl sm:text-2xl font-bold text-gray-800 dark:text-white text-center">
              Sign In
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Enter your email and password to sign in.
            </p>
          </div>

          {message && <div className="mb-2 text-red-500">{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label htmlFor="email">
                  Email<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="password">
                  Password<span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <MdVisibilityOff size={24} />
                    ) : (
                      <MdVisibility size={24} />
                    )}
                  </span>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-white transition rounded-lg shadow-lg bg-[#216eec]  hover:bg-[#1654b7]"
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400">
              Don't have an account? {""}
              <Link
                to="/signup"
                className="font-medium text-[#2c76ec] hover:text-[#195dc9]"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
