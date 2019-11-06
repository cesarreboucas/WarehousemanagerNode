const mysql = require('../services/mysql');

exports.orders_list = function(req, res) {
    let limit;
    try {
        limit = req.query.limit;
    } catch (er) {
        limit = 25;
    }

    mysql.query('select o.id, o.user_id, o.warehouse_id, o.ordertime, po.product_id,\
             po.quantity, po.cost, po.sale_price \
             from orders o \
             inner join products_order po on o.id=po.order_id \
             where o.ordertime > (NOW() - INTERVAL 15 DAY) \
             order by o.id;',
        function(error, results, fields) {
        let orders = new Array();
        if(error) res.send(error);
        else {
            let previous = 0;
            results.forEach(e => {
                let product = {
                    "id": e.product_id,
                    "quantity": e.quantity,
                    "sale_price": e.sale_price,
                    "cost": e.cost,
                    "quantity": e.quantity
                };

                if(previous!=e.id) {
                    delete e.product_id;
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

        }
        res.send(orders);
    });
};

exports.orders_add = function(req, res) {
    
    try {
        module.exports.mySqlcreateOrders(req.body,function(r) {
            res.send(r);
        });
            
    } catch (error) {
        console.log(error);
        res.send({"error":error})
    }    
};

exports.mySqlCreateOrders = async function(jsonOrder) {
    try {
        let result = await mysql.query('insert into orders set ?', jsonOrder);
        return {"id":result[0].insertId};
    } catch (error) {
        throw error;
    }
};