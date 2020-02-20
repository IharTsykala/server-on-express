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

  // updateFriendById = async (req, res) => {
  //   try {
  //     // console.log(req)
  //     const result = await service.updateFriendById(req.params.id, req.body)
  //     res.status(201).send(result)
  //   } catch (e) {
  //     res.status(400).send({ error: e.message })
  //   }
  // }

  // updateAnotherFriendById = async (req, res) => {
  //   try {
  //     const result = await service.updateFriendById(req.params.id, req.body)
  //     res.status(201).send(result)
  //   } catch (e) {
  //     res.status(400).send({ error: e.message })
  //   }
  // }

  // deleteFriendById = async (req, res) => {
  //   try {
  //     const result = await service.deleteFriendById(req.params.id)
  //     res.status(201).send(result)
  //   } catch (e) {
  //     res.status(400).send({ error: e.message })
  //   }
  // }

  // getFriendPetsById = async (req, res) => {
  //   try {
  //     const result = await service.getFriendPetsById(req.params.id)
  //     res.send(result)
  //   } catch (e) {
  //     res.status(400).send({ error: e.message })
  //   }
  // }

  // getFriendWithPetsById = async (req, res) => {
  //   try {
  //     const result = await service.getFriendWithPetsById(req.params.id)
  //     res.send(result)
  //   } catch (e) {
  //     res.status(400).send({ error: e.message })
  //   }
  // }

  // getFriendWithAlbumsById = async (req, res) => {
  //   try {
  //     // console.log(req)
  //     const result = await service.getFriendWithAlbumsById(req.params.id)
  //     res.send(result)
  //   } catch (e) {
  //     res.status(400).send({ error: e.message })
  //   }
  // }

  // getListAlbumsWithPhotosByFriendID = async (req, res) => {
  //   try {
  //     // console.log(req.params.id)
  //     const result = await service.getListAlbumsWithPhotosByFriendID(
  //       req.params.id
  //     )
  //     res.send(result)
  //   } catch (e) {
  //     res.status(400).send({ error: e.message })
  //   }
  // }

  // getFriendWithPhotosById = async (req, res) => {
  //   try {
  //     const result = await service.getFriendWithPhotosById(req.params.id)
  //     res.send(result)
  //   } catch (e) {
  //     res.status(400).send({ error: e.message })
  //   }
  // }

  // loginFriend = async (req, res) => {
  //   try {
  //     const result = await service.loginFriend(req.body.login, req.body.password)
  //     res.status(201).send(result)
  //   } catch (e) {
  //     res.status(400).send({ error: e.message })
  //   }
  // }

  // logOutCurrentDevice = async (req, res) => {
  //   try {
  //     await service.logOutCurrentDevice(req.Friend, req.token)
  //     res.send({ response: "successfully logout" })
  //   } catch (e) {
  //     res.status(400).send({ error: e.message })
  //   }
  // }

  // logOutAllDevices = async (req, res) => {
  //   try {
  //     await service.logOutAllDevices(req.Friend, req.token)
  //     res.send({ response: "successfully logout" })
  //   } catch (e) {
  //     res.status(400).send({ error: e.message })
  //   }
  // }

  // deleteFriendWithPets = async (req, res) => {
  //   try {
  //     const result = await service.deleteFriendWithPets(req.params.id)
  //     res.status(201).send(result)
  //   } catch (e) {
  //     res.status(400).send({ error: e.message })
  //   }
  // }
}

module.exports = FriendController
