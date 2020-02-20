const mongoose = require("mongoose")
const friendSchema = new mongoose.Schema(
  {
    requestFriendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },

    responseFriendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    }
  },
  { timestamps: { createdAt: "created_at" } }
)

const Friend = mongoose.model("Friends", friendSchema)
module.exports = Friend
