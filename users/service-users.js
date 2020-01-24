const mongoose = require("mongoose")
const Pet = require("../pets/model-pets")
const User = require("./model-users")
const ObjectId = mongoose.Types.ObjectId

class ServiceUser {
  constructor() {}

  getAllUsers = async function() {
    try {
      return await User.find({})
    } catch (e) {
      console.log(e)
    }
  }

  getUserById = async function(id) {
    try {
      return await User.findById(id)
    } catch (e) {
      console.log(e)
    }
  }

  addUser = async function(body) {
    const user = new User(body)
    await user.save()
    const token = await user.generateAuthToken()
    return { user, token }
  }

  updateUserById = async function(id, body) {
    try {
      return await User.findByIdAndUpdate(id, body)
    } catch (e) {
      console.log(e)
    }
  }

  deleteUserById = async function(id) {
    try {
      return await User.deleteOne({ _id: id })
    } catch (e) {
      console.log(e)
    }
  }

  getUserPetsById = async function(id) {
    try {
      return await Pet.find({ owner: id }).populate("owner")
    } catch (e) {
      console.log(e)
    }
  }

  getUserWithPetsById = async function(id) {
    try {
      return await User.aggregate([
        {
          $match: { _id: new ObjectId(id) }
        },
        {
          $lookup: {
            from: "pets",
            localField: "_id",
            foreignField: "owner",
            as: "pets"
          }
        }
      ])
    } catch (e) {
      console.log(e)
    }
  }

  loginUser = async function(login, password) {
    const user = await User.findByCredentials(login, password)
    const token = await user.generateAuthToken()
    return { user, token }
  }

  logOutCurrentDevice = async function(user, currentToken) {
    user.tokens = await user.tokens.filter(tkn => {
      return tkn.token !== currentToken
    })
    await user.save()
  }

  logOutAllDevices = async function(user, currentToken) {
    const ind = await user.tokens.findIndex(tkn => tkn.token === currentToken)
    if (ind !== -1) {
      user.tokens = []
    } else {
      throw new Error("the token dont exist")
    }
    await user.save()
  }

  deleteUserWithPets =async function(id) {
    try {
       const deletePets = await Pet.deleteMany({ owner: id })
       const deleteUser = await User.deleteOne({ _id: id })
       return (deletePets, deleteUser)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = ServiceUser
