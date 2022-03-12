const express = require("express");
const managementUser = require("./router/userRouter");
const app = express();
const port = 8080;

app.use(express.json());
app.use("/api/user", managementUser);

app.listen(port, () => {
   console.log("Connected sever ...");
});
