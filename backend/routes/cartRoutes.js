const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Helper Function to get a cart by user ID or guest ID
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// @route   POST /api/cart
// @desc    Add a product to the Cart for a guest or logged-in User
// @access  Public
router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    // Find product from DB
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found!" });
    }

    // Find existing cart for user or guest
    let cart = await getCart(userId, guestId);

    if (cart) {
      // Check if product already exists in cart
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        // Update quantity if product exists
        cart.products[productIndex].quantity += quantity;
      } else {
        // Add new product to cart
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      // Recalculate total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      // Create new cart
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });

      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!" });
  }
});


// @router PUT /api/cart
// @desc Update product quantity in the cart for a guest or logged-in user
// @access Public
router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if(!cart){
      return res.status(404).json({message: "Cart Not Found!"});
    }
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&   
        p.size === size &&
        p.color === color
    );
    if(productIndex > -1){
      // update quantity
    if (quantity <= 0) {
      cart.products.splice(productIndex, 1); // remove product if quantity is 0 or less
    } else {
      cart.products[productIndex].quantity = quantity; // update quantity if greater than 0
    }
    // Recalculate total price
    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    await cart.save();
    return res.status(200).json(cart);
    } else {
      return res.status(404).json({message: "Product Not Found in Cart!"});

  }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!" });
    
  }
  
});

// @route DELETE /api/cart
// @desc Remove a product from the cart 
// @access Public

router.delete("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if(!cart){
      return res.status(404).json({message: "Cart Not Found!"});
    }
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId && 
        p.size === size &&
        p.color === color
    );  
    
    if(productIndex > -1){
      cart.products.splice(productIndex, 1); // remove product from cart
      // Recalculate total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({message: "Product Not Found in Cart!"});
    } 

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!" });
    
  }

});


// @route GET /api/cart
// @desc Get cart details for a guest or logged-in user
// @access Public
router.get("/", async (req, res) => {
  const { guestId, userId } = req.query;
  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Cart Not Found!" });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!" }); 
    
  }
});


// @route POST /api/cart/merge
// @desc Merge guest cart into user cart upon login
// @access private

router.post("/merge", protect , async (req, res) => {
  const { guestId } = req.body;
  
  try {

    // Find guest cart
    const guestCart = await Cart.findOne({ guestId });
    // Find user cart
    let userCart = await Cart.findOne({ user: req.user._id });

    if(guestCart){
      if (guestCart.products.length === 0) {
        return res.status(200).json({ message: "Guest Cart is Empty!" });
      }
    }
    
    if (userCart) {
      // Merge guest cart products into user cart
      guestCart.products.forEach((guestProduct) => {
        const productIndex = userCart.products.findIndex(
          (p) =>
            p.productId.toString() === guestProduct.productId.toString() &&
            p.size === guestProduct.size &&
            p.color === guestProduct.color
        );

        if (productIndex > -1) {
          // If product exists in user cart, update quantity
          userCart.products[productIndex].quantity += guestProduct.quantity;
        } else {
          // If product doesn't exist, add to user cart
          userCart.products.push(guestProduct);
        }
      });

      userCart.totalPrice = userCart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await userCart.save();
      
      // Remove the guest cart after merging
      try {
        await Cart.findOneAndDelete({ guestId });
      } catch (error) {
        console.error("Error deleting guest cart:", error);
      }
      res.status(200).json(userCart);
        
      } else {
        // If user cart doesn't exist, assign guest cart to user
        guestCart.user = req.user._id;
        guestCart.guestId = undefined; // Clear guestId as it's now a user cart
        await guestCart.save();
      res.status(200).json(guestCart);
      }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!" });
    
  }

});



module.exports = router;
