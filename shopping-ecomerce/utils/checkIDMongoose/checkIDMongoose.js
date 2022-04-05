const mongoose = require("mongoose");

const checkIDMongoose = (id) => {
   //check id mongoose isValid
   if (!mongoose.isValidObjectId(id)) {
      throw new Error("ID invalid");
   }
};

module.exports = checkIDMongoose;
