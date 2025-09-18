import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "sonner";

const cart = {
  products: [
    { name: "Classic T-Shirt", size: "M", color: "Blue", price: 19.99, image: "https://picsum.photos/200/300?random=1" },
    { name: "Running Shoes", size: "42", color: "Black", price: 59.99, image: "https://picsum.photos/200/300?random=2" },
    { name: "Denim Jacket", size: "L", color: "Light Blue", price: 89.99, image: "https://picsum.photos/200/300?random=3" },
  ],
  totalPrice: 100,
};

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState(1); 
  const [demoMode] = useState(!import.meta.env.VITE_STRIPE_INTENT_ENDPOINT);

  const handlePayment = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!stripe || !elements) {
      setErrorMessage("Stripe.js not loaded yet.");
      return;
    }

    const cardEl = elements.getElement(CardElement);
    if (!cardEl) {
      setErrorMessage("Card element not found.");
      return;
    }

    setLoading(true);
    toast.loading("Processing your payment…", { id: "pay" });

    // Demo mode (no backend)
    if (demoMode) {
      try {
        const { error: pmError } = await stripe.createPaymentMethod({
          type: "card",
          card: cardEl,
        });
        if (pmError) {
          throw new Error(pmError.message);
        }

        await new Promise((res) => setTimeout(res, 1500));
        toast.success("Payment successful! ", { id: "pay" });
        navigate("/order-confirmation");
      } catch (err) {
        toast.error(err.message || "Payment failed.", { id: "pay" });
      } finally {
        setLoading(false);
      }
      return;
    }

    // Real flow (with backend)
    try {
      const endpoint = import.meta.env.VITE_STRIPE_INTENT_ENDPOINT;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cart.totalPrice }),
      });

      const data = await response.json();
      const clientSecret = data?.clientSecret || data?.client_secret;
      if (!clientSecret) throw new Error("No clientSecret returned.");

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardEl },
      });

      if (result.error) throw new Error(result.error.message);
      if (result.paymentIntent?.status === "succeeded") {
        toast.success("Payment successful! ", { id: "pay" });
        navigate("/order-confirmation");
      } else {
        throw new Error("Payment not completed.");
      }
    } catch (err) {
      toast.error(err.message || "Payment failed.", { id: "pay" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto py-10">
      {/* Left */}
      <div className="bg-white rounded-lg shadow-md p-8 border">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Checkout</h1>

        {/* Step 1: Delivery Form */}
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep(2);
              toast.success("Details saved Now continue with payment.");
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact</label>
              <input type="email" value="mohsinalisurhio08@gmail.com" disabled className="w-full p-3 border rounded bg-gray-100" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input type="text" placeholder="First name" className="p-3 border rounded" required />
                <input type="text" placeholder="Last name" className="p-3 border rounded" required />
              </div>
              <input type="text" placeholder="Address" className="w-full p-3 border rounded mb-3" required />
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input type="text" placeholder="City" className="p-3 border rounded" required />
                <input type="text" placeholder="Postal code" className="p-3 border rounded" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="Country" className="p-3 border rounded" required />
                <input type="text" placeholder="Phone" className="p-3 border rounded" required />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded bg-black text-white font-medium hover:bg-gray-800"
            >
              Continue to Pay →
            </button>
          </form>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <form onSubmit={handlePayment} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment</label>
              <div className="p-3 border rounded bg-white">
                <CardElement options={{ hidePostalCode: true }} />
              </div>
            </div>

            {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

            <button
              type="submit"
              disabled={!stripe || loading}
              className="w-full py-3 rounded bg-emerald-600 text-white font-medium hover:bg-emerald-700 disabled:opacity-60"
            >
              {loading ? "Processing…" : `Pay $${cart.totalPrice}`}
            </button>

            {demoMode && (
              <p className="mt-3 text-xs text-gray-500">
                Demo mode: Use test card <code>4242 4242 4242 4242</code>.
              </p>
            )}
          </form>
        )}
      </div>

      {/* Right */}
      <div className="bg-white rounded-lg shadow-md p-8 border">
        <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">Order Summary</h3>
        <div className="space-y-4 mb-6">
          {cart.products.map((p, i) => (
            <div key={i} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-4">
                <img src={p.image} alt={p.name} className="w-20 h-20 object-cover rounded" />
                <div>
                  <h4 className="font-medium text-gray-800">{p.name}</h4>
                  <p className="text-sm text-gray-500">{p.size} / {p.color}</p>
                </div>
              </div>
              <p className="font-medium text-gray-800">${p.price.toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2 text-lg">
          <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>${cart.totalPrice.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-gray-600">Shipping</span><span className="text-emerald-600 font-medium">Free</span></div>
          <div className="flex justify-between border-t pt-4 font-semibold text-gray-900"><span>Total</span><span>${cart.totalPrice.toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
