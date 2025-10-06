const express = require('express');
const Checkout = require('../models/Checkout');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new checkout session
router.post('/', protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: 'No checkout items provided!' });
  }

  try {
    const checkout = await Checkout.create({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    res.status(201).json(checkout);
  } catch (error) {
    console.error('Error creating checkout:', error);
    res.status(500).json({ message: 'Server Error!' });
  }
});

// Mark checkout as paid
router.put('/:id/pay', protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) return res.status(404).json({ message: 'Checkout not found!' });

    if (paymentStatus === 'Paid') {
      checkout.isPaid = true;
      checkout.paymentStatus = 'Paid';
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();

      return res.status(200).json({ message: 'Payment updated successfully!', checkout });
    }

    res.status(400).json({ message: 'Invalid payment status!' });
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({ message: 'Server Error!' });
  }
});

// Finalize checkout → create order
router.post('/:id/finalize', protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) return res.status(404).json({ message: 'Checkout Not Found!' });
    if (!checkout.isPaid) return res.status(400).json({ message: 'Checkout Not Paid Yet!' });
    if (checkout.isFinalized) return res.status(400).json({ message: 'Checkout Already Finalized!' });

    const order = await Order.create({
      user: checkout.user,
      orderItems: checkout.checkoutItems,
      shippingAddress: checkout.shippingAddress,
      paymentMethod: checkout.paymentMethod,
      totalPrice: checkout.totalPrice,
      isPaid: true,
      paidAt: checkout.paidAt,
    });

    checkout.isFinalized = true;
    checkout.finalizedAt = Date.now();
    await checkout.save();

    await Cart.findOneAndDelete({ user: checkout.user });

    res.status(201).json({ message: 'Checkout finalized successfully!', order });
  } catch (error) {
    console.error('Error finalizing checkout:', error);
    res.status(500).json({ message: 'Server Error!' });
  }
});

module.exports = router;
