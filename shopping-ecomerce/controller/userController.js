const userModel = require("../models/userModel");
const { hashing, checkCompare } = require("../utils/hashing/hashing");
const generateToken = require("../utils/token/generateToken");
const verifyToken = require("../utils/token/verifyToken");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const checkIDMongoose = require("../utils/checkIDMongoose/checkIDMongoose");
const registerUser = asyncHandler(async (req, res, next) => {
   const { name, email, password } = req.body;

   const userExists = await userModel.findOne({ email: email });
   if (userExists) {
      res.status(400);
      throw new Error("user already exists");
   }

   const newUser = await userModel.create({
      name,
      email,
      password,
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
});

const loginUser = asyncHandler(async (req, res, next) => {
   const { email, password } = req.body;

   const userExists = await userModel.findOne({ email: email });
   if (!userExists) {
      res.status(400);
      throw new Error("Email does not exists");
   }

   const resultCheckPass = await checkCompare(password, userExists.password);

   if (resultCheckPass) {
      res.status(200).json({
         email: userExists.email,
         token: generateToken(userExists._id),
      });
   } else {
      res.status(400);
      throw new Error("incorrect password");
   }
});

const getProfileUser = asyncHandler(async (req, res, next) => {
   try {
      try {
         const { name, email } = req.user;
         res.status(200).json({
            name,
            email,
         });
      } catch (error) {
         res.status(400);
         throw new Error(error);
      }
   } catch (e) {
      console.log(e.message);
   }
});

const updateProfileUser = asyncHandler(async (req, res, next) => {
   let user = await userModel.findOne({ _id: req.user._id });
   try {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
         user.password = req.body.password;
      }

      const updateUser = await user.save();
      res.json({
         name: updateUser.name,
         email: updateUser.email,
         password: updateUser.password,
         isAdmin: updateUser.isAdmin,
      });
   } catch (error) {
      res.status(400);
      throw new Error(error);
   }
});

const getUsers = async (req, res, next) => {
   try {
      const users = await userModel.find();
   } catch (error) {
      throw new Error(error);
   }
   res.json(users);
};

const deleteUserById = asyncHandler(async (req, res, next) => {
   const id = req.params.id;

   checkIDMongoose(id);

   const user = await userModel.findById(id);
   if (!user) {
      res.status(400);
      throw new Error("ID invalid");
   }

   if (id.localeCompare(req.user._id) !== 0) {
      try {
         await userModel.deleteOne({ _id: id });
         res.status(200).send("successful delete");
      } catch (error) {
         throw new Error(error);
      }
   } else {
      res.status(400);
      throw new Error("you don't delete yourselft");
   }
});

const getProfileUserByID = asyncHandler(async (req, res, next) => {
   const id = req.params.id;

   checkIDMongoose(id);

   try {
      const user = await userModel.findById(id);

      res.json({
         name: user.name,
         email: user.email,
         password: user.password,
         isAdmin: user.isAdmin,
      });
   } catch (error) {
      res.status(400);
      throw new Error(error);
   }
});

const updateProfileUserByID = asyncHandler(async (req, res, next) => {
   const id = req.params.id;
   checkIDMongoose(id);

   let user = await userModel.findById(id);
   try {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
         user.password = req.body.password;
      }

      const updateUser = await user.save();
      res.json({
         name: updateUser.name,
         email: updateUser.email,
         password: updateUser.password,
         isAdmin: updateUser.isAdmin,
      });
   } catch (error) {
      res.status(400);
      throw new Error(error);
   }
});

module.exports = {
   registerUser,
   loginUser,
   getProfileUser,
   updateProfileUser,
   getUsers,
   deleteUserById,
   getProfileUserByID,
   updateProfileUserByID,
};
