const express = require('express');
const router = express.Router();
const mysql = require('../services/mysql');
const bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  
    mysql.query('select * from users', function(error, results, fields) {
        if(error) res.send(error);
        else res.send(results);
    });

});

/* GET userbyMail listing. */
router.get('/auth', function(req, res, next) {

    if(req.body.email.length > 0 && req.body.password.length > 0) {
        mysql.query('select * from users where email = ?', req.body.email, function(error, results, fields) {
            if(error) res.send(error);
            else {
                if(bcrypt.compareSync(req.body.password, results[0].password)) {
                    res.send({"auth":1});
                } else {
                    res.send({"auth":0});
                }
            }
        });
    } else {
        res.send({"error":"Email and Password cant be null!"})
    }    
});

/* Create a new user. */
router.post('/', function(req, res, next) {  

    if(req.body.password.length>0) {
        req.body.password = bcrypt.hashSync(req.body.password, 8);
        mysql.query('insert into users set ?', req.body, function (error, results, fields) {
            if(error) res.send(error);
            else res.send({"id":results.insertId});
        });
    } else {
        res.send({"error":"Password must be not null!"})
    }

});

module.exports = router;


/*

CREATE TABLE users (
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name varchar(255),
    email varchar(255),
	password varchar(255)
);

*/