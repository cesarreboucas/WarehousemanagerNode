const mysql = require('mysql2');

let connectionPool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'warehousemanager',
  port     : 8889,
  multipleStatements: true,
});
const connection = connectionPool.promise();

module.exports = connection;