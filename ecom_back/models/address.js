const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    address: [
        {
            name: {
                type: String,
                required: true,
            },
            mobile: {
                type: String,
                required: true,
            },
            locality: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            zipcode: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            }
        },
    ],
}, { collection: 'Address' });

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;

