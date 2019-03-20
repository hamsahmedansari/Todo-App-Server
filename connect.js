const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/todo", { useNewUrlParser: true })
  .then(() => console.log("Db Connected"))
  .catch(err => console.error(err));
