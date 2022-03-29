const bcrypt = require("bcryptjs");
const users = [
   {
      name: "tuan anh admin",
      email: "admin@example.com",
      password: bcrypt.hashSync("12345678", 10),
      isAdmin: true,
   },
   {
      name: "thin",
      email: "thin@example.com",
      password: bcrypt.hashSync("12345678", 10),
      isAdmin: false,
   },
   {
      name: "khai",
      email: "khai@example.com",
      password: bcrypt.hashSync("12345678", 10),
      isAdmin: false,
   },
];

module.exports = users;
