import axios from "axios";

const callApi = (url, method = "GET", body) => {
   return axios({
      method,
      url: url,
      data: body,
   }).catch((error) => {
      console.log(error);
   });
};
export default callApi;
