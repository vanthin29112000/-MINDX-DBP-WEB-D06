var express = require("express");
const {
   registerUser,
   loginUser,
   getProfileUser,
   updateProfileUser,
} = require("../controller/userController");
var router = express.Router();

// Register user
router.post("/", registerUser);

// Login User
router.post("/login", loginUser);

// Get profile user
router.get("/profile", getProfileUser);

//update profile user
router.put("/profile", updateProfileUser);

module.exports = router;
