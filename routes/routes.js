const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const productsController = require('../controllers/productsController');

router.get('/', function(req, res) {
    res.send({"working":1});
});

/* GET users listing. */
router.get('/products', productsController.products_list);
router.post('/products', productsController.products_add);


/* GET users listing. */
router.get('/users', usersController.users_list);
/* GET userbyMail listing. */
router.get('/users/auth', usersController.users_auth);
/* Create a new user. */
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
                    console.log("Create table user");
                    callback(null);
                }
            });        
        },
        function (callback) {
            console.log("Reading the file");
            let content = fs.readFileSync("./data/seedUsers.js","utf8");
            //console.log(content);
            callback(null, content);
        },
        function(content, callback) {
            console.log("Parse the file");
            
            const users = JSON.parse(content);    
            console.log(users);
            users.forEach(user => {
                console.log(user);
                usersController.mySqlcreateUser(user, function(err, r) {
                    console.log("Creating User "+user.name+" id: "+r);
                });
            //callback(null);
                
            });
        }

    ], function (err, result) {
    });
    
    console.log("Done");
    res.send({"working":1});
});

module.exports = router;




