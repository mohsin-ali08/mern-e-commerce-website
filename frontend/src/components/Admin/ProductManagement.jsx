import React from "react";
import { Link } from "react-router-dom";
import { message, Popconfirm } from "antd";
import { toast } from "sonner";
import { MdOutlineInventory2 } from "react-icons/md";

export const ProductManagement = () => {
  const products = [
    {
      _id: 123456,
      name: "T-shirt",
      price: 120,
      sku: "12345678",
    },
  ];

  const handleDelete = (id) => {
    // Simulate delete
    toast.success("Product deleted successfully!");
    message.success(`Deleted product with ID: ${id}`);
    console.log("Delete product with ID:", id);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Page Heading */}
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>

      {/* Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-700 bg-white">
          <thead className="bg-gray-100 uppercase text-xs text-gray-600">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.sku}</td>
                  <td className="p-4 flex justify-center space-x-3">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                    >
                      Edit
                    </Link>

                    <Popconfirm
                      title="Are you sure you want to delete this product?"
                      onConfirm={() => handleDelete(product._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                        Delete
                      </button>
                    </Popconfirm>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-gray-500 flex flex-col items-center justify-center"
                >
                  <MdOutlineInventory2 size={40} className="text-gray-400 mb-2" />
                  <span className="text-sm">No products found!</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
