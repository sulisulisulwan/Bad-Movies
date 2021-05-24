const mysql = require('mysql');
const mysqlConfig = require('../../config.js');


const connection = mysql.createConnection(mysqlConfig);
connection.connect((err) => {
  if (err) {
    console.error(`ERROR connecting to ${this.database} of ${this.host}`)
    return;
  }
  console.log(`Connected to database... I hope..`)
})

module.exports = connection;