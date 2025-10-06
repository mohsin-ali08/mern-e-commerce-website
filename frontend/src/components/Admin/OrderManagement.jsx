import React, { useState } from "react";
import { Select } from "antd";
import { toast } from "sonner";

const { Option } = Select;

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      _id: 13456,
      user: { name: "mohsin_ali" },
      totalPrice: 123,
      status: "Processing",
    },
  ]);

  const handleStatusChange = (orderId, status) => {
    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o._id === orderId ? { ...o, status } : o
      )
    );
    toast.success(`Order #${orderId} updated to ${status}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">
        Order Management
      </h2>
      <div className="overflow-x-auto shadow sm:rounded-lg">
        <table className="min-w-full text-left text-gray-600">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="p-4">{order.user.name}</td>
                  <td className="p-4">${order.totalPrice}</td>
                  <td className="p-4">
                    <Select
                      value={order.status}
                      style={{ width: 150 }}
                      onChange={(value) =>
                        handleStatusChange(order._id, value)
                      }
                    >
                      <Option value="Processing">Processing</Option>
                      <Option value="Shipped">Shipped</Option>
                      <Option value="Delivered">Delivered</Option>
                      <Option value="Cancelled">Cancelled</Option>
                    </Select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() =>
                        handleStatusChange(order._id, "Delivered")
                      }
                      className="bg-green-500 hover:bg-green-600 rounded text-white px-3 sm:px-4 py-2 text-sm transition"
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="p-4 text-center text-gray-500"
                >
                  No Orders Found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
