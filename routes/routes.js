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
router.get('/users', usersController.users_list);
router.get('/users/auth', usersController.users_auth);
router.post('/users', usersController.users_add);


/* ####### SEED ############*/
router.get('/seed', async (req, res, next) => {
    const fs = require("fs");
    let mysql = require("../services/mysql");

    try {
        let result = await mysql.query(
            'drop database if exists warehousemanager; \
            create database warehousemanager; \
            use warehousemanager; \
            CREATE TABLE IF NOT EXISTS `users` ( \
                `id` int NOT NULL AUTO_INCREMENT, \
                `name` varchar(255) NOT NULL, \
                `username` varchar(255) NOT NULL, \
                `password` varchar(255) NOT NULL, \
                `role` varchar(255) NOT NULL, \
                `question` varchar(255) NOT NULL, \
                `answer` varchar(255) NOT NULL, \
                PRIMARY KEY (`id`) \
              ); \
              CREATE TABLE IF NOT EXISTS `orders` ( \
                `id` int NOT NULL AUTO_INCREMENT, \
                `user_id` int NOT NULL, \
                `warehouse_id` int NOT NULL, \
                `ordertime` timestamp NOT NULL, \
                PRIMARY KEY (`id`), \
                FOREIGN KEY (user_id) REFERENCES users(id) \
              ); \
              CREATE TABLE IF NOT EXISTS `products_order` ( \
                `id` int NOT NULL AUTO_INCREMENT, \
                `order_id` int NOT NULL,  \
                `product_id` varchar(50) NOT NULL, \
                `quantity` int NOT NULL, \
                `cost` DECIMAL(10,3) NOT NULL, \
                `sale_price` DECIMAL(10,3) NOT NULL, \
                PRIMARY KEY (`id`), \
                FOREIGN KEY (`order_id`) REFERENCES orders(`id`) \
              );'
        );
        let usersContent = fs.readFileSync("./data/seedUsers.json","utf8");
        let ordersContent = fs.readFileSync("./data/seedOrders.json","utf8");
        let productOrdersContent = fs.readFileSync("./data/seedProductsOrder.json","utf8");

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
        res.send({seed: "ok"});
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;




