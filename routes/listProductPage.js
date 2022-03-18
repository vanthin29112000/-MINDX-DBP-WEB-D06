var express = require("express");
var router = express.Router();
var database = require("./Database");
var shoppingCartHandler = require("./shoppingCartHandler");

router.get("/", (req, res, next) => {
   let quantityTotal = shoppingCartHandler.shoppingCartDetail.totalQuantity();
   let priceTotal = shoppingCartHandler.shoppingCartDetail.totalPrice();
   res.render("listProductPage", {
      listProduct: database.listProduct,
      shoppingCart: database.shoppingCart,
      quantity: quantityTotal,
      price: priceTotal,
   });
});

router.post("/", (req, res, next) => {
   shoppingCartHandler.addProduct(req.body.id);
   let quantityTotal = shoppingCartHandler.shoppingCartDetail.totalQuantity();
   let priceTotal = shoppingCartHandler.shoppingCartDetail.totalPrice();

   res.render("listProductPage", {
      listProduct: database.listProduct,
      shoppingCart: database.shoppingCart,
      quantity: quantityTotal,
      price: priceTotal,
   });
});

module.exports = router;
