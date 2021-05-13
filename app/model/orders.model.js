const mongoose = require('mongoose');

const orders = mongoose.Schema({
    orderId: String,
    itemDetails: Array,
    custName : String,
    address:{       
        locality: String,
        city: String,
        state: String,
        pincode: Number,
        addressLine: String
    },
    shopId: String,
    status: String,
    amount: Number,
    userId : String      
}, {
    timestamps: true
},
{ useUnifiedTopology: true }
);

orders.index({ orderId : 1 }, { unique: true });

module.exports = mongoose.model('orders', orders);