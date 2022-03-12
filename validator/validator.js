exports.validatorUser = (user) => {
   let resultChecked = {
      age: "", //chỉ nhận là số từ 1-200, không nhận số âm
      email: "", // chỉ được nhập format là email, sai format thì báo lỗi không insert vào mảng và không trả về mảng
      gender: "", // 0: name, 1: nữ, 2: Other. Chỉ được nhập vào 0, 1 và 2
   };
   // check tuoi
   if (user.age < 1 || user.age > 200 || isNaN(user.age)) {
      resultChecked.age = "Age chỉ được phép từ 1 - 200";
   }

   //check email
   let tempEmail = user.email.split("@");

   if (tempEmail[1].localeCompare("gmail.com") !== 0) {
      resultChecked.email = "Email phải có định dạng abc@gmail.com";
   }

   //check gioi tinh
   if (user.gender < 0 || user.gender > 2 || isNaN(user.gender)) {
      resultChecked.gender =
         "Giới tính không hợp lệ (0 : nam , 1 : nu , 2 : other)";
   }

   return resultChecked;
};
