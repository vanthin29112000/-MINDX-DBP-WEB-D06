import React, { useEffect, useReducer } from "react";
import { AddInput } from "../Component/AddInput";
import Counter from "../Component/ListAccount";
import { openNotificationWithIcon } from "../Component/notify";
import { ReducerUser } from "../Reducer/ReducerUser";
export const User = () => {
   const [state, dispatch] = useReducer(ReducerUser, {
      listUser: [],
      isShowNotify: false,
      notifyType: "",
      notifyContent: "",
   });
   const onAddUser = (name) => {
      if (name) {
         dispatch({ type: "ADD_USER", userName: name });
      } else {
         dispatch({ type: "EMPTY_USER", userName: name });
      }
   };

   useEffect(() => {
      if (state.isShowNotify) {
         console.log(state.notifyType);
         openNotificationWithIcon(state.notifyType, state.notifyContent, "");
      }
   }, [state]);

   const onDelete = (name) => {
      dispatch({ type: "DELETE_USER", userName: name });
   };
   return (
      <div className="user-container">
         <AddInput onAddUser={onAddUser}></AddInput>
         <Counter list={state.listUser} onDelete={onDelete}></Counter>
      </div>
   );
};
