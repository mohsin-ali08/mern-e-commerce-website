import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd"; 

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    
    setTimeout(() => {
      setOrders([
        {
          id: "ORD-1001",
          createdAt: new Date(),
          shippingAddress: {
            street: "123 Main St",
            city: "Karachi",
            country: "Pakistan",
          },
          orderItems: [
            {
              id: 1,
              img: "https://picsum.photos/80?random=1",
              name: "Product A",
              quantity: 2,
              price: 50,
            },
          ],
          status: "Completed",
        },
        {
          id: "ORD-1002",
          createdAt: new Date(),
          shippingAddress: {
            street: "45 Street Ave",
            city: "Lahore",
            country: "Pakistan",
          },
          orderItems: [
            {
              id: 3,
              img: "https://picsum.photos/80?random=3",
              name: "Product C",
              quantity: 3,
              price: 30,
            },
          ],
          status: "Pending",
        },
      ]);
      setLoading(false); 
    }, 1500);
  }, []);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="py-3 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-6">📦 My Orders</h2>

        {loading ? (
          // ✅ Ant Design Loader
          <div className="flex items-center justify-center min-h-[200px]">
            <Spin size="large" tip="Loading Orders..." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">Images</th>
                  <th className="px-4 py-2 border">Order ID</th>
                  <th className="px-4 py-2 border">Created</th>
                  <th className="px-4 py-2 border">Shipping</th>
                  <th className="px-4 py-2 border">Items</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {orders.map((order) => {
                  const total = order.orderItems.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                  );
                  return (
                    <tr
                      key={order.id}
                      onClick={() => handleRowClick(order.id)} // ✅ fixed orderId bug
                      className="border-b hover:bg-gray-50 transition cursor-pointer"
                    >
                      {/* Images */}
                      <td className="px-4 py-2 flex gap-2">
                        {order.orderItems.map((item) => (
                          <img
                            key={item.id}
                            src={item.img}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded border"
                          />
                        ))}
                      </td>

                      {/* Order ID */}
                      <td className="px-4 py-2 font-semibold">{order.id}</td>

                      {/* Created */}
                      <td className="px-4 py-2 text-gray-600">
                        {order.createdAt.toLocaleDateString()}
                      </td>

                      {/* Shipping */}
                      <td className="px-4 py-2 text-gray-600">
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.country}
                      </td>

                      {/* Items */}
                      <td className="px-4 py-2">
                        {order.orderItems.map((item) => (
                          <div key={item.id} className="text-xs text-gray-700">
                            {item.name} (x{item.quantity})
                          </div>
                        ))}
                      </td>

                      {/* Price */}
                      <td className="px-4 py-2 font-bold">${total}</td>

                      {/* Status */}
                      <td className="px-4 py-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
