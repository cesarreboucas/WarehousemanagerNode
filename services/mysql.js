<<<<<<< HEAD
const mysql = require('mysql');

let connection = mysql.createConnection({
=======
const mysql      = require('mysql');
const connection = mysql.createConnection({
>>>>>>> a4f3b800e587983da5525e066f9769b820a17d8d
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'warehousemanager'
});
connection.connect();

<<<<<<< HEAD
/*
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
*/

//connection.end();

=======
>>>>>>> a4f3b800e587983da5525e066f9769b820a17d8d
module.exports = connection;