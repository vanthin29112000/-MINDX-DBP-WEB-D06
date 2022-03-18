let database = require("./Database");
let shoppingCart = database.shoppingCart;
let listProduct = database.listProduct;

const shoppingCartHandler = {
   addProduct: (id) => {
      let productIncart = shoppingCart.filter((product) => product.id === id);
      if (productIncart.length === 0) {
         shoppingCart.push({
            id: id,
            quantity: 1,
         });
      } else {
         let index = shoppingCart.findIndex((product) => product.id === id);
         shoppingCart[index].quantity++;
      }

      console.log("shoppingCart", shoppingCart);
   },
   updateQuantity: {
      increaseQuantity: (id) => {
         let index = shoppingCart.findIndex((item) => item.id === id);
         shoppingCart[index].quantity++;
         console.log("id", id);
      },
      decreaseQuantity: (id) => {
         let index = shoppingCart.findIndex((item) => item.id === id);
         if (shoppingCart[index].quantity > 1) {
            shoppingCart[index].quantity--;
         }
      },
   },
   deleteProductIncart: (id) => {
      let index = shoppingCart.findIndex((item) => item.id === id);
      shoppingCart.splice(index, 1);
   },
   checkOut: () => {
      shoppingCart.splice(0, shoppingCart.length);
   },
   shoppingCartDetail: {
      totalQuantity: () => {
         let quantity = 0;
         for (let item of shoppingCart) {
            quantity += item.quantity;
         }
         return quantity;
      },
      totalPrice: () => {
         let totalPrice = 0;
         for (let item of shoppingCart) {
            let product = listProduct.filter(
               (productItem) => productItem.id == item.id
            );

            totalPrice += item.quantity * product[0].price;
         }
         return totalPrice;
      },
   },
};
module.exports = shoppingCartHandler;
