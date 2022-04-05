const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
   name: {
      type: String,
      require: true,
   },
   email: {
      type: String,
      require: true,
      unique: true,
   },
   password: {
      type: String,
      require: true,
   },
   isAdmin: {
      type: Boolean,
      require: true,
      default: false,
   },
});

userSchema.pre("save", async function () {
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
