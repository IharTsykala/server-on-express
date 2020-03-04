const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String
    },
    idDialog: {
      type: mongoose.Schema.Types.ObjectId
    },
    authorLogin: {
      type: String
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId
    },
    whom: {
      type: mongoose.Schema.Types.ObjectId
    }
  },
  { timeStamps: true }
)

const Message = mongoose.model("Messages", messageSchema)
module.exports = Message
 