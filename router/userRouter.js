const express = require("express");
const res = require("express/lib/response");
const managementUser = express.Router();
const validator = require("../validator/validator.js");
const users = [
   {
      id: "1",
      age: 18, // chỉ nhận là số từ 1-200, không nhận số âm
      email: "victory1080@gmail.com", // chỉ được nhập format là email, sai format thì báo lỗi không insert vào mảng và không trả về mảng
      name: "Nguyen Tuan Anh",
      gender: 0, // 0: name, 1: nữ, 2: Other. Chỉ được nhập vào 0, 1 và 2
   },
   {
      id: "2",
      age: 28, // chỉ nhận là số từ 1-200, không nhận số âm
      email: "victory1080@gmail.com2", // chỉ được nhập format là email, sai format thì báo lỗi không insert vào mảng và không trả về mảng
      name: "Nguyen Tuan Anh2 ",
      gender: 1, // 0: name, 1: nữ, 2: Other. Chỉ được nhập vào 0, 1 và 2
   },
];

// API trả về toàn bộ danh sách user
managementUser.get("/", (req, res) => {
   res.send(users);
});

// API trả về user theo id
managementUser.get("/:id", (req, res) => {
   let user = users.filter((i) => i.id == req.params.id);
   res.send(user);
});

// Thêm user mới vào array (POSTMAN)và trả về mảng user mới

managementUser.post("/", (req, res) => {
   let user = req.body;
   let resultChecked = validator.validatorUser(user);
   if (Object.values(resultChecked).join("") === "") {
      users.push({ id: users.length + 1 + "", ...user });
      res.send(users);
   } else {
      res.send(resultChecked);
   }
});

managementUser.put("/", (req, res) => {
   let info = req.body;

   let findIndex = users.findIndex((user) => user.id === info.id);
   if (findIndex !== -1) {
      users[findIndex].name = info.name;
      res.send(users);
   } else {
      res.send("Không có thông tin ID này");
   }
});

managementUser.delete("/", (req, res) => {
   let info = req.body;

   let findIndex = users.findIndex((user) => user.id === info.id);
   if (findIndex !== -1) {
      users.splice(findIndex, 1);
      res.send(users);
   } else {
      res.send("Không có thông tin ID này");
   }
});

module.exports = managementUser;
