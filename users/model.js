const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({

  // id: {
  //   type: String,
  //   unique: true,
  //   required: true,
  //   trim: true
  // },
  name: {
    type: String,
    required: true
  }  
})

const User = mongoose.model("Users", userSchema)
module.exports = User
