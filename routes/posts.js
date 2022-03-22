var express = require("express");
var router = express.Router();
const BlogPost = require("../Models/BlogPost");

router.get("/new", function (req, res, next) {
   res.render("create");
});

router.post("/store", (req, res, next) => {
   // Luư title, img , content to database
   console.log("req.body", req.body);
   BlogPost.create(
      {
         ...req.body,
         image: "abc.jpg",
      },
      (err) => {
         if (err) {
            res.redirect("/");
         }
      }
   );
});

module.exports = router;
