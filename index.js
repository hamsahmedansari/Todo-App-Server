const express = require("express");
const app = express();
require("./connect");
const todo = require("./routes/todo/todo");

app.use(express.json());

// index
app.get("/", (req, res) => {
  res.status(404).json({
    message: "Page Not Found"
  });
});
// allTodo
app.use("/todo", todo);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is running on Port ${port}`));
