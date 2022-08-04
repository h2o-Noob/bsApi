const mongoose = require("mongoose");

const treatSchema = new mongoose.Schema({
  treatReport: {
    number: {
      type: String,
      required: true,
    },
    report: {
      type: mongoose.Schema.ObjectId,
      ref: "Report",
      required: true,
    },
  },
  ammount: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  treatStatus: {
    type: String,
    required: true,
    default: "processing",
  },
  treatedAt: {
    type: Date,
    default: Date.now,
  },
  fedAt: Date,
});

module.exports = mongoose.model("Treat", treatSchema);
