const product = require("../models/Product");
const fs = require("fs");
const qs = require("qs");
const formidable = require("formidable");
class ProductController {
  async showAll(req, res) {
    let products = await product.findAll();
    let html = "";
    let index = 1;
    for (let item of products) {
      html += `<tr>
            <th scope="row">${index++}</th>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><img src = '../uploads/${item.img}' /></td>
            <td><a href="/edit?id=${item.id}" class="btn-primary">Edit</a></td>
            <td><a class="btn-danger">Delete</a></td>

          </tr>`;
    }
    fs.readFile("./views/products/list.html", "utf-8", (err, data) => {
      if (err) console.log(err);
      res.writeHead(200, { "Content-type": "text/html" });
      data = data.replace("{product-list}", html);
      res.write(data);
      res.end();
    });
  }
  showFormCreate(req, res) {
    if (req.method === "GET") {
      fs.readFile("./views/products/add.html", "utf-8", (err, data) => {
        if (err) console.log(err);
        res.writeHead(200, { "Content-type": "text/html" });
        res.write(data);
        res.end();
      });
    } else {
      // let data = '';
      // req.on('data',chunk=>{
      //     data+=chunk
      // })
      // req.on('end', async()=>{
      //     let products= qs.parse(data);
      //     console.log(products);
      //     await product.create(products);
      //     res.writeHead(301,{Location :'/'});
      //     res.end()

      // })
      let form = new formidable.IncomingForm();
      form.uploadDir = "./uploads/";
      form.parse(req, async (err, fields, files) => {
        let newProduct = {
          name: fields.name,
          price: fields.price,
          img: files.img.originalFilename,
        };
        await product.create(newProduct);
        let tmpPath = files.img.filepath;
        let desPath = form.uploadDir + files.img.originalFilename;
        fs.rename(tmpPath, desPath, (err) => {
          if (err) console.log(err);
        });
        res.writeHead(301, { Location: "/" });
        res.end();
      });
    }
  }
  edit(req, res) {
    console.log(req.url.split("=")[1]);
  }
}

module.exports = new ProductController();
