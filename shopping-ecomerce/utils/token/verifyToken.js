const JWT = require("jsonwebtoken");

const verifyToken = (token) => {
   return JWT.verify(token, "masobimat");
};

module.exports = verifyToken;
