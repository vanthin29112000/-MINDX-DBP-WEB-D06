const Users = require("./models/userModel");
const users = require("./data/user");
const connectDB = require("./config/db");
const User = require("./models/userModel");
const Product = require("./models/productModel");
const products = require("./data/product");

connectDB();

const importData = async () => {
   try {
      // await User.deleteMany();
      // await User.insertMany(users);
      //create seeder Products
      await Product.deleteMany();
      const userAdmin = await Users.findOne({ isAdmim: true });
      const sampleProducts = products.map((product) => {
         return { ...product, user: userAdmin._id };
      });
      await Product.insertMany(sampleProducts);
      console.log("data imported success");
   } catch (err) {
      console.log(err);
   }
};

importData();
