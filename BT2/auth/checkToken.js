const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
   const token = req.header("auth-token");
   if (!token) {
      res.status(401).send("you are not granted access permission");
   }

   JWT.verify(token, "mabimat", (err, result) => {
      if (err) {
         res.status(400).send(err);
      }

      if (!result) {
         res.status(400).send("token invalid");
      }
      next();
   });
};
