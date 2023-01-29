const mongoose = require("mongoose");
const schema = mongoose.Schema;

const chatSchema = new schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    content: {
      type: String,
      trim: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chat", chatSchema);
