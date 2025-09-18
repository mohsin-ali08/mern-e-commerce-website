import { FiX } from "react-icons/fi";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  // Example items (later replace with props or global state)
  const cartItems = [
    { name: "Product 1", qty: 1, price: 20 },
    { name: "Product 2", qty: 2, price: 35 },
    { name: "Product 3", qty: 1, price: 50 },
  ];

  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCartDrawer(); // drawer close
    navigate("/checkout"); // navigate
  };

  return (
    <div>
      {/* Overlay */}
      {drawerOpen && (
        <div
          onClick={toggleCartDrawer}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-80 sm:w-96 h-full bg-white shadow-2xl transform transition-transform duration-300 z-50 flex flex-col rounded-l-2xl
        ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b bg-gray-50 rounded-tl-2xl">
          <h2 className="text-lg font-semibold tracking-wide">🛒 My Cart</h2>
          <button
            onClick={toggleCartDrawer}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <FiX className="text-2xl text-gray-700" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <CartContent items={cartItems} />
        </div>

        {/* Footer */}
        <div className="p-5 border-t bg-gray-50 rounded-bl-2xl">
          <button
            onClick={handleCheckout}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-medium tracking-wide shadow-md transition"
          >
            Proceed to Checkout
          </button>
          <p className="text-sm text-gray-500 mt-3 text-center">
            Shipping, taxes, and discounts are calculated at checkout
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
