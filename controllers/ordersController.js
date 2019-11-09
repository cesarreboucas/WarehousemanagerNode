const mysql = require('../services/mysql');
const query = 'select o.id, o.user_id, o.warehouse_key, o.ordertime, po.product_key,\
                po.product_name, po.quantity, po.cost, po.sale_price, o.done, o.ready \
                from orders o \
                inner join products_order po on o.id=po.order_id ';

exports.ordersList = function(req, res) {
    mysql.query(query + 'order by o.ordertime desc;',
        function(error, mysqlorders, fields) {
            if(error) res.send(error);
            else {
                let orders = MysqltoJson(mysqlorders);
                res.send(orders);
            }
        }
    );
};

exports.ordersListUndone = async function() {
    let mysqlorders = await mysql.query(query + 'where o.done=0 order by po.product_key;');
    return mysqlorders[0];
}

exports.ordersAdd = function(req, res) {
    
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

function MysqltoJson(results) {
    let previous = 0;
    let orders = new Array();
    results.forEach(e => {
        let product = {
            "id": e.product_key,
            "quantity": e.quantity,
            "sale_price": e.sale_price,
            "cost": e.cost,
            "quantity": e.quantity
        };

        if(previous!=e.id) {
            delete e.product_key;
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