const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const productsController = require('../controllers/productsController');
const productsOrderController = require('../controllers/productsOrderController');
const ordersController = require('../controllers/ordersController');
const warehousesController = require('../controllers/warehousesController');
const reportsController = require('../controllers/reportsController');
const movOrdersController = require('../controllers/movementOrderController');

router.get('/', function(req, res) {
    res.send({"working":1});
});

/* Products. */
router.get('/products', productsController.products_list);
router.get('/products/hangs/', productsController.productsHangs);
router.get('/products/hangs/:warehouse/:barcode',productsController.productsHangsByWarehouseByProduct);
router.post('/products', productsController.products_add);

/* Warehouses. */
router.get('/warehouses', warehousesController.warehouse_list);
router.post('/warehouses', warehousesController.warehouse_add);

/* Orders */
router.get('/orders', ordersController.ordersList);
router.get('/orders/user/:id', ordersController.ordersListByUser);
router.get('/orders/warehouse/:warehouse', ordersController.ordersListByWarehouse);
router.patch('/orders', ordersController.updateOrder);
router.post('/orders', ordersController.ordersAdd);

/* ProdTransactions */
router.get('/movorders', movOrdersController.getAllMovOrders);
router.post('/movorders', movOrdersController.addMovOrder);
router.put('/movorders', movOrdersController.editMovOrder);
router.patch('/movorders', movOrdersController.updateMovOrder);

router.get('/movorders/:warehouse/todo', movOrdersController.getTodoOrders);
router.get('/movorders/:warehouse/pending', movOrdersController.getPendingOrders);
router.get('/movorders/:warehouse/completed', movOrdersController.getCompletedOrders);

/* Reports */
router.get('/reports', reportsController.reports_list);

/* ProductsOrder */
router.get('/productsorder', productsOrderController.products_order_list);
router.post('/productsorder', productsOrderController.products_order_add);

/* Users */
router.post('/users/auth', usersController.authenticateUser);
router.post('/users/role', usersController.editUserRole);
router.post('/users/favourite_warehouse', usersController.editUserFavouriteWarehouse);
router.patch('/users', usersController.forgotPassword);
router.get('/users',  usersController.listUsers);
router.post('/users', usersController.addUser);
router.delete('/users',  usersController.removeUser);
router.get('/users/:favourite_warehouse/associates', usersController.getAssociates);

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
        await users.forEach(async user => {
            await usersController.mySqlCreateUser(user);
        });

        console.log("Start Creating Products");
        const products = JSON.parse(seedProducts);  
        await products.forEach(async product => {
            await productsController.productsSave(product);           
        });

        console.log("Start Creating Warehouses");
        const warehouses = JSON.parse(seedWarehouses);  
        await warehouses.forEach(async wh => {
            await warehousesController.warehouseSave(wh);           
        });
        
        let numOrders = 5;
        console.log("Creating "+numOrders+" orders");
        for(let i=0; i<numOrders; ++i) {
            // Ceil because MySQL id starts from 1
            let user_id = (numOrders%2?5:6);
            let warehouse_key = warehouses[Math.floor(Math.random() * warehouses.length)].name;
            let ordertime = new Date(new Date().getTime() - (50/(i+1) * 86400000));
            let order = {
                "user_id": user_id,
                "warehouse_key": warehouse_key,
                "ordertime": ordertime
            };
            //console.log(order);

            let order_id = await ordersController.mySqlCreateOrders(order);

            let product_index = 0;
            let productOrder = {
                "order_id": order_id.id,
                "barcode": products[product_index].barcode,
                "name": products[product_index].name,
                "quantity":Math.ceil(Math.random() * 3),
                "cost":products[product_index].cost,
                "sale_price":products[product_index].sale_price
            };
            await productsOrderController.mySqlCreateProductsOrder(productOrder);

            let numProducts = Math.floor(Math.random() * 3) + 1; // 1~3
            for(let x=0; x < numProducts; ++x) {
                let product_index = Math.floor(Math.random() * (products.length-1)) + 1; // never the first
                let productOrder = {
                    "order_id": order_id.id,
                    "barcode": products[product_index].barcode,
                    "name": products[product_index].name,
                    "quantity":Math.ceil(Math.random() * 3),
                    "cost":products[product_index].cost,
                    "sale_price":products[product_index].sale_price
                };
                await productsOrderController.mySqlCreateProductsOrder(productOrder);
            }

            
        }
        res.send({"seed":1});
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;






