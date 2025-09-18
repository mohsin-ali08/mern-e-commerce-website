import React from "react";
import { Link } from "react-router-dom";

export const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
      {products.map((product, index) => (
        <Link key={index} to={`/product/${product._id}`} className="block">
          <div className="bg-white ">
            <div className="w-full h-60 mb-4 rounded-lg overflow-hidden">
              <img
                src={product.images[0].url}
                alt={product.images[0].altText || product.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>
            <h3 className="text-md font-semibold">{product.name}</h3>
            <p className="text-gray-500 text-sm font-medium tracking-tighter">${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;