const mongoose = require('mongoose');
const Address = require('../models/address');
const User = require('../models/user');

// Example controller to add an address
const ctrl_user_address = async (req, res) => {
    try {
        const { userId, name, mobile, locality, city, zipcode, state } = req.body;

        // Validate input fields
        if (!userId || !name || !mobile || !locality || !city || !zipcode || !state) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new address object
        const newAddress = {
            name,
            mobile,
            locality,
            city,
            zipcode,
            state,
        };

        // Find the user address document by userId and push the new address into the address array
        const address = await Address.findOneAndUpdate(
            { userId: userId },
            { $push: { address: newAddress } },
            { new: true, upsert: true } // Create a new document if it doesn't exist
        );

        res.status(201).json({ message: 'Address added successfully.', address });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const ctrl_get_user_details = async (req, res) => {
    let { userId } = req.params;

    // Check if userId is provided in the request
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    // Validate if the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid User ID format' });
    }

    try {
        // Convert userId to an ObjectId
        userId = new mongoose.Types.ObjectId(userId.trim());

        // Fetch the user details from the User collection
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch the user's address from the Address collection
        const address = await Address.findOne({ userId });
        if (!address) {
            return res.status(404).json({ error: 'Address not found for this user' });
        }

        // Return the user details along with the address
        return res.status(200).json({
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            password: user.password, // Be cautious about sending passwords in response
            address: address.address, // The array of addresses for this user
        });

    } catch (error) {
        console.error('Error fetching user details or address:', error);
        return res.status(500).json({
            error: 'Failed to fetch user details or address',
            details: error.message, // Send the error message for debugging
        });
    }
};


module.exports = {
    ctrl_user_address,
    ctrl_get_user_details
}
