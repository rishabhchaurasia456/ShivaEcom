const mongoose = require('mongoose');
const Cart = require('../models/cart');

const ctrl_cart_item_add = async (req, res) => {
    let { userId, productId } = req.body;

    try {
        // Ensure userId and productId are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: 'Invalid userId or productId' });
        }

        // Find the user's cart
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Create a new cart if none exists
            cart = new Cart({
                userId,
                products: [{ productId, quantity: 1 }],
            });
        } else {
            // Check if the product exists in the cart
            const productIndex = cart.products.findIndex(
                (item) => item.productId.toString() === productId
            );

            if (productIndex > -1) {
                // Increment the quantity if the product exists
                cart.products[productIndex].quantity += 1;
            } else {
                // Add the product to the cart
                cart.products.push({ productId, quantity: 1 });
            }
        }

        // Save the cart
        await cart.save();
        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
};

const ctrl_cart_item_remove = async (req, res) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ error: 'User ID and Product ID are required' });
    }

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productIndex = cart.products.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (productIndex > -1) {
            // Decrease quantity or remove the product
            if (cart.products[productIndex].quantity > 1) {
                cart.products[productIndex].quantity -= 1;
            } else {
                cart.products.splice(productIndex, 1);
            }
        }

        await cart.save();
        res.status(200).json({ message: 'Product removed from cart', cart });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ error: 'Failed to remove product from cart' });
    }
};

const ctrl_user_cart = async (req, res) => {
    let { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        // Correctly use new keyword to create ObjectId
        userId = new mongoose.Types.ObjectId(userId.trim());

        const cart = await Cart.findOne({ userId }).populate('products.productId');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json({ cart });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
};


module.exports = {
    ctrl_cart_item_add,
    ctrl_cart_item_remove,
    ctrl_user_cart
}