import { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Scroll handler
  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth : clientWidth,
      behavior: "smooth",
    });
  };

  // Update button states on scroll
  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2); // small buffer
  };

  // Attach listener
  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    updateScrollButtons();
    slider.addEventListener("scroll", updateScrollButtons);

    return () => slider.removeEventListener("scroll", updateScrollButtons);
  }, []);

  const products = [
    { _id: 1, name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/400/500?random=1", altText: "Stylish Jacket" }] },
    { _id: 2, name: "Casual Hoodie", price: 100, images: [{ url: "https://picsum.photos/400/500?random=2", altText: "Casual Hoodie" }] },
    { _id: 3, name: "Trendy Sneakers", price: 150, images: [{ url: "https://picsum.photos/400/500?random=3", altText: "Trendy Sneakers" }] },
    { _id: 4, name: "Denim Jeans", price: 90, images: [{ url: "https://picsum.photos/400/500?random=4", altText: "Denim Jeans" }] },
    { _id: 5, name: "Classic Watch", price: 200, images: [{ url: "https://picsum.photos/400/500?random=5", altText: "Classic Watch" }] },
    { _id: 6, name: "Leather Bag", price: 180, images: [{ url: "https://picsum.photos/400/500?random=6", altText: "Leather Bag" }] },
    { _id: 7, name: "Summer Dress", price: 130, images: [{ url: "https://picsum.photos/400/500?random=7", altText: "Summer Dress" }] },
  ];

  return (
    <section className="relative py-10">
      <div className="container mx-auto text-center mb-6 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals!</h2>
        <p className="text-lg text-gray-600">
          Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* Buttons (old UI position, right side) */}
        <div className="flex justify-end space-x-2 md:px-6 px-3">
          <button
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded transition ${
              !canScrollLeft ? "opacity-40  cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            <FiChevronLeft className="w-8 h-8 p-1 bg-white border text-gray-600 rounded" />
          </button>

          <button
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded transition ${
              !canScrollRight ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            <FiChevronRight className="w-8 h-8 p-1 bg-white border text-gray-600 rounded" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className="container mx-auto flex space-x-6 overflow-x-hidden scroll-smooth px-4"
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="relative min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] shadow-lg overflow-hidden group"
          >
            <img
              src={product.images[0].url}
              alt={product.images[0].altText}
              className="w-full h-80 object-cover transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
