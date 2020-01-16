const fs = require('fs');
const User = require('./model.js');
// const { MongoClient } = require('mongodb')
// const path = require('path')
// console.log(path.join(__dirname, 'service'))
// let obj = JSON.parse(fs.readFileSync('./dataBase.JSON'));



const jsonStringify = (obj) => fs.writeFileSync('./dataBase.JSON', JSON.stringify(obj, null, 2))

const addUser = async function (body) {    
    // obj.push(body)
    // jsonStringify(obj)
    // return 'add user'
    const user = new User(body)
    console.log(user)
    await user.save()
    // const token = await user.generateAuthToken()
    return {user}  
}

const getUser = async function(params){
    console.log(params)
    return await User.findById(params.id)
}

const getAllUsers = async function(){    
    return await User.find({})     
}

const updateUser = async function(id, body) { 
    console.log(id, body)
    return await User.findByIdAndUpdate(id, body)
    // console.log( User.findByIdAndUpdate(params.id, params.body))  
    // const index = obj.findIndex(item=>item.id === body.id)
    // if(index !== -1) {        
    //     obj[index] = Object.assign(obj[index], body)        
    //     jsonStringify(obj)
    //     return 'user update'
    // } else {
    //     throw new Error('dataBase doesnt this id')
    // }
}

const delUser = async function(id){ 
    console.log(id)
    return await User.deleteOne({_id:id})     
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