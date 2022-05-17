import callApi from "../Api/callApi";

const fetchUsers = () => async (dispatch) => {
   const res = await callApi("users");

   dispatch({
      type: "FETCH_USERS",
      payload: res.data,
   });
};
export default fetchUsers;
