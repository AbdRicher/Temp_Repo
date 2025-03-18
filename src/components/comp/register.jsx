import React, { useState } from "react";
import axios from "axios";
import { ReactTyped } from "react-typed";
import { useNavigate } from "react-router-dom";
import {Footer,LogoText} from "./resuablecode"

const Signup = () => {
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5001/auth/signup",
        formdata
      );
      navigate("/login");
    } catch (err) {
      console.error("Signup Error:", err);
      alert(`Error: ${err.response?.data?.message || "Something went wrong!"}`);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col md:flex-row">
      {/* Logo */}
      <span className="flex items-center gap-3 md:absolute md:top-4 md:left-4 md:z-10 w-full justify-center md:justify-start mt-4 md:mt-0">
        <img src="Finovalogo.png" alt="Logo" className="w-12 h-auto" />
        <div>
  <LogoText/>
</div>
      </span>

      {/* Left Blue Side (Hidden on Mobile) */}
      <div
        className="flex-1 hidden md:flex bg-blue-700 w-full h-full flex-col justify-center items-center bg-cover bg-center text-white px-12 text-center"
        style={{
          backgroundImage: "url('/bg-login.jpg')",
        }}
      >
        <div className="flex flex-wrap justify-center text-xl font-bold gap-3">
          <span>Your financial future is </span>
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
            className="text-yellow-400"
          />
        </div>
        <p className="text-lg font-medium tracking-wide max-w-lg mt-4">
          Take control of your finances with Finova. Track your expenses, set
          savings goals, and make smarter financial decisions—all in one place.
          Secure, simple, and designed to help you achieve financial freedom.
        </p>
      </div>

     {/* Right White Side */}
<div className="flex-1 flex flex-col items-center justify-center bg-white p-8 pb-16">
  {/* Heading */}
  <h2 className="text-2xl text-blue-800 font-bold">Create Account</h2>
  {/* Description */}
  <p className="text-gray-500 mt-2 text-sm">
    Please enter your details to create an account.
  </p>

  {/* Signup Form */}
  <form
    onSubmit={handleSubmit}
    className="flex flex-col w-4/5 max-w-md mt-6 space-y-4 flex-grow"
  >
    {/* Full Name Input */}
    <input
      type="text"
      name="fullname"
      placeholder="Full Name"
      className="w-full p-3 bg-transparent border border-black rounded-md text-sm"
      onChange={handleChange}
      required
    />

    {/* Email Input */}
    <input
      type="email"
      name="email"
      placeholder="Email ID"
      className="w-full p-3 bg-transparent border border-black rounded-md text-sm"
      onChange={handleChange}
      required
    />

    {/* Password Input */}
    <input
      type="password"
      name="password"
      placeholder="Password"
      className="w-full p-3 bg-transparent border border-black rounded-md text-sm"
      onChange={handleChange}
      required
    />

    {/* Confirm Password Input */}
    <input
      type="password"
      name="confirmpassword"
      placeholder="Confirm Password"
      className="w-full p-3 bg-transparent border border-black rounded-md text-sm"
      onChange={handleChange}
      required
    />

    {/* Checkbox for Terms & Conditions */}
    <div className="flex items-center gap-2 text-gray-600 text-sm">
      <input type="checkbox" id="terms" className="w-5 h-5 cursor-pointer" required />
      <label htmlFor="terms" className="cursor-pointer">
        I agree to Terms & Conditions
      </label>
    </div>

    {/* Signup Button */}
    <button className="w-full bg-blue-700 text-white py-3 rounded-md font-semibold text-sm hover:bg-blue-900 transition">
      SIGN UP
    </button>

    {/* Already have an account? */}
    <p className="text-center text-gray-600 mt-4 text-sm">
      Already a member?{" "}
      <a href="/login" className="text-blue-600 hover:underline">
        Login
      </a>
    </p>
  </form>
</div>

      {/* Footer */}
      <Footer />
     
    </div>
  );
};

export default Signup;
