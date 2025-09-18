import React, { useState } from "react";
import loginImg from "../assets/login.webp"; // adjust path if needed
import { Link } from "react-router-dom";
import {  toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields."  );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // You can replace this with API call
    toast.success("Account created successfully!");
   setTimeout(() => {
      navigate("/login"); 
    }, 500); 
    
    // setName("");
    // setEmail("");
    // setPassword("");
    // setConfirmPassword("");

    console.log("Registering with:", { name, email, password, confirmPassword }); 
  };

  return (
    <div className="flex md:h-screen">
      {/* Toaster */}
      {/* <Toaster position="top-center" richColors /> */}

      {/* Right Form Section */}
      <div className="flex py-10 w-full md:w-1/2 items-center justify-center bg-gray-50 px-8 sm:px-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-lg shadow-md px-8 "
        >
          <h2 className="text-3xl font-bold text-center my-3">Create Account</h2>
          <p className="text-center text-gray-600 mb-6">
            Join us and explore amazing features!
          </p>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-900 transition"
          >
            Sign Up
          </button>

          {/* Redirect to Login */}
          <p className="text-sm text-center my-4 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black font-semibold hover:text-blue-600 hover:underline"
            >
              Login!
            </Link>
          </p>
        </form>
      </div>

      {/* Left Image Section */}
      <div className="hidden md:flex w-1/2">
        <img
          src={loginImg}
          alt="Register"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
