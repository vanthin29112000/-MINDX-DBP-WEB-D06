// 1. Kiểm tra token có hợp lệ hay không
// 2. Kiểm tra user đang gửi lên có phải admin ko ?

const verifyToken = require("../utils/token/verifyToken");
const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
   const authorization = req.headers.authorization;
   if (authorization && authorization.startsWith("Bearer")) {
      try {
         const token = authorization.split(" ")[1];
         const checkToken = verifyToken(token);
         req.user = await userModel
            .findById(checkToken._id)
            .select("-password");
         next();
      } catch (error) {
         res.status(401);
         throw new Error("not authorized or token invalid !!");
      }
   } else {
      res.status(401);
      throw new Error("not authorized or token invalid !!");
   }
});

const isAdmin = asyncHandler((req, res, next) => {
   console.log(req.user);
   if (req.user && req.user.isAdmin) {
      next();
   } else {
      res.status(401);
      throw new Error("member is not admin");
   }
});

module.exports = { protect, isAdmin };
