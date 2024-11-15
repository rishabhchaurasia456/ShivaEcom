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
    }
});

const UserRegister = mongoose.model('User', userSchema);

module.exports = UserRegister;
