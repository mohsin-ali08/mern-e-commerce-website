import React from "react";
import { HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";

const FeaturesSection = () => {
  return (
    <section>
      <div className="bg-white px-4 py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

          {/* Feature One */}
          <div className="flex flex-col items-center">
            <div className=" mb-4">
              <HiArrowPathRoundedSquare className="text-xl" />
            </div>
            <h4 className="mb-2 font-semibold text-lg">45 DAYS RETURN</h4>
            <p className="text-gray-600 text-sm tracking-tight">
              Money back guarantee
            </p>
          </div>

          {/* Feature Two */}
          <div className="flex flex-col items-center">
            <div className=" mb-4">
              <HiShoppingBag className="text-xl" />
            </div>
            <h4 className="mb-2 font-semibold text-lg">
              FREE INTERNATIONAL SHIPPING
            </h4>
            <p className="text-gray-600 text-sm tracking-tight">
              On all orders over $100.00
            </p>
          </div>
          {/* Feature Three */}
          <div className="flex flex-col items-center">
            <div className="  mb-4">
              <HiOutlineCreditCard className="text-xl" />
            </div>
            <h4 className="mb-2 font-semibold text-lg">SECURE CHECKOUT</h4>
            <p className="text-gray-600 text-sm tracking-tight">
              100% secure checkout process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
