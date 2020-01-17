const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  species: {
    type: String,    
    required: true    
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',   
    required: true
  }  
})

const Animal = mongoose.model("Animals", userSchema)
module.exports = Animal
