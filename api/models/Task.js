const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      max: 500,
      require: true,
    },
    description: {
      type: String,
      max: 500,
    },
    done: {
      type: Boolean,
      default: false,
    },
    timestamp: {
      type: Number,
    },
    color: {
      type: String,
      max: 20,
    },
    columnId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
