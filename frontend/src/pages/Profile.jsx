import React from "react";
import MyOrders from "./MyOrdersPage";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="min-h-screen">
     

      {/* Content */}
      <div className="container mx-auto p-2 flex flex-col md:flex-row gap-3">
        {/* Left Sidebar (Admin Info) */}
        <aside className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <img
            src="https://picsum.photos/150" 
            alt="Admin Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800">Mohsin Ali</h2>
          <p className="text-gray-600">mohsin@gmail.com</p>

          <button className="mt-6 w-full">
            <Link to="/login" className="w-full font-semibold bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
            Logout!
          </Link>
           
          </button>
        </aside>

        {/* Right Section (Orders / Main Content) */}
        <main className="w-full md:w-2/3 lg:w-3/4 bg-white  p-6">
          <MyOrders />
        </main>
      </div>
    </div>
  );
};

export default Profile;
