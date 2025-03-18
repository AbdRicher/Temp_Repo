import React, { useState } from "react";
import axios from "axios";
import { ReactTyped } from "react-typed";
import { useNavigate } from "react-router-dom";
import {Footer,LogoText} from "./resuablecode"

const Login = () => {
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/auth/login", formdata);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      alert(`Error: ${err.response?.data?.message || "Something went wrong!"}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Logo */}
        <div className="absolute top-4 left-4 flex items-center gap-3">
          <img src="/Finovalogo.png" alt="Logo" className="w-10 h-auto md:w-12" />
          <div>
           <LogoText/>
          </div>
        </div>

        {/* Left Blue Side (Hidden on Mobile) */}
        <div
          className="hidden md:flex flex-1 bg-blue-700 text-white px-12 text-center 
          bg-cover bg-center items-center justify-center"
          style={{
            backgroundImage: "url('/bg-login.jpg')",
          }}
        >
          <div>
            <div className="text-xl font-bold">
              Your financial future is{" "}
              <ReactTyped
                strings={[
                  "Secure.",
                  "in your hands.",
                  "built with smart decisions.",
                  "just a plan away.",
                ]}
                typeSpeed={50}
                backSpeed={50}
                loop
                className="text-yellow-300"
              />
            </div>
            <p className="text-lg font-medium tracking-wide max-w-lg mt-4">
              Take control of your finances with Finova. Track your expenses, set
              savings goals, and make smarter financial decisions—all in one place.
            </p>
          </div>
        </div>

        {/* Right White Side */}
        <div className="flex-1 flex flex-col items-center justify-center bg-white p-8 mt-10 md:mt-0">
          <h2 className="text-3xl text-blue-800 font-semibold">Login Account</h2>
          <p className="text-gray-500 mt-2">Please enter your credentials to log in.</p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="w-4/5 max-w-md mt-6 space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              className="w-full p-3 bg-transparent border border-gray-300 rounded-md"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 bg-transparent border border-gray-300 rounded-md"
              onChange={handleChange}
              required
            />

            <div className="flex items-center justify-between text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-5 h-5 cursor-pointer" />
                Keep me signed in
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button className="w-full bg-blue-700 text-white py-3 rounded-md font-semibold hover:bg-blue-900 transition">
              LOGIN
            </button>
          </form>
        </div>
      </div>

 {/* Footer */}
 <Footer/>
    </div>
  );
};

export default Login;
