const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    handle: {
        type: String,
        required: true,
        unique: true,
    },
    rating: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);