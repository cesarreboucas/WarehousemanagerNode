const mysql = require('mysql2');

let connectionPool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'warehousemanager',
  multipleStatements: true,
});
const connection = connectionPool.promise();

module.exports = connection;