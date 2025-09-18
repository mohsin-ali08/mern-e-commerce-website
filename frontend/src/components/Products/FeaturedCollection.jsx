import React from "react";
import { Link } from "react-router-dom";
import Featured from "../../assets/featured.webp";
const FeaturedCollection = () => {
  return (
    <section className="py-12 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center bg-green-50 overflow-hidden">
        
        {/* Left Content */}
        <div className="flex-1 p-8 md:p-12 text-center md:text-left ">
            <h1 className="text-lg font-semibold text-gray-700 mb-2">Comfort and Style</h1>
          <h2 className="text-3xl md:text-4xl lg:text-left font-bold mb-4">
            Apparel made for your everyday life
          </h2>
          <p className="text-lg text-gray-600 mb-8 text-justify">
            Discover high-quality, stylish and comfortable apparel designed to fit your everyday lifestyle. From casual wear to work attire, our collection offers versatile pieces that combine fashion and function. 
          </p>
          <Link to="/collections/all" className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-200 hover:text-black hover:border border-black hover:font-bold transition">
            Shop Now
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <img
            src={Featured}
            alt="Featured Collection"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
