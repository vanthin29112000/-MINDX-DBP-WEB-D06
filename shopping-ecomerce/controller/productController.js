const productModel = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const checkIDMongoose = require("../utils/checkIDMongoose/checkIDMongoose");

const getProducts = asyncHandler(async (req, res, next) => {
   //logic return all product
   const pageSize = 10;
   const keyWord = req.query.keyword
      ? { name: { $regex: req.query.keyword } }
      : {};
   const page = Number(req.query.pageNumber) || 1;
   const countProduct = await Product.countDocuments({ ...keyWord });
   const products = await Product.find({ ...keyWord })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
   res.json({
      products,
      page,
      countProduct,
      pages: Math.ceil(countProduct / pageSize),
   });
});

const createProduct = asyncHandler(async (req, res) => {
   const { name, description, price, image, brand, category, countInStock } =
      req.body;

   const idUser = req.user._id;
   const product = new Product({
      user: idUser,
      name: name,
      description: description,
      price: price,
      image: image,
      brand: brand,
      category: category,
      countInStock: countInStock,
   });

   const resultProduct = await product.save();
   res.status(200).json(resultProduct);
});

const createReview = asyncHandler(async (req, res) => {
   const { rating, comment } = req.body;
   const productID = req.params.id;
   const userID = req.user._id;
   // 1. check id exist in DB
   const product = await Product.findById(productID);
   if (!product) {
      res.status(400);
      throw new Error("product not found");
   }
   // 2. check user reviewed or yet
   const isReview = product.reviews.find(
      (review) => review.user.toString() === userID.toString()
   );
   if (isReview) {
      res.status(400);
      throw new Error("you already reviewd for this product");
   }
   // 3. save info user in review table
   const reviewContent = {
      name: req.user.name,
      rating: Number(rating),
      comment: comment,
      user: userID,
   };
   product.reviews.push(reviewContent);
   // 4. calculate the amount reviewer
   product.numReviews = product.reviews.length;
   // 5. calculate the amount rating
   let initialValue = 0;
   const sum = product.reviews.reduce(
      (previousValues, currentValue) => previousValues + currentValue.rating,
      initialValue
   );
   product.rating = (sum / product.numReviews).toFixed(2);
   // 6. Thông báo kết quả
   await product.save();
   res.status(200).json({ message: "review successfully!" });
});

const getProductByID = asyncHandler(async (req, res) => {
   const productID = req.params.id;
   checkIDMongoose(productID);

   const product = await productModel.findById(productID);
   if (!product) {
      res.status(400);
      throw new Error("Product not found");
   }
   res.status(200).json(product);
});

const deleteProductByID = asyncHandler(async (req, res) => {
   const productID = req.params.id;
   checkIDMongoose(productID);

   const product = await productModel.findById(productID);
   if (!product) {
      res.status(400);
      throw new Error("Product not found");
   }

   await productModel.deleteOne({ _id: productID });
   res.status(200).json({
      message: "delete successful",
   });
});

const updateProduct = asyncHandler(async (req, res) => {
   // 1. check ID is valid or yet
   const productID = req.params.id;
   checkIDMongoose(productID);

   // 2. check product is exist or yet
   let product = await productModel.findById(productID);
   if (!product) {
      res.status(400);
      throw new Error("product not found");
   }

   // 3. change value with key
   const body = req.body;
   const keyNotChange = [
      "reviews",
      "rating",
      "numReviews",
      "createdAt",
      "updatedAt",
      "__v",
   ];
   const keyBody = Object.keys(body);
   const keyProduct = Object.keys(product._doc);
   for (let key of keyBody) {
      if (keyNotChange.includes(key)) {
         break;
      }

      if (keyProduct.includes(key)) {
         product[key] = body[key];
      }
   }

   const result = await product.save();
   res.status(200).json(result);
});

const getProductTop = asyncHandler(async (req, res) => {
   let products = await productModel.find();

   products = products.sort((a, b) => {
      return b.numReviews - a.numReviews;
   });
   res.status(200).json(products.slice(0, 3));
});

module.exports = {
   getProducts,
   createProduct,
   createReview,
   getProductByID,
   deleteProductByID,
   updateProduct,
   getProductTop,
};
