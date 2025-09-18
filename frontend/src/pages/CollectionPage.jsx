import React, { useRef, useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSideBar from "../components/Products/FilterSideBar";
import { SortOptions } from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      // ✅ only run on mobile
      if (window.innerWidth < 1024) {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Fake fetch products
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: "Stylish Jacket",
          price: 120,
          images: [
            {
              url: "https://picsum.photos/400/500?random=1",
              altText: "Stylish Jacket",
            },
          ],
        },
        {
          _id: 2,
          name: "Casual Hoodie",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/400/500?random=2",
              altText: "Casual Hoodie",
            },
          ],
        },
        {
          _id: 3,
          name: "Trendy Sneakers",
          price: 150,
          images: [
            {
              url: "https://picsum.photos/400/500?random=3",
              altText: "Trendy Sneakers",
            },
          ],
        },
        {
          _id: 4,
          name: "Denim Jeans",
          price: 90,
          images: [
            {
              url: "https://picsum.photos/400/500?random=4",
              altText: "Denim Jeans",
            },
          ],
        },
        {
          _id: 5,
          name: "Classic Watch",
          price: 200,
          images: [
            {
              url: "https://picsum.photos/400/500?random=5",
              altText: "Classic Watch",
            },
          ],
        },
        {
          _id: 6,
          name: "Leather Bag",
          price: 180,
          images: [
            {
              url: "https://picsum.photos/400/500?random=6",
              altText: "Leather Bag",
            },
          ],
        },
        {
          _id: 7,
          name: "Summer Dress",
          price: 130,
          images: [
            {
              url: "https://picsum.photos/400/500?random=7",
              altText: "Summer Dress",
            },
          ],
        },
        {
          _id: 8,
          name: "Formal Shirt",
          price: 110,
          images: [
            {
              url: "https://picsum.photos/400/500?random=8",
              altText: "Formal Shirt",
            },
          ],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filter
      </button>

      {/* Sidebar */}
<div
  ref={sidebarRef}
  className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
     fixed inset-y-0 z-30 left-0 w-64 bg-white transition-transform duration-300 
     lg:static lg:translate-x-0 shadow-lg lg:shadow-none overflow-y-auto scrollbar-hide`}
>
  <FilterSideBar />
</div>


      {/* Main content */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl md:text-start text-center uppercase md:pl-4">All Collection!</h2>
        <SortOptions />
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
