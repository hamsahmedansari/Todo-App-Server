const express = require("express");
const router = express.Router();
const { Todo } = require("../../models/todo");
// allTodo
router.get("/", async (req, res) => {
  const result = await Todo.find();
  res.status(200).json({
    message: "All Todo",
    data: result
  });
});

// createTodo
router.post("/", async (req, res) => {
  if (
    !req.body.hasOwnProperty("title") ||
    !req.body.hasOwnProperty("description") ||
    !req.body.hasOwnProperty("type") ||
    !req.body.hasOwnProperty("status") ||
    !req.body.hasOwnProperty("isDelete")
  ) {
    return res.status(400).json({
      message: "Form Filed are empty please recheck it"
    });
  }
  let obj = new Todo({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    status: req.body.status,
    isDelete: req.body.isDelete
  });

  let result = await obj.save();

  res.status(200).json({
    message: "Successfully Created Todo",
    data: result
  });
});

// getSingleTodo
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let result = await Todo.findById(id);
    if (!result)
      return res.status(404).json({
        message: "Todo Not Found "
      });
    res.status(200).json({
      message: "get Single Todo",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      message: "Todo Not Found with Bad Request"
    });
  }
});

// updateSingleTodo
router.put("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let todo = await Todo.findById(id);
    if (!todo)
      return res.status(404).json({
        message: "Todo Not Found "
      });

    todo.title = "title" in req.body ? req.body.title : todo.title;
    todo.description =
      "description" in req.body ? req.body.description : todo.description;
    todo.type = "type" in req.body ? req.body.type : todo.type;
    todo.status = "status" in req.body ? req.body.status : todo.status;
    todo.isDelete = "isDelete" in req.body ? req.body.isDelete : todo.isDelete;
    todo.date = Date.now();
    const result = await todo.save();
    res.status(200).json({
      message: "Updated Single Todo",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      message: "Todo Not Found with Bad Request"
    });
  }
});

// deleteSingleTodo
router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let todo = await Todo.findById(id);
    if (!todo)
      return res.status(404).json({
        message: "Todo Not Found "
      });
    const result = await Todo.findByIdAndRemove(id);
    if (result) {
      res.status(200).json({
        message: "Successfully Deleted",
        data: result
      });
    } else {
      res.status(500).json({
        message: "Server Error"
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Todo Not Found with Bad Request"
    });
  }
});

module.exports = router;
