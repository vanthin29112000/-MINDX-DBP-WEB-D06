let products = [];
const fs = require("fs");
const path = require("path");
const dir =
   "C:/Users/Admin/Desktop/D06/buoi 8/shopping-ecomerce/public/images/Products";
const files = fs.readdirSync(dir);
const idUser = "624bfd6048ecd749f57bfa9d";

const renderProduct = () => {
   let listImage = [];
   for (const file of files) {
      listImage.push(path.join(dir, file));
   }

   for (let i = 0; i < 50; i++) {
      const j = i + 1;
      tempProduct = {
         // user: idUser,
         name: "sản phẩm " + j,
         image: listImage[i],
         brand: "new brand",
         category: "Đông hồ nam",
         description: "content",
         price: (Math.floor(Math.random() * 10) + 1) * 1000000,
         countInStock: Math.floor(Math.random() * 100),
      };

      products.push(tempProduct);
   }
};
renderProduct();
module.exports = products;
