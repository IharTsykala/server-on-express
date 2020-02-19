const mongoose = require("mongoose")
const SubscribeSchema = new mongoose.Schema(
  {
    subscriberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },

    observableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    }
  },
  { timestamps: { createdAt: "created_at" } }
)

const Subscribe = mongoose.model("Subscriptions", SubscribeSchema)
module.exports = Subscribe
