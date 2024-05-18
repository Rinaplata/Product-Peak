const { Schema, model } = require("mongoose");

const FollowerSchema = Schema({
  follow: {
    type: Array,
  },
  target: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Follower", FollowerSchema);
