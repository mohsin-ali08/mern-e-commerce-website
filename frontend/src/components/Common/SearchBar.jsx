import { useState } from "react";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search Term:", searchTerm);
    setIsOpen(false);
    setSearchTerm(""); // optional: clear input after search
  };

  return (
    <div
      className={`flex items-center justify-center transition-all duration-300 ${
        isOpen
          ? "absolute top-0 left-0 w-full bg-white h-20 z-50"
          : "w-auto"
      }`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-center w-full px-4"
        >
          <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl">
            {/* Search Icon inside input */}
            <HiMagnifyingGlass className="absolute left-3 top-2.5 text-gray-500 text-xl" />
            
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 shadow pl-10 pr-10 py-2 w-full rounded-full placeholder:text-gray-600 focus:outline-none"
            />
            
            {/* Close button */}
            <HiXMark
              onClick={handleSearchToggle}
              className="absolute right-3 top-2.5 text-2xl text-gray-500 cursor-pointer hover:text-red-600 transition"
            />
          </div>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="h-5 w-5 text-gray-700 hover:text-red-600 transition" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
