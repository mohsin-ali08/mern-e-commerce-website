

const checkout = {
  _id: "12345",
  createdAt: new Date(),
  CheckOutItems: [
    {
      productId: "1",
      name: "Jacket",
      color: "Black",
      size: "M",
      price: 130,
      quantity: 1,
      image: "https://picsum.photos/145?random=1",
    },
    {
      productId: "2",
      name: "T-shirt",
      color: "White",
      size: "M",
      price: 105,
      quantity: 1,
      image: "https://picsum.photos/145?random=2",
    },
  ],
  shippingAddress: {
    address: "123 Fashion Street",
    city: "Karachi",
    country: "Pakistan",
  },
  paymentMethod: "Stripe",
  deliveryMethod: "Standard Delivery (3-5 business days)",
};

export const OrderConfirmationPage = () => {
  // Estimate delivery (example: 5 days later)
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-6">
        Thank You For Your Order!
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Your order has been placed successfully. You will receive a confirmation
        email shortly.
      </p>

      {/* Order Info */}
      {checkout && (
        <div className="space-y-8">
          {/* Order Details */}
          <div className="border-b pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Order Details
            </h2>
            <div className="flex justify-between text-gray-600">
              <div>
                <p>
                  <span className="font-medium">Order ID:</span> {checkout._id}
                </p>
                <p>
                  <span className="font-medium">Order Date:</span>{" "}
                  {new Date(checkout.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-medium">Estimated Delivery:</span>{" "}
                  {estimatedDelivery.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="border-b pb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Items Ordered
            </h2>
            <div className="space-y-4">
              {checkout.CheckOutItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center bg-gray-50 justify-between border rounded-lg p-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-gray-500 text-sm">
                        Color: {item.color} | Size: {item.size}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800">${item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Delivery Info */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Payment & Delivery Info
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-2">
                  Shipping Address
                </h3>
                <p>{checkout.shippingAddress.address}</p>
                <p>
                  {checkout.shippingAddress.city},{" "}
                  {checkout.shippingAddress.country}
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-2">
                  Payment & Delivery
                </h3>
                <p>
                  <span className="font-medium">Payment Method:</span>{" "}
                  {checkout.paymentMethod}
                </p>
                <p>
                  <span className="font-medium">Delivery Method:</span>{" "}
                  {checkout.deliveryMethod}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage ;