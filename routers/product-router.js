const productController = require("../controllers/product-controller");

let product_router = {
  "/": productController.showAll,
  "/create": productController.showFormCreate,
  "/edit": productController.edit,
  "/delete": "",
};
module.exports = product_router;
