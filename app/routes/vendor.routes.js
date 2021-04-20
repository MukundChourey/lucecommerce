module.exports = (app) => {
    
    const vendorReg = require('../controller/vendor.controller.js');

    app.get('/', function(req, res) {
            res.send('Nothing to execute');
        });


    //vendor register
    app.post('/register', vendorReg.register);

    

}
