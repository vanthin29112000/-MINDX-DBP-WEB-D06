// hiện thị ra ngày tháng năm sinh dang DD/MM/YYYY
const createModule = require("./createModule");
const MY_BIRTHDAY = createModule.getMyBirthday.split("-").reverse().join("/");

exports.getMyBirthday = function () {
   console.log("Kết quả ý 2 : ", MY_BIRTHDAY);
};
