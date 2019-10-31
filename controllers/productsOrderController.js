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

exports.mySqlcreateProductsOrder = function(jsonProductsOrder, callback) {
    mysql.query('insert into products_order set ?', jsonProductsOrder, function (error, results, fields) {
        if(error) callback(error);
        else callback({"id":results.insertId});
    });
};