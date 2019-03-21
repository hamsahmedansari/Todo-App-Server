const express = require("express");
const router = express.Router();
const { Subscription } = require("../../models/subscription");
const webPush = require("web-push");
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
  const allResult = await Subscription.find();
  webPush.setVapidDetails(
    "mailto:abc@abc.com",
    "BFxOH3BqZRmBcbqunY0kcv5OqJQt-RxAnRmyPjBIXaCwaHQR0uGd_bFH3D6K8oY4FGNLhMVmqFmoMkZYYHogZU0",
    "ZwNdctHaY1S27iETsNa9vl9c3xWZL8MTOH_mRH14IoU"
  );
  for (let i = 0; i < allResult.length; i++) {
    let pushConfig = {
      endpoint: allResult[i].endpoint,
      keys: {
        auth: allResult[i].keys.auth,
        p256dh: allResult[i].keys.p256dh
      }
    };
    webPush.sendNotification(pushConfig, {
      title: "New Post",
      content: "New Post Content"
    });
  }
  res
    .status(200)
    .json({
      message: "Successfully Created Post",
      data: result
    })
    .catch(err => console.log(err));
});

module.exports = router;
