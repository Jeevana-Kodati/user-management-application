const mongoose = require("mongoose");

const AlienSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: Array,
            // enum: ['user', 'manager', 'admin'],
            default: ['user']
        },

    }, { timestamps: true }
)


module.exports = mongoose.model('Alien', AlienSchema);