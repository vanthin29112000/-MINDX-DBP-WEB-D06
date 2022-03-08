// Sử dụng build in modules fs
// Đọc nội dung (readFileSync, readFile) file first.txt, xong đọc tiếp nội dung second.txt
// Chạy đồng bộ (writeFileSync) hoặc bất đồng bộ (writeFile + callback or promise)
// Ghi nội dung vào file finish-sync.txt

const fs = require("fs");

let textFirst = fs.readFileSync("./Subfolder/first.txt", "utf-8");
let textSecond = fs.readFileSync("./Subfolder/second.txt", "utf-8");

fs.writeFileSync(
   "./Subfolder/finish-sync.txt",
   textFirst + textSecond,
   "utf-8"
);

// ================================

/*
    Bài 1: intro
    Viết 1 chương trình bằng nodejs in ra các số chẵn duy nhất trong mảng sau
    [1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 9, 10];
 */
console.log("Bài 1 : ");

const array = [1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 9, 10];
let temp = {};
for (let a of array) {
   if (a % 2 === 0) {
      temp[a] = 1;
   }
}

console.log("Kết quả : ", Object.keys(temp));

// ================================

/*
    Bài 2: global
    Tạo 1 file json trong project có nội dung sau:
    Tên: Tên học viên (name)
    Tuổi: Tuổi học viên (age)
    Công việc hiện tại: công việc của học viên (work)
    Giới tính: (gender)
    In ra nội dung file json trong cmd bằng cách sử dụng nodejs
 */
console.log("Bài 2 : ");
// const fs = require("fs");
let conf = fs.readFileSync("./bai2/database.json", "utf-8");
conf = JSON.parse(conf);

console.log("Kết quả : ", conf[0]);

// =================================

/*
    Bài 3: modules
    Cho 1 file json có nội dung sau { name: 'tuananh', children: ['com', 'ngo'], age: '31' }
    Sử dụng queryString để convert sang chuỗi sau 'name=tuananh&children=com&children=ngo&age=31'
*/

console.log("Bài 3 : ");
const querystring = require("querystring");
let conf2 = fs.readFileSync("./bai3/database.json", "utf-8");
conf2 = JSON.parse(conf2);
let temp2 = conf2[0];

console.log("Kết quả : ", querystring.stringify(temp2));

// =================================

/*
    Bài 4: create module
    Tạo 1 module trả về ngày tháng năm sinh của bản thân dạng : yyyy-mm-dd
    Tạo 1 file khác, sử dụng module trênvà Hiển thị ngày tháng năm sinh dạng: dd/mm/yyyy
*/
console.log("Bài 4 : ");
const createModule = require("./bai4/createModule");
console.log("Kết quả ý 1 : ", createModule.getMyBirthday);

const createModule2 = require("./bai4/createModule2");
createModule2.getMyBirthday();

// =================================

/* 
    Bài 5: http
    Tạo 1 trang web nếu truy cập vào đường dẫn http://localhost:5000/index
    Hiển thị nội dung : đây là trang chủ
    Nếu truy cập vào đường dẫn: http://localhost:5000/about
    Hiển thị nội dung: là thông tin cá nhân của bản thân.
    Nếu truy cập khác 2 đường dẫn index và about
    Hiển thị nội dung: Đường dẫn này không tồn tại
*/

var http = require("http");

http
   .createServer(function (req, res) {
      if (req.url === "/index") {
         res.writeHead(200, { "Content-Type": "text/html" });
         res.write("Day la trang chu", "utf-8");
      } else {
         if (req.url === "/about") {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(`Ten : Phan Van Thin \n Lop : D06`, "utf-8");
         } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.write("Duong dan nay khong ton tai", "utf-8");
         }
      }
      res.end();
   })
   .listen(8080);
