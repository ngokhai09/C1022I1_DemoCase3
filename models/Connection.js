const mysql = require("mysql");

class Connection {
  connectString = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    database: "testdb",
  });
connect() {
    return this.connectString;
  }
}

module.exports = new Connection();
