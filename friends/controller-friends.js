const ServiceFriend = require("./service-friends")

const service = new ServiceFriend()

class FriendController {
  constructor() {}
  getAllFriend = async (req, res) => {
    try {
      const result = await service.getAllFriends()
      res.send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  // getFilteredFriends = async (req, res) => {
  //   try {
  //     // console.log(req.params.value)
  //     const result = await service.getFilteredFriends(req.params.value)
  //     res.send(result)
  //   } catch (e) {
  //     res.status(400).send({ error: e.message })
  //   }
  // }

  getLogInUserAllFriends = async function(req, res) {    
    try {
      const result = await service.getLogInUserAllFriends(req.query.id)
      res.send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  } 

  getArrayFriendsByIdUser = async function(req, res) {    
    try {
      const result = await service.getArrayFriendsByIdUser(req.query, res)
      res.send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  } 

  addFriend = async (req, res) => {
    try {      
      const result = await service.addFriend(req.body)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
}
  

  removeFriend = async (req, res) => {
    try {        
      const result = await service.removeFriend(req.query)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }
}

module.exports = FriendController
