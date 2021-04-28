module.exports = (app) => {
    
    
    const user = require('../controller/user.controller.js');

    //user register
    app.post('/userRegister', user.register);

    //user login  
    app.post('/userLogin', user.login);
    
    //nearby shop lists
    app.post('/listShops', user.listShops);

    //user order
    app.post('/order', user.order);
    

}