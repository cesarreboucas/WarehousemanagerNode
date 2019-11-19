const mysql = require('../services/mysql');
const productsOrderController = require('../controllers/productsOrderController');

const query = 'select o.id, o.user_id, o.warehouse_key, o.ordertime, po.barcode,\
                po.name, po.quantity, po.cost, po.sale_price, o.done, o.ready \
                from orders o \
                inner join products_order po on o.id=po.order_id ';

exports.ordersList = async function(req, res) {
    // Updating orders before sending
    let productsController = require("../controllers/productsController");
    await productsController.getProductHangs();

    let mysqlorders = await mysql.query(query + 'where o.done=0 order by o.ordertime desc;');
    let orders = module.exports.MysqltoJson(mysqlorders[0]);
    res.send(orders);
};

exports.ordersListByUser = async function(req, res) {
    // Updating orders before sending
    let productsController = require("../controllers/productsController");
    await productsController.getProductHangs();

    let mysqlorders = await mysql.query(query + 'where o.user_id= ? order by o.ordertime desc;', req.params.id);
    let orders = module.exports.MysqltoJson(mysqlorders[0]);
    res.send(orders);
}

exports.ordersListAll = async function() { // Used to get quantitys amount
    let mysqlorders = await mysql.query(query + ';');
    return mysqlorders[0];
}

exports.setOrderReady = async function(id) { // Used to get quantitys amount
    let res = await mysql.query("update orders set ready=1 where id= ? limit 1;", id);
    return (res[0]? true : false);
}

exports.setOrderDone = async function(id) { // Used to get quantitys amount
    await mysql.query("update orders set done=1 where id= ? limit 1;", id);
    
    return true;
}

exports.ordersAdd = async function(req, res) {
    
    try {
        let order = req.body;
        let products = order.products;
        delete order.products;
        let id = await module.exports.mySqlCreateOrders(order);
        products.forEach(prod => {
            prod.order_id = id.id;
            productsOrderController.mySqlCreateProductsOrder(prod);
        });
        
        res.send(id);

            
    } catch (error) {
        console.log(error);
        res.send({"error":error})
    }    
};

exports.mySqlCreateOrders = async function(jsonOrder) {
    try {
        // id | user_id | warehouse_key | ordertime | ready | done
        let result = await mysql.query('insert into orders set ?', jsonOrder);
        return {"id":result[0].insertId};
    } catch (error) {
        throw error;
    }
};

exports.MysqltoJson = function (results) {
    let previous = 0;
    let orders = new Array();
    results.forEach(e => {
        let product = {
            "barcode": e.barcode,
            "name": e.name,
            "quantity": e.quantity,
            "sale_price": e.sale_price,
            "cost": e.cost,
            "quantity": e.quantity
        };

        if(previous!=e.id) {
            delete e.barcode;
            delete e.name;
            delete e.quantity;
            delete e.sale_price;
            delete e.cost;
            delete e.quantity;
            orders.push(e);
            orders[orders.length-1].products = new Array();
            orders[orders.length-1].products.push(product);
            //console.log(e);
            previous = e.id;
        } else {
            orders[orders.length-1].products.push(product);
        }
    });
    return orders;
}
