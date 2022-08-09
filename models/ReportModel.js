const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  animal: {
    type: String,
    required: [true, "animal not found"],
  },
  description: {
    type: String,
    required: [true, "descritption not found"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  area: {
    type: String,
    required: true,
  },
  location: {
    adress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  numberOfAnimals: {
    type: Number,
    default: 0,
    required: true
  },
  aid: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", reportSchema);
