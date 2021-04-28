const mongoose = require('mongoose');
const { Decimal128 } = require('bson');

const user = mongoose.Schema({
    userId: String,
    userName: String,
    email: String,
    password: String,
    contactNo: String,
    cart: {

    },
    orders: {
        inProcess:{},
        completed:{}
    },
    address:{       
        locality: String,
        city: String,
        state: String,
        pincode: Number,
        addressLine: String
    },
    location: {
        latitude: Decimal128,
        longitude: Number
    },
    accessToken: String,
        
    }, {
        timestamps: true
    },
    { useUnifiedTopology: true }
);

module.exports = mongoose.model('user', user);