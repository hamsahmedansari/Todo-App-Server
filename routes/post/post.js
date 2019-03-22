const express = require("express");
const router = express.Router();
const { Post } = require("../../models/post");
const webPush = require("web-push");
const { Subscription } = require("../../models/subscription");
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
  const allResult = await Subscription.find();
  webPush.setVapidDetails(
    "mailto:abc@abc.com",
    "BAayUDO4uZVF2dLBcd1hu5XwuJLY53T3t4o_vQQZxq4Gh7HbTZNR3sl32sGzVgGDlydeto-7bAIS6heuI9LEZB4",
    "6Jnctq0cOq7IhXrC63vHNEJ80N44q0vaQ2LK3mHwaxA"
  );
  for (let i = 0; i < allResult.length; i++) {
    console.log(allResult[i]);

    let pushConfig = {
      endpoint: allResult[i].endpoint,
      keys: {
        auth: allResult[i].keys.auth,
        p256dh: allResult[i].keys.p256dh
      }
    };
    webPush.sendNotification(
      pushConfig,
      JSON.stringify({
        title: "New Post",
        content: result.title,
        url: "/",
        image: result.image
      })
    );
  }
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
