const mongoose = require('mongoose');

const orders = mongoose.Schema({
    orderId: String,
    itemId: Array,
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