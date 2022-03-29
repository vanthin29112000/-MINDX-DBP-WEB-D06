const mongoose = require("mongoose");

const connectDB = async () => {
   try {
      const connect = await mongoose.connect(
         "mongodb://localhost/shop-ecommerce"
      );

      console.log("MongooseDB", connect.connection.host);
   } catch (error) {
      console.log("error", error);
   }
};

module.exports = connectDB;
