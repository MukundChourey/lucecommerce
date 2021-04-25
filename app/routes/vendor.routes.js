module.exports = (app) => {
    
    const vendorReg = require('../controller/vendor.controller.js');

    app.get('/', function(req, res) {
            res.send('Nothing to execute');
        });


    //vendor register
    app.post('/shopRegister', vendorReg.register);

    //vendor login  
    app.post('/vendorLogin', vendorReg.login);

    //vendor itemdetail
    app.post('/itemdetail', vendorReg.itemdetail);

    

}
