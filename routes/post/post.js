const express = require("express");
const router = express.Router();
const { Post } = require("../../models/post");
// allPost
router.get("/", async (req, res) => {
  const result = await Post.find();
  res.status(200).json({
    message: "All Post",
    data: result
  });
});

// createPost
router.post("/", async (req, res) => {
  if (
    !req.body.hasOwnProperty("title") ||
    !req.body.hasOwnProperty("image") ||
    !req.body.hasOwnProperty("location")
  ) {
    return res.status(400).json({
      message: "Form Filed are empty please recheck it"
    });
  }
  let obj = new Post({
    title: req.body.title,
    image: req.body.image,
    location: req.body.location
  });

  let result = await obj.save();

  res.status(200).json({
    message: "Successfully Created Post",
    data: result
  });
});
// deleteSingleTodo
router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let post = await Post.findById(id);
    if (!post)
      return res.status(404).json({
        message: "Post Not Found "
      });
    const result = await Post.findByIdAndRemove(id);
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
      message: "Post Not Found with Bad Request"
    });
  }
});
module.exports = router;
