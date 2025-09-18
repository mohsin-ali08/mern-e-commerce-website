import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { FaBoxOpen, FaClipboardList, FaStore, FaUser } from "react-icons/fa6";
import { Link, NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = ({ closeSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    closeSidebar();
    navigate("/");
  };

  const links = [
    { to: "/admin/users", label: "Users", icon: <FaUser /> },
    { to: "/admin/products", label: "Products", icon: <FaBoxOpen /> },
    { to: "/admin/orders", label: "Orders", icon: <FaClipboardList /> },
    { to: "/", label: "Shop", icon: <FaStore /> },
  ];

  return (
    <div className="min-h-screen w-64 bg-gray-900 md:pt-10  p-6 flex flex-col shadow-lg">
      <div className="mb-6 ">
        <Link
          to="/admin"
          onClick={closeSidebar}
          className="text-2xl text-white font-bold"
        >
          Rabbit 
        </Link>
      </div>

        <h2 className="text-gray-200 text-xl font-medium border-b pb-2">Admin dashboard</h2>
      {/* Navigation */}
      <nav className="flex flex-col  md:justify-center md:pt-2 pt-10 space-y-4 flex-1">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center border-b gap-2 py-3 px-4 transition-all ${
                isActive
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg shadow-md transition"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
