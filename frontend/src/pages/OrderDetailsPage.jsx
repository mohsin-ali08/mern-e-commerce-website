import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const mockOrderDetails = {
      _id: id,
      createdAt: new Date(),
      isPaid: true,
      isDelivered: false,
      paymentMethod: "Stripe",
      shippingMethod: "Standard",
      shippingAddress: { city: "Karachi", country: "Pakistan" },
      orderItems: [
        {
          productId: "1",
          name: "Jacket",
          price: 120,
          quantity: 1,
          image: "https://picsum.photos/150?random=1",
        },
        {
          productId: "2",
          name: "T-shirt",
          price: 100,
          quantity: 2,
          image: "https://picsum.photos/150?random=2",
        },
      ],
    };
    setOrderDetails(mockOrderDetails);
  }, [id]);

  if (!orderDetails) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <p className="text-gray-500">No Order Details Found</p>
          <Link
            to="/my-orders"
            className="mt-4 inline-block text-blue-600 font-medium hover:underline"
          >
            Back to My Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-5xl bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          Order Details
        </h2>

        {/* Order Info */}
        <div className="flex flex-col sm:flex-row justify-between mb-8 pb-6 border-b">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">
              Order ID:{" "}
              <span className="text-gray-700">{orderDetails._id}</span>
            </h3>
            <p className="text-gray-500">
              {new Date(orderDetails.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right space-y-2">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                orderDetails.isPaid
                  ? "text-green-600 bg-green-100"
                  : "text-red-600 bg-red-100"
              }`}
            >
              {orderDetails.isPaid ? "Approved" : "Pending"}
            </span>
            <br />
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                orderDetails.isDelivered
                  ? "text-green-600 bg-green-100"
                  : "text-yellow-600 bg-yellow-100"
              }`}
            >
              {orderDetails.isDelivered ? "Delivered" : "Pending Delivery"}
            </span>
          </div>
        </div>

        {/* Payment & Shipping */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="p-4 rounded-lg border bg-gray-50 shadow-sm">
            <h4 className="font-bold mb-2 text-gray-800">Payment Info</h4>
            <p className="text-gray-600">
              Payment Method: {orderDetails.paymentMethod}
            </p>
            <p className="text-gray-600">
              Status: {orderDetails.isPaid ? "Paid ✅" : "Unpaid ❌"}
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-gray-50 shadow-sm">
            <h4 className="font-bold mb-2 text-gray-800">Shipping Info</h4>
            <p className="text-gray-600">
              Shipping Method: {orderDetails.shippingMethod}
            </p>
            <p className="text-gray-600">
              Address: {orderDetails.shippingAddress.city},{" "}
              {orderDetails.shippingAddress.country}
            </p>
          </div>
        </div>

        {/* Product List */}
        <div className="overflow-x-auto">
          <h4 className="text-lg mb-4 font-semibold text-gray-800">Products</h4>
          <table className="min-w-full text-gray-700 text-center border rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Product</th>
                <th className="py-3 px-4">Unit Price</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.orderItems.map((item) => (
                <tr
                  key={item.productId}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="flex items-center gap-4 py-3 px-4 text-left">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-md object-cover border"
                    />
                    <Link
                      to={`/product/${item.productId}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="py-3 px-4">${item.price}</td>
                  <td className="py-3 px-4">{item.quantity}</td>
                  <td className="py-3 px-4 font-semibold">
                    ${item.price * item.quantity}
                  </td>
                </tr>
              ))}

              {/* Total Row */}
              <tr className="bg-gray-50 font-bold">
                <td colSpan="3" className="py-3 px-4 text-right">
                  Grand Total
                </td>
                <td className="py-3 px-4 text-green-600 text-lg">
                  $
                  {orderDetails.orderItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Back to Orders */}
        <div className="mt-6 text-center">
          <Link
            to="/my-orders"
            className="inline-block text-blue-600 hover:underline font-medium"
          >
            ← Back to My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
