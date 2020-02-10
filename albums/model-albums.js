const mongoose = require("mongoose")
const AlbumSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "My photos",
    required: true
  },

  description: {
    type: String,
    // required: true
  },

  createDate: {
    type: String
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  }
})

const Album = mongoose.model("Albums", AlbumSchema)
module.exports = Album
