const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://mongoUser:3mArjW4VSg9iXAKL@todo-app-nodejs-react-b0d3t.mongodb.net/test?retryWrites=true",
    // "mongodb://localhost/todo",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Db Connected"))
  .catch(err => console.error(err));
