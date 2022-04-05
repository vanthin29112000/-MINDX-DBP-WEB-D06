var express = require("express");
const {
   registerUser,
   loginUser,
   getProfileUser,
   updateProfileUser,
   getUsers,
   deleteUserById,
   getProfileUserByID,
   updateProfileUserByID,
} = require("../controller/userController");
const { protect, isAdmin } = require("../middleware/authMiddleware");
var router = express.Router();

// 1.
// @desc: Register new user
// @route: POST /api/users
// @access: Public - return token
router.post("/", registerUser);

// 2.
// @desc: Login API
// @route: POST /api/users/login
// @access: Public - return token
router.post("/login", loginUser);

// 3.
// @desc: Get profile user
// @route: GET /api/users/profile
// @access: Private - Su dung token
router.get("/profile", protect, getProfileUser);

// 4.
// @desc: Update user profile
// @route: PUT /api/users/profile
// @access: Private
router.put("/profile", protect, updateProfileUser);

// 5.
// @desc: Get all users
// @route: GET /api/users
// @access: Private/admin
router.get("/", protect, isAdmin, getUsers);
module.exports = router;

// 6.
// @desc: Delete user
// @route: DELETE /api/users/:id
// @access: Private/admin
router.delete("/:id", protect, isAdmin, deleteUserById);

// 7.
// @desc: Get user by ID
// @route: GET /api/users/:id
// @access: Private/admin
router.get("/:id", protect, isAdmin, getProfileUserByID);

// 8.
// @desc: Update user by ID
// @route: PUT /api/users/:id
// @access: Private/admin
router.put("/:id", protect, isAdmin, updateProfileUserByID);
