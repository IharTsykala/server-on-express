const mongoose = require("mongoose")
const PhotoSchema = new mongoose.Schema({
  name: {
    type: String,
    default: `${new Date().toJSON().slice(0,10).replace(/-/g,'.')}`,
    // required: true
  },

  description: {
    type: String,
    // required: true
  },
  

  // created:{ type: Date, default: new Date().toJSON().slice(0,10).replace(/-/g,'.') }    
  // ,

  ownerUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",    
    required: true
  },

  ownerAlbum: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Albums",    
    required: true
  }
}, {timestamps: true})

const Photo = mongoose.model("Photos", PhotoSchema)
module.exports = Photo
