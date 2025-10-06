import { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Mobile Top Bar */}
      <div className="flex md:hidden p-4 bg-gray-900 text-white z-20 items-center">
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-xl font-medium">Admin Dashboard!</h1>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 min-h-screen shadow-md w-64  bg-gray-200 z-30 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300`}
      >
        <AdminSidebar closeSidebar={closeSidebar} />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-10 z-20 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-grow overflow-auto  p-6">
        <Outlet/>
      </div>
    </div>
  );
};

export default AdminLayout;
