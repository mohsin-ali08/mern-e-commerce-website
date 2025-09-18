import React, { useState } from "react";
import loginImage from "../assets/login.webp";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Error handling
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    // Simulate login success
    toast.success("Login successful 🎉");
    // console.log("Logging in with:", { email, password });

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex md:h-screen">
      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8 md:p-12 bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-lg border shadow-lg p-8"
        >
          <div className="flex justify-center ">
            <h2 className="text-md font-medium">Rabbit!</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">Hey there! 👋</h2>
          <p className="text-center mb-6 text-gray-600">
            Enter your email and password to login
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border bg-gray-50 rounded-lg focus:outline-none "
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none "
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </button>

          {/* Signup Link */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-black font-semibold hover:underline hover:text-blue-600 cursor-pointer"
            >
              Register!
            </Link>
          </p>
        </form>
      </div>

      {/* Left Side Image */}
      <div className="hidden md:flex w-1/2">
        <img
          src={loginImage}
          alt="Login"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
