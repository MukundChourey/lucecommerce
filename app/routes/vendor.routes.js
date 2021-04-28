module.exports = (app) => {
    
    const vendorReg = require('../controller/vendor.controller.js');

    app.get('/', function(req, res) {
            res.send('Nothing to execute');
        });


    //vendor register
    app.post('/shopRegister', vendorReg.register);

    //update shop details
    app.post('/updateShop', vendorReg.updateShop);

    //vendor login  
    app.post('/vendorLogin', vendorReg.login);

    //vendor add item
    app.post('/addItem', vendorReg.additem);

    //vendor item details
    app.post('/itemDetail', vendorReg.itemdetail);

    //update vendor item details
    app.post('/updateItem', vendorReg.updateItem);

    

}
