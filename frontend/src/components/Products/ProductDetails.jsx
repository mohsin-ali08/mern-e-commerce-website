import React, { useState } from "react";
import { toast } from "sonner";
import ProductGird from "./ProductGrid";

const ProductDetails = () => {
  const selectedProduct = {
    name: "Elegant Evening Gown",
    price: 250,
    originalPrice: 300,
    description:
      "An exquisite evening gown perfect for formal occasions, crafted from luxurious silk and adorned with delicate beadwork.",
    brand: "Glamour Couture",
    material: "100% Silk with Bead Embellishments",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["green", "Black", "Maroon"],

    images: [
      { url: "https://picsum.photos/400/500?random=11", altText: "Front" },
      { url: "https://picsum.photos/400/500?random=12", altText: "Back" },
      { url: "https://picsum.photos/400/500?random=13", altText: "Side" },
      { url: "https://picsum.photos/400/500?random=14", altText: "Detail" },
    ],
  };

    const similarProducts = [   
    { _id: 1, name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/400/500?random=1", altText: "Stylish Jacket" }] },
    { _id: 2, name: "Casual Hoodie", price: 100, images: [{ url: "https://picsum.photos/400/500?random=2", altText: "Casual Hoodie" }] },
    { _id: 3, name: "Trendy Sneakers", price: 150, images: [{ url: "https://picsum.photos/400/500?random=3", altText: "Trendy Sneakers" }] },
    { _id: 4, name: "Denim Jeans", price: 90, images: [{ url: "https://picsum.photos/400/500?random=4", altText: "Denim Jeans" }] },
    ];

  const [mainImage, setMainImage] = useState(selectedProduct.images[0].url);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color before adding to cart.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(
        `${selectedProduct.name} added to cart (Size: ${selectedSize}, Color: ${selectedColor}, Qty: ${quantity})`
      );
    }, 2000);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-6xl mx-auto bg-white p-4 sm:p-8 rounded-lg">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Thumbnails */}
          <div className="flex md:flex-col md:space-y-4 md:mr-6 gap-3 overflow-x-auto p-2 md:pb-0">
            {selectedProduct.images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.altText}
                className={`w-20 h-20 shadow-md object-cover hover:scale-105  duration-300 cursor-pointer border rounded-lg flex-shrink-0 transition 
                  ${
                    mainImage === img.url
                      ? "border-2 border-gray-500"
                      : "border-gray-200"
                  }`}
                onClick={() => setMainImage(img.url)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="md:w-1/2">
            <div className="mb-4 ">
              <img
                src={mainImage}
                alt={selectedProduct.name}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">{selectedProduct.name}</h1>
            <div className="flex items-center gap-4">
              <p className="text-xl font-semibold text-red-600">
                ${selectedProduct.price}
              </p>
              <p className="line-through text-gray-400">
                ${selectedProduct.originalPrice}
              </p>
            </div>
            <p className="text-gray-600">{selectedProduct.description}</p>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-2">Color:</h3>
              <div className="flex gap-3">
                {selectedProduct.color.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-4 border-gray-700"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => setSelectedColor(color)}
                  ></button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-2">Size:</h3>
              <div className="flex gap-3 flex-wrap">
                {selectedProduct.size.map((sz, idx) => (
                  <button
                    onClick={() => setSelectedSize(sz)}
                    key={idx}
                    className={`px-4 py-2 text-sm border rounded-lg cursor-pointer ${
                      selectedSize === sz ? "bg-black text-white" : ""
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-2">Quantity:</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className={`mt-2 px-6 py-3 rounded-lg text-white transition ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {loading ? "Adding..." : "Add to Cart"}
            </button>

            {/* Characteristics */}
            <div className="text-gray-700">
              <h3 className="text-xl font-bold mb-2">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-500">
                <tbody>
                  <tr>
                    <td className="pr-4">Brand</td>
                    <td>{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="pr-4">Material</td>
                    <td>{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-10  ">
            <h2 className="text-2xl text-center font-bold mb-6 ">You May Also Like!</h2>
            

              <ProductGird products={similarProducts} />
            
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
