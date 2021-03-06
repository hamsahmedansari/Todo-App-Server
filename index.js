const express = require("express");
const app = express();
require("./connect");
const todo = require("./routes/todo/todo");
const post = require("./routes/post/post");
const subscription = require("./routes/subscription/subscription");

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,PATCH,DELETE");
    return res.status(200).json({});
  }
  next();
});

// index
app.get("/", (req, res) => {
  res.status(404).json({
    message: "Page Not Found"
  });
});
// allTodo
app.use("/todo", todo);
// allPost
app.use("/post", post);
// allPost
app.use("/subscription", subscription);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is running on Port ${port}`));
