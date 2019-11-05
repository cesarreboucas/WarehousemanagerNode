const mysql = require('mysql2');

let connectionPool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'warehousemanager',
  port     : 3306,
  multipleStatements: true,
});
const connection = connectionPool.promise();

module.exports = connection;