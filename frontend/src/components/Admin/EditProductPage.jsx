import React, { useState } from "react";
import { toast } from "sonner";

const EditProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: "",
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    materials: "",
    gender: "",
    images: [
      { url: "https://picsum.photos/150?random=1" },
      { url: "https://picsum.photos/150?random=2" },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImage = { url: URL.createObjectURL(file) };
    setProductData((prevData) => ({
      ...prevData,
      images: [...prevData.images, newImage],
    }));
    toast.success("Image uploaded successfully!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productData.name || !productData.description) {
      toast.error("Please fill in all required fields!");
      return;
    }
    console.log("Product Updated:", productData);
    toast.success("✅ Product updated successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 shadow rounded-lg bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Product!</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Product Name:
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full border outline-none border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="w-full border outline-none border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        {/* Price + Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full outline-none border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Count in Stock
            </label>
            <input
              type="number"
              name="countInStock"
              value={productData.countInStock}
              onChange={handleChange}
              className="w-full outline-none border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* SKU, Category, Brand */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">SKU</label>
            <input
              type="text"
              name="sku"
              value={productData.sku}
              onChange={handleChange}
              placeholder="Unique SKU"
              className="w-full outline-none border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              placeholder="Product category"
              className="w-full outline-none border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Brand</label>
            <input
              type="text"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              placeholder="Brand name"
              className="w-full outline-none border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Sizes + Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Sizes (comma-separated)
            </label>
            <input
              type="text"
              value={productData.sizes.join(", ")}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  sizes: e.target.value
                    .split(",")
                    .map((size) => size.trim())
                    
                })
              }
              placeholder="e.g. S, M, L, XL"
              className="w-full outline-none border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Colors (comma-separated)
            </label>
            <input
              type="text"
              value={productData.colors.join(", ")}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  colors: e.target.value
                    .split(",")
                    .map((color) => color.trim())
                    
                })
              }
              placeholder="e.g. Red, Blue, Black"
              className="w-full outline-none border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Collection + Materials + Gender */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Collection
            </label>
            <input
              type="text"
              name="collections"
              value={productData.collections}
              onChange={handleChange}
              className="w-full outline-none border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Materials
            </label>
            <input
              type="text"
              name="materials"
              value={productData.materials}
              onChange={handleChange}
              className="w-full outline-none border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Gender
            </label>
            <input
              type="text"
              name="gender"
              value={productData.gender}
              onChange={handleChange}
              className="w-full outline-none border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div> */}

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Product Images
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full outline-none text-sm text-gray-500 file:mr-4 file:py-2 
              file:px-4 file:rounded-md file:border-0 file:text-sm 
              file:font-semibold file:bg-blue-50 file:text-blue-600 
              hover:file:bg-blue-100"
          />

          {/* Preview */}
          <div className="flex gap-4 mt-4 flex-wrap">
            {productData.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={`Product ${index}`}
                  className="w-24 h-24 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 w-full outline-none bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition"
        >
          Save Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
