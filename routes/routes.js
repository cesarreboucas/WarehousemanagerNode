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

module.exports = router;




