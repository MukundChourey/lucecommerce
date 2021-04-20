module.exports = (app) => {
    
    const vendorReg = require('../controller/vendor.controller.js');

    app.get('/', function(req, res) {
            res.send('Nothing to execute');
        });


    //vendor register
    app.get('/register', vendorReg.register);

    

}
