const mongoose = require("mongoose")
const Message = require("./model-messages")

class ServiceMessage {
  constructor() {}

  getAllUsers = async function() {
    try {
      return await Message.find({})
    } catch (e) {
      console.log(e)
    }
  }

  getUserById = async function(id) {
    try {
      return await Message.findById(id)
    } catch (e) {
      console.log(e)
    }
  }

  addMessage = async function(body) {    
    const message = new Message(body)
    return await message.save()    
  }

  updateUserById = async function(id, body) {
    try {
      // console.log(body)
      return await Message.findByIdAndUpdate(id, body)
    } catch (e) {
      console.log(e)
    }
  }

  deleteUserById = async function(id) {
    try {
      if (await fs.pathExists(`public/images/users/${id}`)) {
        await fs.remove(`public/images/users/${id}`)
      }
      return await Message.deleteOne({ _id: id })
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = ServiceMessage
