const { openNotificationWithIcon } = require("../Component/notify");

const ReducerUser = (state, action) => {
   switch (action.type) {
      case "ADD_USER": {
         return {
            listUser: [action.userName, ...state.listUser],
            isShowNotify: true,
            notifyType: "success",
            notifyContent: "Add user successfull",
         };
      }
      case "DELETE_USER":
         let temp = state.listUser.filter((name) => name !== action.userName);
         return {
            listUser: temp,
            isShowNotify: true,
            notifyType: "success",
            notifyContent: "Delete user successfull",
         };
      case "EMPTY_USER": {
         return {
            listUser: state.listUser,
            isShowNotify: true,
            notifyType: "error",
            notifyContent: "input is not empty",
         };
      }
      default:
         throw new Error();
   }
};

module.exports = { ReducerUser };
