const mongoose = require('mongoose');
const { Decimal128 } = require('bson');

const vendorSchema = mongoose.Schema({
    shopId: String,
    ownerName: String,
    shopName: String,
    email: String,
    password: String,
    contactNo: String,
    shopType: String,
    shopImage: String,
    shopAddress:{
        locality: String,
        city: String,
        state: String,
        pincode: Number,
        addressLine: String,
        userGivenAddress: String
    },
    location: {
        latitude: Decimal128,
        longitude: Decimal128
    },
    shopTimings: {
        monday : {
            status:{
                type: String,
                default: "Close"
            },
            shopOpeningTime : {
                type: String,
                default: "0000-00-00"
            },   
            shopClosingTime: {
                type: String,
                default: "0000-00-00"
            }
        },
        tuesday : {
            status:{
                type: String,
                default: "Close"
            },
            shopOpeningTime : {
                type: String,
                default: "0000-00-00"
            },   
            shopClosingTime: {
                type: String,
                default: "0000-00-00"
            }
        },
        wednesday : {
            status:{
                type: String,
                default: "Close"
            },
            shopOpeningTime : {
                type: String,
                default: "0000-00-00"
            },   
            shopClosingTime: {
                type: String,
                default: "0000-00-00"
            }
        },
        thursday : {
            status:{
                type: String,
                default: "Close"
            },
            shopOpeningTime : {
                type: String,
                default: "0000-00-00"
            },   
            shopClosingTime: {
                type: String,
                default: "0000-00-00"
            }
        },
        friday : {
            status:{
                type: String,
                default: "Close"
            },
            shopOpeningTime : {
                type: String,
                default: "0000-00-00"
            },   
            shopClosingTime: {
                type: String,
                default: "0000-00-00"
            }
        },
        saturday : {
            status:{
                type: String,
                default: "Close"
            },
            shopOpeningTime : {
                type: String,
                default: "0000-00-00"
            },   
            shopClosingTime: {
                type: String,
                default: "0000-00-00"
            }
        },
        sunday : {
            status:{
                type: String,
                default: "Close"
            },
            shopOpeningTime : {
                type: String,
                default: "0000-00-00"
            },   
            shopClosingTime: {
                type: String,
                default: "0000-00-00"
            }
        },
        
    },
    orders: Array,
    accessToken: String,
        
    }, {
        timestamps: true
    },
    { useUnifiedTopology: true }
);

module.exports = mongoose.model('vendorShop', vendorSchema);