const mongoose = require("mongoose")
const SubscriptionSchema = new mongoose.Schema(
  {
    requestSubscriberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },

    responseSubscriberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    }
  },
  { timestamps: { createdAt: "created_at" } }
)

const Subscription = mongoose.model("Subscriptions", SubscriptionSchema)
module.exports = Subscription
