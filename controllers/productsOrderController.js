const mysql = require('../services/mysql');

exports.products_order_list = function(req, res) {
    mysql.query('select * from products_order', function(error, results, fields) {
        if(error) res.send(error);
        else res.send(results);
    });
};

exports.products_order_add = function(req, res) {
    
    try {
        module.exports.mySqlcreateProductsOrder(req.body,function(r) {
            res.send(r);
        });
            
    } catch (error) {
        console.log(error);
        res.send({"error":error})
    }    
};

exports.mySqlCreateProductsOrder = async function(jsonProductsOrder) {
    try {
        let product = {
            "order_id": jsonProductsOrder.order_id,
            "barcode": jsonProductsOrder.barcode,
            "name": jsonProductsOrder.name,
            "quantity": jsonProductsOrder.quantity,
            "cost": jsonProductsOrder.cost,
            "sale_price": jsonProductsOrder.sale_price
        };
        
        let result = await mysql.query('insert into products_order set ?', product);
        return {"id":result[0].insertId};
    } catch (error) {
        throw error;
    }
};