const bcrypt = require("bcryptjs");

const hashing = (key) => {
   return bcrypt.hash(key, 10);
};

const checkCompare = (word, keyHash) => {
   return bcrypt.compare(word, keyHash);
};

module.exports = { hashing, checkCompare };
