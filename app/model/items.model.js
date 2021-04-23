const mongoose = require('mongoose');

const items = mongoose.Schema({
    shopId: String,
    itemId: String,
    itemName: String,
    itemInStock: Number,
    price: {
        sellingPrice: Number,
        MRP: Number
    },
    itemImage: String,
    itemType: String,
    itemUnit: String,
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