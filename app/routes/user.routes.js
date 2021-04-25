module.exports = (app) => {
    
    
    const user = require('../controller/user.controller.js');

    //user register
    app.post('/userRegister', user.register);

    //user login  
    app.post('/userLogin', user.login);

    //user order
    // app.post('/order', user.order);
    

}