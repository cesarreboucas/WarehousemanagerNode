const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const productsController = require('../controllers/productsController');
const productsOrderController = require('../controllers/productsOrderController');
const ordersController = require('../controllers/ordersController');

router.get('/', function(req, res) {
    res.send({"working":1});
});

/* Products. */
router.get('/products', productsController.products_list);
router.post('/products', productsController.products_add);

/* Orders */
router.get('/orders', ordersController.orders_list);
router.post('/orders', ordersController.orders_add);

/* ProductsOrder */
router.get('/productsorder', productsOrderController.products_order_list);
router.post('/productsorder', productsOrderController.products_order_add);

/* Users */
router.get('/users', usersController.listUsers);
router.get('/users/auth', usersController.authenticateUser);
router.post('/users', usersController.addUser);
router.put('/users', usersController.editUser);
router.delete('/users', usersController.removeUser);

/**
 * Basic authentication function.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function basicAuth(req, res, next) {
    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const user = await userService.authenticate({ username, password });
    if (!user) {
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    }

    // attach user to request object
    req.user = user

    next();
}

/* ####### SEED ############*/
router.get('/seed', async (req, res, next) => {
    const fs = require("fs");
    let mysql = require("../services/mysql");
    let databaseSeed = fs.readFileSync("./data/warehouse_management.sql","utf8");
    try {
        let result = await mysql.query(databaseSeed);
        let usersContent = fs.readFileSync("./data/seedUsers.json","utf8");
        let ordersContent = fs.readFileSync("./data/seedOrders.json","utf8");
        let productOrdersContent = fs.readFileSync("./data/seedProductsOrder.json","utf8");
        let seedProducts = fs.readFileSync("./data/seedProducts.json","utf8");

        console.log("Start Creating Users");
        const users = JSON.parse(usersContent);    
        await users.forEach(async user => {
            await usersController.mySqlCreateUser(user);
        });

        console.log("Start Creating Orders");
        const orders = JSON.parse(ordersContent);  
        await orders.forEach(async order => {
            await ordersController.mySqlCreateOrders(order)                
        });
        
        console.log("Start Creating ProductsOrders");
        const productsorder = JSON.parse(productOrdersContent);  
        await productsorder.forEach(async productsorder => {
            await productsOrderController.mySqlCreateProductsOrder(productsorder);
        });
        console.log("Strt Creating Products");
        const products = JSON.parse(seedProducts);  
        await products.forEach(async product => {
            await productsController.productsSave(product);           
        });
        res.send({seed: "ok"});
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;




