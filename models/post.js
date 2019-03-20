const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: {
      type: String,
      require: true
    },
    image: {
      type: String,
      require: true
    },
    location: {
      type: String,
      require: true
    }
  })
);

exports.Post = Post;
