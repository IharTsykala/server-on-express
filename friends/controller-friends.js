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

  getLogInUserAllFriends = async (req, res) => {
    try {
      const result = await service.getLogInUserAllFriends(req.query.id)
      res.send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  addFriend = async (req, res) => {
    try {
      console.log(req.body)
      const result = await service.addFriend(req.body)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  // deleteFriendById = async (req, res) => {
  //   try {
  //     const result = await service.deleteFriendById(req.params.id)
  //     res.status(201).send(result)
  //   } catch (e) {
  //     res.status(400).send({ error: e.message })
  //   }
  // }
}

module.exports = FriendController
