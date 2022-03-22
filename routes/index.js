var express = require("express");
var router = express.Router();
const BlogPost = require("../Models/BlogPost");
const moment = require("moment");
/* GET home page. */
router.get("/", function (req, res, next) {
   BlogPost.find((err, blogs) => {
      if (err) {
         console.log(err);
      } else {
         res.render("index", { blogs: blogs, moment: moment });
      }
   });
});

module.exports = router;
