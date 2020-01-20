const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  species: {
    type: String,    
    required: true    
  },
  name: {
    type: String,    
    required: true    
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',   
    required: true
  }  
})

const Pet = mongoose.model("Pets", userSchema)
module.exports = Pet
