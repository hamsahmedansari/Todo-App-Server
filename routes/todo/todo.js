const express = require("express");
const router = express.Router();

// allTodo
router.get("/", (req, res) => {
  res.status(200).json({
    message: "All Todo"
  });
});

// createTodo
router.post("/", (req, res) => {
  res.status(200).json({
    message: "Create Todo"
  });
});

// getSingleTodo
router.get("/:id", (req, res) => {
  res.status(200).json({
    message: "get Single Todo"
  });
});

// updateSingleTodo
router.put("/:id", (req, res) => {
  res.status(200).json({
    message: "Update Single Todo"
  });
});

// deleteSingleTodo
router.delete("/:id", (req, res) => {
  res.status(200).json({
    message: "Delete Single Todo"
  });
});

module.exports = router;
