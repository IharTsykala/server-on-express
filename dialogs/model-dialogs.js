const mongoose = require("mongoose")

const dialogSchema = new mongoose.Schema(
  {
    dialogName: {
      type: String
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        require: true
      }
    ]
  },
  { timeStamps: true }
)

const Dialog = mongoose.model("dialogs", dialogSchema)
module.exports = Dialog
