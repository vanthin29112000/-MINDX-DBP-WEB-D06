var express = require("express");
const verify = require("../auth/checkToken");
var router = express.Router();
const userModel = require("../models/user.model");
/* GET users listing. */
router.get("/", function (req, res, next) {
   userModel.find((error, users) => {
      if (error) {
         res.status(400).send(error);
      }

      res.json(users);
   });
});

router.get("/:id", verify, function (req, res, next) {
   userModel.findById(req.params.id, (error, users) => {
      if (error) {
         res.status(400).send("Không tìm thấy thông tin id này");
      }

      res.json(users);
   });
});

module.exports = router;
