const mysql = require('../services/mysql');
const bcrypt = require('bcryptjs');

exports.users_list = function(req, res) {
    mysql.query('select * from users', function(error, results, fields) {
        if(error) res.send(error);
        else res.send(results);
    });
};

exports.users_auth = function(req, res) {
    if(req.body.email.length > 0 && req.body.password.length > 0) {
        try{
            mysql.query('select * from users where email = ?', req.body.email, function(error, results, fields) {
                if(error) res.send(error);
                else {
                    if(results.length>0 && bcrypt.compareSync(req.body.password, results[0].password)) {
                        res.send(results);
                    } else {
                        res.send({"auth":0});
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    } else {
        res.send({"error":"Email and Password cant be null!"})
    }
};

exports.users_add = function(req, res) {
    
    try {
        if(req.body.password.length>0) {
            module.exports.mySqlcreateUser(req.body,function(r) {
                res.send(r);
            });
            
        } else {
            res.send({"error":"Password must be not null!"})
        }    
    } catch (error) {
        console.log(error);
        res.send({"error":"Password must be not null!"})
    }    
};

exports.mySqlcreateUser = function (jsonUser,callback) {
    jsonUser.password = bcrypt.hashSync(jsonUser.password, 8);
    mysql.query('insert into users set ?', jsonUser, function (error, results, fields) {
        if(error) callback(error);
        else callback({"id":results.insertId});
    });
}


/*

CREATE TABLE users (
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name varchar(255),
    email varchar(255),
	password varchar(255)
);

*/