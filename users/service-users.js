// const fs = require("fs")
// let obj = JSON.parse(fs.readFileSync('./dataBase.JSON'));
// const jsonStringify = (obj) => fs.writeFileSync('./dataBase.JSON', JSON.stringify(obj, null, 2))
const mongoose = require("mongoose")
const Pet = require("../pets/model-pets")
const User = require("./model-users")

const getAllUsers = async function() {
  try {
    return await User.find({})
  } catch (e) {
    console.log(e)
  }
}

const getUserById = async function(id) {
  try {
    return await User.findById(id)
  } catch (e) {
    console.log(e)
  }
}

const addUser = async function(body) {
  // obj.push(body)
  // jsonStringify(obj)
  // return 'add user'
  const user = new User(body)
  await user.save()
  const token = await user.generateAuthToken()
  return { user, token }
}

const updateUserById = async function(id, body) {
  try {
    return await User.findByIdAndUpdate(id, body)
  } catch (e) {
    console.log(e)
  }
  // const index = obj.findIndex(item=>item.id === body.id)
  // if(index !== -1) {
  //     obj[index] = Object.assign(obj[index], body)
  //     jsonStringify(obj)
  //     return 'user update'
  // } else {
  //     throw new Error('dataBase doesnt this id')
  // }
}

const deleteUserById = async function(id) {
  try {
    return await User.deleteOne({ _id: id })
  } catch (e) {
    console.log(e)
  }
  // const index = obj.findIndex(item=>item.id === id)
  // if(index !== -1) {
  //     obj.splice(index, 1)
  //     jsonStringify(obj)
  //     return 'user delete'
  // } else {
  //     throw new Error('dataBase doesnt this id')
  // }
}

const getUserPetsById = async function(id) {
  try {
    return await Pet.find({ owner: id }).populate("owner")
  } catch (e) {
    console.log(e)
  }
}

const getUserWithPetsById = async function(id) {
  try {
    return await User.aggregate([
      {
        $lookup: {
          from: "pets",
          localField: "_id",
          foreignField: "owner",
          as: "pets"
        }
      },
      {
        $match: { _id: mongoose.Types.ObjectId(id) }
      }
    ])
  } catch (e) {
    console.log(e)
  }
}

const loginUser = async function(login, password) {
  const user = await User.findByCredentials(login, password)
  const token = await user.generateAuthToken()
  return { user, token }
}

const logOutCurrentDevice = async function(req) {
  console.log(req.user)
  req.user.tokens = req.user.tokens.filter(tnk => {
    return tnk.token !== req.token
  })
  await req.user.save()
}

const logOutAllDevices = async function(req) {
  console.log(req)
  const index = await req.user.tokens.findIndex(tnk => tnk.token === req.token)
  console.log(index)
  if (index !== -1) {
    req.user.tokens = []
  } else {
    throw new Error("the token dont exist")
  }
  await req.user.save()
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUserById,
  deleteUserById,
  getUserPetsById,
  getUserWithPetsById,
  loginUser,
  logOutCurrentDevice,
  logOutAllDevices
}
