// const fs = require("fs")
// let obj = JSON.parse(fs.readFileSync('./dataBase.JSON'));
// const jsonStringify = (obj) => fs.writeFileSync('./dataBase.JSON', JSON.stringify(obj, null, 2))

const User = require("./model.js")

const addUser = async function(body) {
  // obj.push(body)
  // jsonStringify(obj)
  // return 'add user'
  const user = new User(body)
  try {
    await user.save()
  } catch (e) {
    console.log(e)
  }
  return { user }
}

const getUser = async function(id) {
  try {
    return await User.findById(id)
  } catch (e) {
    console.log(e)
  }
}

const getAllUsers = async function() {
  try {
    return await User.find({})
  } catch (e) {
    console.log(e)
  }
}

const updateUser = async function(id, body) {
  console.log(id, body)
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

const delUser = async function(id) {
  console.log(id)
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

module.exports = {
  addUser,
  getUser,
  getAllUsers,
  updateUser,
  delUser
}
