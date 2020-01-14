// const League = require('../models/league');
// const User = require('./dataBase.JSON');
// console.log()
// const fs = require('fs')
// fs.readFileSync('./dataBase.JSON', 'utf8')
let fs = require('fs');
let obj = JSON.parse(fs.readFileSync('./dataBase.JSON'));


// const getUsers = ()

// class User {
//     constructor(body) {
//         this.id = body.id;
//         this.name = body.name
//     }


// }

const add = async function (body) {
    // console.log(await body)
    // const user = new User(body)
    obj.push(body)
    fs.writeFileSync('./dataBase.JSON', JSON.stringify(obj))

    // console.log(await req)
    // console.log(user)
    // await user.save()
    // const token = await user.generateAuthToken()
    return {obj}  
}

const get = async function(id){
    return await obj[--id]    
}
const getAllUsers = async function(){
    return await obj    
}


const update = async function(body) {
    
    const index = obj.findIndex(item=>item.id === body.id)

    if(index !== -1) {
        console.log(body)
        console.log(obj)
        obj[index] = Object.assign(obj[index], body)        
        fs.writeFileSync('./dataBase.JSON', JSON.stringify(obj))
        return 'user update'
    } else {
        throw new Error('dataBase doesnt this id')
    }
    
    // obj.push(body)

    // return await User.findByIdAndUpdate(req.params.id, req.body)
}

// const login = async function(req){
//     const user = await User.findByCredentials(req.body.login, req.body.password) 
//     const token = await user.generateAuthToken()    
//     return {user, token}
// }

// const logout = async function(req){
//     req.user.tokens = req.user.tokens.filter((token) => {
//         return token.token !== req.token

//     })
//     await req.user.save()
// }

const del = async function(id){
    
    console.log(id)
    const index = obj.findIndex(item=>item.id === id)

    if(index !== -1) {
        // console.log(body)
        console.log(obj)
        obj.splice(index, 1)        
        fs.writeFileSync('./dataBase.JSON', JSON.stringify(obj))
        return 'user delete'
    } else {
        throw new Error('dataBase doesnt this id')
    }
}

// const getById = async function(req) {
//     return await User.findById(req.params.id)
// }

// const getStage = async function(req){
//     const login = req.params.login 
//     const result = await User.aggregate([
//         {$match: {login: login}},
//         {
//             $lookup: {
//                 from: "races",
//                 localField: "_id",
//                 foreignField: "user",
//                 as: "race"
//             }
//         }
//     ])
//     return result
// }

// const getLeague = async function(req){
//     const login = req.params.login   
//     const result = await User.aggregate([
//         {$match: {login: login}},
//         {
//             $lookup: {
//                 from: "leagues",
//                 localField: "_id",
//                 foreignField: "users",
//                 as: "league"
//             }
//         }
//     ])
//     return result
// }

// const regLeague = async function(req){
//     const id = req.user._id
//     const title = req.params.title
//     const league = await League.findOne({title})
//         if(!league){
//             throw new Error('unknown league')
//         }
//         const flag = league.users.every(el => el.toString() !== id.toString())
//         if(flag){
//             league.users.push(id)
//             await league.save()
//             return {responce: "sucsessfully registrate"}
//         } else {
//             return {responce: "you was registrate"}
//         }
// }

module.exports = {
    add,
    get,
    getAllUsers,
    update,
    del,
    // login,
    // logout,
    // getById,
    // getStage,
    // getLeague,
    // regLeague
}