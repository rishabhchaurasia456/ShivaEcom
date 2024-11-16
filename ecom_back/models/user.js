const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Email should be unique
    },
    mobile: {
        type: String,
        required: true,
    },
    password :{
        type: String,
        required: true,
    },
    otp: { 
        type: String, 
        default: null, // Stores OTP for password reset
    },
    otpExpiry: { 
        type: Date, 
        default: null, // Stores expiry time of OTP
    }
});

const UserRegister = mongoose.model('User', userSchema);

module.exports = UserRegister;
