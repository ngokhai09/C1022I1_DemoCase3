const connection = require("./Connection");
class Product {
  constructor() {
    this.connect = connection.connect();
  }

  findAll() {
    return new Promise((resolve, reject) => {
      let sql = "Select * from product";
      this.connect.query(sql, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
  create(product){
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO product(name, price, img) values('${product.name}','${product.price}','${product.img}')`;
      this.connect.query(sql, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}

module.exports = new Product();
