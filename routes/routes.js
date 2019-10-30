const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const productsController = require('../controllers/productsController');

router.get('/', function(req, res) {
    res.send({"working":1});
});

router.get('/seed', function(req, res) {
    const fs = require("fs");
    async function readfile() {
        const content = fs.readFileSync("./data/seedUsers.js");
        const users = JSON.parse(content);
        users.forEach(user => {
            usersController.mySqlcreateUser(user, function(err, r) {
                console.log("Creating User "+user.name+" id: "+r.id);
            });
            
        });
    }
    readfile();
    console.log("Done");
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

module.exports = router;




