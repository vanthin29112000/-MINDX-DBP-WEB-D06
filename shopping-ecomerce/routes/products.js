const express = require("express");
const {
   getProducts,
   createProduct,
   createReview,
   getProductByID,
   deleteProductByID,
   updateProduct,
   getProductTop,
} = require("../controller/productController");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const Product = require("../models/productModel");
var router = express.Router();

// 1
// @desc: Get all products
// @route: GET /api/products
// @access: Public
router.get("/", getProducts);

//2
// @desc: Create a product
// @route: POST /api/products
// @access: Private/admin
router.post("/", protect, isAdmin, createProduct);

// 3.
// @desc: Create Review for product
// @route: POST /api/products/:id/reviews
// @access: Private
router.post("/:id/reviews", protect, createReview);

// 4.
// @desc: Get product by ID
// @route: GET /api/products/:id
// @access: Public
router.get("/:id/profile", getProductByID);

// 5.
// @desc: Delete product by ID
// @route: Delete /api/products/:id
// @access: Private/admin
router.delete("/:id", protect, isAdmin, deleteProductByID);

// 6.
// @desc: Update product by ID
// @route: PUT /api/products/:id
// @access: Private/admin
router.put("/:id", protect, isAdmin, updateProduct);

// 7.
// @desc: Get top products by ID
// @route: GET /api/products/top
// @access: Public
router.get("/top", getProductTop);

module.exports = router;
