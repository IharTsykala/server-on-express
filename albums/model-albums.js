const mongoose = require("mongoose")
const AlbumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // default: ``,
      required: true
    },

    description: {
      type: String
      // required: true
    },

    avatar: {
      type: String
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Album = mongoose.model("Albums", AlbumSchema)
module.exports = Album
