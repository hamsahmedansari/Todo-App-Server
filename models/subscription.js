const mongoose = require("mongoose");

const Subscription = mongoose.model(
  "Subscription",
  new mongoose.Schema({
    endpoint: {
      type: String,
      require: true
    },
    keys: {
      type: Object,
      require: true
    }
  })
);

exports.Subscription = Subscription;
