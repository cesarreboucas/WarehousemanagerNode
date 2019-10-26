let express = require('express');
let router = express.Router();
let mysql = require('../services/mysql');

router.get('/', function(req, res, next) {

  mysql.query('SELECT 1 + 1 AS solution', function (error, results, fields) {  
    if (error) {
      throw error;
    }
    else {
      console.log('The solution is: ', results[0].solution);
      res.send(results);
    }
      
  });
  


  //res.render('index', { title: 'Express' });
  
});

module.exports = router;
