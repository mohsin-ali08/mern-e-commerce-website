import { useState } from "react";
import { FaPlus, FaMinus, FaTrash, FaShoppingCart } from "react-icons/fa";

export default function CartContent() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Product 1",
      image: "https://picsum.photos/200?random=1",
      price: 20,
      color: "Red",
      size: "M",
      quantity: 1,
    },
    {
      id: 2,
      name: "Product 2",
      image: "https://picsum.photos/200?random=2",
      price: 35,
      color: "Blue",
      size: "L",
      quantity: 1,
    },
    {
      id: 2,
      name: "Product 2",
      image: "https://picsum.photos/200?random=2",
      price: 35,
      color: "Blue",
      size: "L",
      quantity: 1,
    },
  ]);

  const increment = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full  text-gray-500">
          <FaShoppingCart className="text-4xl mb-3" />
          <p className="text-lg font-medium">Your cart is empty</p>
        </div>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 px-2 py-3 rounded-md
                       bg-gray-50 shadow  
                       "
          >
            {/* Product Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded-md object-cover border border-gray-200"
            />

            {/* Product Info */}
            <div className="flex-1">
              <h3 className="font-semibold text-sm pb-2 text-gray-800">{item.name}</h3>
              <p className="text-gray-500 text-xs ">
                Color: <span className="font-medium">{item.color}</span> | Size:{" "}
                <span className="font-medium">{item.size}</span>
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-1 mt-2">
                <button
                  onClick={() => decrement(item.id)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 shadow-sm transition"
                >
                  <FaMinus className="text-gray-600 text-xs" />
                </button>
                <span className="font-semibold text-gray-800 min-w-[24px] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => increment(item.id)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 shadow-sm transition"
                >
                  <FaPlus className="text-gray-600 text-xs" />
                </button>
              </div>
            </div>

            {/* Price + Delete */}
            <div className="flex flex-col items-end gap-3">
              <p className="text-lg font-bold text-green-600">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeItem(item.id)}
                className="text-gray-400 hover:text-red-600 transition"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
