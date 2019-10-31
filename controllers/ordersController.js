const mysql = require('../services/mysql');

exports.orders_list = function(req, res) {
    mysql.query('select * from orders', function(error, results, fields) {
        if(error) res.send(error);
        else res.send(results);
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
        return {"id":result.insertId};
    } catch (error) {
        throw error;
    }
};