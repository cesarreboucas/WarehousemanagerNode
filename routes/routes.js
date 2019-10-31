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

router.get('/seed', function(req, res) {
    const fs = require("fs");
    let mysql = require("../services/mysql");
    const async = require('async');

    async.waterfall([
        function(callback) {
            mysql.query('CREATE TABLE IF NOT EXISTS `users` ( \
                `id` int NOT NULL AUTO_INCREMENT, \
                `name` varchar(255) NOT NULL, \
                `username` varchar(255) NOT NULL, \
                `password` varchar(255) NOT NULL, \
                `role` varchar(255) NOT NULL, \
                `question` varchar(255) NOT NULL, \
                `answer` varchar(255) NOT NULL, \
                PRIMARY KEY (`id`) \
              );', function(error, results, fields) {
                if(error) console.log(error);
                else {
                    console.log("Create table Users");
                    callback(null);
                }
            });
        },function(callback) {
            mysql.query('CREATE TABLE IF NOT EXISTS `orders` ( \
                `id` int NOT NULL AUTO_INCREMENT, \
                `user_id` int NOT NULL, \
                `warehouse_id` int NOT NULL, \
                `ordertime` timestamp NOT NULL, \
                PRIMARY KEY (`id`), \
                FOREIGN KEY (user_id) REFERENCES users(id) \
              );', function(error, results, fields) {
                if(error) console.log(error);
                else {
                    console.log("Create table Orders");
                    callback(null);
                }
            });
        },function(callback) {
            mysql.query('CREATE TABLE IF NOT EXISTS `products_order` ( \
                `id` int NOT NULL AUTO_INCREMENT, \
                `order_id` int NOT NULL,  \
                `product_id` varchar(50) NOT NULL, \
                `quantity` int NOT NULL, \
                `cost` DECIMAL(10,3) NOT NULL, \
                `sale_price` DECIMAL(10,3) NOT NULL, \
                PRIMARY KEY (`id`), \
                FOREIGN KEY (`order_id`) REFERENCES orders(`id`) \
              );', function(error, results, fields) {
                if(error) console.log(error);
                else {
                    console.log("Create table Products_Order");
                    callback(null);
                }
            });
        },
        function (callback) {
            console.log("Reading the file Users");
            let content = fs.readFileSync("./data/seedUsers.json","utf8");
            callback(null, content);
        },
        function(content,callback) {
            console.log("Start Creating Users");
            const users = JSON.parse(content);    
            users.forEach(user => {
                usersController.mySqlcreateUser(user, function(r) {
                    //console.log(r);
                });  
            });
            callback(null);
        },
        function (callback) {
            console.log("Reading the file Orders");
            let content = fs.readFileSync("./data/seedOrders.json","utf8");
            callback(null, content);
        },
        function(content,callback) {
            console.log("Start Creating Orders");
            const orders = JSON.parse(content);  
            orders.forEach(order => {
                ordersController.mySqlcreateOrders(order, function(r) {
                    //console.log(r);
                });                
            });
            callback(null);
        },function (callback) {
            console.log("Reading the file Orders");
            let content = fs.readFileSync("./data/seedProductsOrder.json","utf8");
            callback(null, content);
        },
        function(content,callback) {
            console.log("Start Creating ProductsOrders");
            const productsorder = JSON.parse(content);  
            productsorder.forEach(productsorder => {
                productsOrderController.mySqlcreateProductsOrder(productsorder, function(r) {
                    //console.log(r);
                });                
            });
            callback(null, null);
        }
    ], function (err, result) {
        if(err) res.send({"Seed":"Error"});
        else res.send({"Seed":"Done"});
    });
    
    
    
});

module.exports = router;




