const mongoose = require('mongoose');

const items = mongoose.Schema({
    shopId: Number,
    itemId: Number,
    itemName: String,
    itemInStock: Number,
    price: {
        sellingPrice: Number,
        MRP: Number
    },
    itemImage: String,
    itemType: String,
    sellingType: String,
    sellingQuantity: Number,   
    itemDescription: {
        type: String,
        default: ""
    }
        
}, {
    timestamps: true
},
{ useUnifiedTopology: true }
);

items.index({ itemId : 1 }, { unique: true });

module.exports = mongoose.model('items', items);