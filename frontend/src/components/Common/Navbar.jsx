import { useState } from "react";
import {
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineMenu,
  HiOutlineX,
} from "react-icons/hi";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <nav className="bg-white top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-3">
          {/* Left - Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold cursor-pointer text-red-600 tracking-wide"
          >
            Rabbit 🛍️
          </Link>

          {/* Center - Nav Links (desktop only) */}
          <div className="hidden md:flex gap-8 text-gray-700 font-medium text-sm">
            {[
              { name: "MEN", path: "/collection/all" },
              { name: "WOMEN", path: "/collection/women" },
              { name: "TOP WEAR", path: "/collection/top-wear" },
              { name: "BOTTOM WEAR", path: "/collection/bottom-wear" },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative group"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Right - Icons */}
          <div className="flex items-center gap-4 text-gray-700">
            <Link
              to="/admin"
              className="block bg-black px-2 rounded text-sm text-white"
            >
              Admin
            </Link>
            <Link to="/profile">
              <HiOutlineUser className="cursor-pointer hover:text-red-600 transition text-2xl" />
            </Link>

            {/* Cart with Badge */}
            <button
              onClick={toggleCartDrawer}
              className="relative cursor-pointer p-2 rounded-full hover:bg-red-50 transition"
            >
              <HiOutlineShoppingBag className="text-2xl hover:text-red-600 transition" />
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                3
              </span>
            </button>

            {/* SearchBar */}
            <SearchBar />

            {/* Hamburger Menu (mobile only) */}
            <div className="md:hidden">
              {isOpen ? (
                <HiOutlineX
                  onClick={() => setIsOpen(false)}
                  className="text-3xl cursor-pointer hover:text-red-600 transition"
                />
              ) : (
                <HiOutlineMenu
                  onClick={() => setIsOpen(true)}
                  className="text-3xl cursor-pointer hover:text-red-600 transition"
                />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Side Drawer for Mobile */}
      <div
        className={`fixed inset-0 z-40 transition ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        {/* Background Blur */}
        <div
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Drawer */}
        <div
          className={`absolute top-0 left-0 h-full w-72 bg-white shadow transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-bold text-red-600">Rabbit</h2>
            <HiOutlineX
              onClick={() => setIsOpen(false)}
              className="text-2xl cursor-pointer hover:text-red-600 transition"
            />
          </div>

          <div className="flex flex-col gap-6 p-6 text-gray-700 font-medium">
            {[
              { name: "MEN", path: "/collection/all" },
              { name: "WOMEN", path: "/collection/women" },
              { name: "TOP WEAR", path: "/collection/top-wear" },
              { name: "BOTTOM WEAR", path: "/collection/bottom-wear" },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="hover:text-red-600 border-b pb-2 transition"
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Icons inside drawer */}
            <div className="flex gap-6 mt-2 items-center">
              <HiOutlineUser className="cursor-pointer hover:text-red-600 transition text-2xl" />
              <div
                className="relative cursor-pointer"
                onClick={toggleCartDrawer}
              >
                <HiOutlineShoppingBag className="text-2xl hover:text-red-600 transition" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  3
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
    </>
  );
}
