const mongoose = require("mongoose");

const Todo = mongoose.model(
  "Todo",
  new mongoose.Schema({
    title: {
      type: String,
      require: true
    },
    description: {
      type: String,
      require: true
    },
    type: {
      type: String,
      require: true
    },
    status: {
      type: String,
      require: true
    },
    isDelete: {
      type: Boolean,
      require: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  })
);

exports.Todo = Todo;
