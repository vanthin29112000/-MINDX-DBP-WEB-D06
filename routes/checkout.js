var express = require("express");
var router = express.Router();
let shoppingCartHandler = require("./shoppingCartHandler");

router.get("/", (req, res, next) => {
   let quantityTotal = shoppingCartHandler.shoppingCartDetail.totalQuantity();

   if (quantityTotal === 0) {
      let priceTotal = shoppingCartHandler.shoppingCartDetail.totalPrice();

      res.render("checkout", {
         title: "No products to pay for",
         quantity: quantityTotal,
         price: priceTotal,
      });
   } else {
      shoppingCartHandler.checkOut();
      quantityTotal = shoppingCartHandler.shoppingCartDetail.totalQuantity();
      let priceTotal = shoppingCartHandler.shoppingCartDetail.totalPrice();
      res.render("checkout", {
         title: "Payment success",
         quantity: quantityTotal,
         price: priceTotal,
      });
   }
});

module.exports = router;
