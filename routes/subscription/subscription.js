const express = require("express");
const router = express.Router();
const { Subscription } = require("../../models/subscription");
// allPost
router.get("/", async (req, res) => {
  const result = await Subscription.find();
  res.status(200).json({
    message: "All Subscription",
    data: result
  });
});

// createPost
router.post("/", async (req, res) => {
  if (
    !req.body.hasOwnProperty("endpoint") ||
    !req.body.hasOwnProperty("keys")
  ) {
    return res.status(400).json({
      message: "Form Filed are empty please recheck it"
    });
  }
  let obj = new Subscription({
    endpoint: req.body.endpoint,
    keys: req.body.keys
  });

  let result = await obj.save();

  res.status(200).json({
    message: "Successfully Created Post",
    data: result
  });
});

module.exports = router;
