var express = require("express");
var router = express.Router();
var shoppingCartHandler = require("./shoppingCartHandler");
let database = require("./Database");
let shoppingCart = database.shoppingCart;

/* GET users listing. */
router.get("/", function (req, res, next) {
   let quantityTotal = shoppingCartHandler.shoppingCartDetail.totalQuantity();
   let priceTotal = shoppingCartHandler.shoppingCartDetail.totalPrice();
   res.render("shoppingCart", {
      listProduct: database.listProduct,
      shoppingCart: shoppingCart,
      quantity: quantityTotal,
      price: priceTotal,
   });
});

router.post("/", function (req, res, next) {
   const { body } = req;
   if (body._method === "put") {
      if (body._activeChange === "increase") {
         shoppingCartHandler.updateQuantity.increaseQuantity(body.id);
      } else {
         shoppingCartHandler.updateQuantity.decreaseQuantity(body.id);
      }
   } else {
      if (body._method === "delete") {
         shoppingCartHandler.deleteProductIncart(body.id);
      }
   }
   let quantityTotal = shoppingCartHandler.shoppingCartDetail.totalQuantity();
   let priceTotal = shoppingCartHandler.shoppingCartDetail.totalPrice();
   res.render("shoppingCart", {
      listProduct: database.listProduct,
      shoppingCart: shoppingCart,
      quantity: quantityTotal,
      price: priceTotal,
   });
});

module.exports = router;
