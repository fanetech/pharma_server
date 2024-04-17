const mongoose = require('mongoose');
const { isEmail } = require('validator');
const pharmacySchema = mongoose.Schema(
    {
        name: {
            type: String,
            maxLength: 55,
        },
        slogan: {
            type: String,
            trim: true,
        },
        latitude: {
            type: String,
        },
        longitude: {
            type: String,
        },
        email: {
            type: String,
            validate: [isEmail],
        },
        phone: {
            type: String,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('pharmacy', pharmacySchema);
