const mongoose = require('mongoose');

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
        addressLine: String,
        userGivenAddress: String
    },
    location: {
        latitude: Number,
        longitude: Number
    },
    accessToken: String,
        
    }, {
        timestamps: true
    },
    { useUnifiedTopology: true }
);

module.exports = mongoose.model('user', user);