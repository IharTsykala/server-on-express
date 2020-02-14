const mongoose = require("mongoose")
const PhotoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: `${new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, ".")}`
      // required: true
    },

    description: {
      type: String
    },

    ownerUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },

    url: {
      type: String
    },

    ownerAlbum: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Albums",
      required: true
    }
  },
  { timestamps: {createdAt: 'created_at'}}
)

const Photo = mongoose.model("Photos", PhotoSchema)
module.exports = Photo
