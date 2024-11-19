const mongoose = require('mongoose');
const Address = require('../models/address');

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

// const ctrl_get_user_details = async (req, res) => {
//     const { userId } = req.params;

//     if (!userId) {
//         return res.status(400).json({ error: 'User ID is required' });
//     }

//     try {
//         // Convert userId to an ObjectId
//         userId = mongoose.Types.ObjectId(userId.trim());

//         // Find address based on userId
//         const address = await Address.findOne({ userId });

//         if (!address) {
//             return res.status(404).json({ error: 'Address not found for this user' });
//         }

//         // Log or return the address details
//         console.log('Address found:', address);
//         return res.status(200).json(address);
//     } catch (error) {
//         console.error('Error fetching address:', error);
//         res.status(500).json({ error: 'Failed to fetch address' });
//     }
// };

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
        // Convert userId to an ObjectId using 'new' keyword
        userId = new mongoose.Types.ObjectId(userId.trim());

        // Query the Address collection based on the userId
        const address = await Address.findOne({ userId });

        // If no address is found for the userId
        if (!address) {
            return res.status(404).json({ error: 'Address not found for this user' });
        }

        // Return the found address document
        return res.status(200).json({
            userId: address.userId,
            address: address.address, // The array of addresses for this user
        });

    } catch (error) {
        console.error('Error fetching address:', error);
        return res.status(500).json({
            error: 'Failed to fetch address',
            details: error.message, // Send the error message for debugging
        });
    }
};


module.exports = {
    ctrl_user_address,
    ctrl_get_user_details
}
