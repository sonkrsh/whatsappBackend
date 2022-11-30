const express = require("express");
const controller = require("./controllers");
require("./models");
const bodyParser = require("body-parser");

const app = express();

const port = 8080;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log("==", process);
app.get("/", (req, resp) => {
  resp.send("hello world");
});
app.post("/create-user", controller.userController);

app.listen(port, () => {
  console.log(`Server run in http://localhost:${port}`);
});
