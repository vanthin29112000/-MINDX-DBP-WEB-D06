const userModel = require("../models/userModel");
const { hashing, checkCompare } = require("../utils/hashing/hashing");
const generateToken = require("../utils/token/generateToken");
const verifyToken = require("../utils/token/verifyToken");

// Register user

const registerUser = async (req, res, next) => {
   const { name, email, password } = req.body;

   const userExists = await userModel.findOne({ email: email });
   if (userExists) {
      res.status(400);
      throw new Error("user already exists");
   }

   const passwordHashing = await hashing(password);

   const newUser = await userModel.create({
      name,
      email,
      password: passwordHashing,
   });
   if (newUser) {
      res.status(200).json({
         _id: newUser._id,
         name: newUser.name,
         email: newUser.email,
         token: generateToken(newUser._id),
      });
   } else {
      res.status(400);
      throw new Error("invalid user data!!");
   }
};

// Login User
/*
    1. Gui email, pass
    2. Check email co ton tai khong
    3. check pass co dung khong
    4. Tra ve thong tin voi token 
    return token 
*/
const loginUser = async (req, res, next) => {
   const { email, password } = req.body;

   const userExists = await userModel.findOne({ email: email });
   if (!userExists) {
      res.status(400);
      throw new Error("Email does not exists");
   }

   await checkCompare(password, userExists.password);

   if (resultCheckPass) {
      res.status(200).json({
         email: userExists.email,
         token: generateToken(userExists._id),
      });
   } else {
      res.status(400);
      throw new Error("incorrect password");
   }
};

// Get profile user
/*
    1. Lấy token
    2. Verify token
    3. Tra về profile user
*/
const getProfileUser = async (req, res, next) => {
   const token = req.header("auth-token");

   try {
      const user = await verifyToken(token);
      const userFindDb = await userModel.findOne({ _id: user._id });
      if (!userFindDb) {
         res.status(400);
         throw new Error("user does not exist or has been deleted");
      }

      const { name, email } = userFindDb;
      res.status(200).json({
         name,
         email,
      });
   } catch (error) {
      res.status(400);
      throw new Error(error);
   }
};

// Update profile user
/*
    1. verify token
 */
const updateProfileUser = async (req, res, next) => {
   const token = req.header("auth-token");
   const updateObject = { ...req.body };

   try {
      const user = await verifyToken(token);
      console.log("id", user._id);
      await userModel.findOneAndUpdate(
         { _id: user._id },
         { $set: updateObject }
      );
   } catch (error) {
      res.status(400);
      throw new Error(error);
   }
};

module.exports = { registerUser, loginUser, getProfileUser, updateProfileUser };
