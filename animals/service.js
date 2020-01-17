const Animal = require("./model.js")

const addUser = async function(body) {

  console.log(body)  
  const animal = new Animal(body)
  try {
    await animal.save()
  } catch (e) {
    console.log(e)
  }
  return { animal }
}

const getUser = async function(id) {
  try {
    return await Animal.findById(id)
  } catch (e) {
    console.log(e)
  }
}

const getAllUsers = async function() {
  try {
    console.log()
    return await Animal.find({})
  } catch (e) {
    console.log(e)
  }
}

const updateUser = async function(id, body) {
  console.log(id, body)
  try {
    return await Animal.findByIdAndUpdate(id, body)
  } catch (e) {
    console.log(e)
  }  
}

const delUser = async function(id) {  
  try {
    return await Animal.deleteOne({ _id: id })
  } catch (e) {
    console.log(e)
  }  
}

module.exports = {
  addUser,
  getUser,
  getAllUsers,
  updateUser,
  delUser
}
