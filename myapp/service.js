let fs = require('fs');
let obj = JSON.parse(fs.readFileSync('./dataBase.JSON'));

const jsonStringify = (obj) => fs.writeFileSync('./dataBase.JSON', JSON.stringify(obj, null, 2))

const addUser = async function (body) {
    obj.push(body)
    jsonStringify(obj)
    return 'add user'
}

const getUser = async function(id){
    return await obj[--id]    
}

const getAllUsers = async function(){
    return await obj    
}

const updateUser = async function(body) {     
    const index = obj.findIndex(item=>item.id === body.id)
    if(index !== -1) {        
        obj[index] = Object.assign(obj[index], body)        
        jsonStringify(obj)
        return 'user update'
    } else {
        throw new Error('dataBase doesnt this id')
    }
}

const delUser = async function(id){         
    const index = obj.findIndex(item=>item.id === id)       
    if(index !== -1) {        
        obj.splice(index, 1)        
        jsonStringify(obj)
        return 'user delete'
    } else {
        throw new Error('dataBase doesnt this id')
    }
}

module.exports = {
    addUser,
    getUser,
    getAllUsers,
    updateUser,
    delUser   
}