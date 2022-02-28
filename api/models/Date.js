const mongoose = require("mongoose");

const DateSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      require: true,
    },
    dayName: {
      type: String,
      max: 500,
    },
    month: {
      type: Number,
    },
    monthName: {
      type: String,
      max: 500,
    },
    year: {
      type: Number,
    },
    timestamp: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Date", DateSchema);
