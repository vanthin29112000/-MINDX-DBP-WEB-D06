var express = require("express");
var router = express.Router();
const userModel = require("../models/user.model");
const JWT = require("jsonwebtoken");

/* GET home page. */
router.post("/register", (req, res, next) => {
   const { body } = req;

   userModel.create({ ...body }, (err) => {
      if (err) {
         res.status(400).send(err);
      }
   });
});

router.get("/login", async (req, res, next) => {
   const { body } = req;
   try {
      const user = await userModel.findOne({ username: body.username });
      if (user.password === body.password) {
         const token = JWT.sign(
            { _id: user._id, username: user.username },
            "mabimat"
         );
         res.header("200", token).send(token);
      }
   } catch (err) {
      res.status(400).send(error);
   }
});

module.exports = router;
