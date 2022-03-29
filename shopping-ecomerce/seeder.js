const Users = require("./models/userModel");
const users = require("./data/user");
const connectDB = require("./config/db");
const User = require("./models/userModel");

connectDB();

const importData = async () => {
   try {
      await User.deleteMany();
      await User.insertMany(users);
      console.log("data imported success");
   } catch (err) {
      console.log(err);
   }
};

importData();
