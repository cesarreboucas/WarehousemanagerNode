const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const productsController = require('../controllers/productsController');
const productsOrderController = require('../controllers/productsOrderController');
const ordersController = require('../controllers/ordersController');
const warehousesController = require('../controllers/warehousesController');

router.get('/', function(req, res) {
    res.send({"working":1});
});

/* Products. */
router.get('/products', productsController.products_list);
router.post('/products', productsController.products_add);

/* Warehouses. */
router.get('/warehouses', warehousesController.warehouse_list);
router.post('/warehouses', warehousesController.warehouse_add);

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
        //let ordersContent = fs.readFileSync("./data/seedOrders.json","utf8");
        //let productOrdersContent = fs.readFileSync("./data/seedProductsOrder.json","utf8");
        let seedProducts = fs.readFileSync("./data/seedProducts.json","utf8");
        let seedWarehouses = fs.readFileSync("./data/seedWarehouses.json","utf8");

        //res.send("AA"+Math.floor(Math.random() * 10));

        console.log("Start Creating Users");
        const users = JSON.parse(usersContent);    
        //await users.forEach(async user => {
            //await usersController.mySqlCreateUser(user);
        //});

        console.log("Start Creating Products");
        const products = JSON.parse(seedProducts);  
        //await products.forEach(async product => {
            //await productsController.productsSave(product);           
        //});

        console.log("Start Creating Warehouses");
        const warehouses = JSON.parse(seedWarehouses);  
        //await warehouses.forEach(async wh => {
            //await warehousesController.warehouseSave(wh);           
        //});
        
        let numOrders = Math.floor(Math.random() * 15) + 5; // 5~20
        
        console.log("Creating "+numOrders+" orders");
        for(let i=0; i<numOrders; ++i) {
            // Ceil because MySQL id starts from 1
            let user_id = Math.ceil(Math.random() * users.length); 
            let warehouse_key = warehouses[Math.floor(Math.random() * warehouses.length)].name;
            let ordertime = new Date(new Date().getTime() - Math.floor(Math.random() * 15 * 86400000));
            //let ordertime = new Date().getTime();
            let order = {
                "user_id": user_id,
                "warehouse_key": warehouse_key,
                "ordertime": ordertime
            };
            let order_id = await ordersController.mySqlCreateOrders(order);
            console.log(order);
        }

        /*
        console.log("Start Creating Orders");
        const orders = JSON.parse(ordersContent);  
        await orders.forEach(async order => {
            await ordersController.mySqlCreateOrders(order)                
        });
        */
        /*
        console.log("Start Creating ProductsOrders");
        const productsorder = JSON.parse(productOrdersContent);  
        await productsorder.forEach(async productsorder => {
            await productsOrderController.mySqlCreateProductsOrder(productsorder);
        });
        */
        
        /*
        
        */
        res.send({"seed":1});
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;




