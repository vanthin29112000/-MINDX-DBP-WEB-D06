const JWT = require("jsonwebtoken");

const generateToken = (id) => {
   return JWT.sign({ _id: id }, "masobimat", {
      expiresIn: "1d",
   });
};
module.exports = generateToken;
