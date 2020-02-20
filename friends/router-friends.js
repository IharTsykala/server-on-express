const express = require("express")
const FriendController = require("./controller-Friends.js")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")

const friend_controller = new FriendController()

const routerFriends = new express.Router()
routerFriends.get("/", auth, friend_controller.getAllFriend)
// routerFriends.get("/filter/:value", auth, Friend_controller.getFilteredFriends)
routerFriends.get("/logInUserAllFriends", auth, friend_controller.getLogInUserAllFriends)
// routerFriends.get("/pets/:id", auth, Friend_controller.getFriendPetsById)
// routerFriends.get("/withFriends/:id", auth, Friend_controller.getFriendWithPetsById)
// routerFriends.get("/withAlbums/:id", auth, Friend_controller.getFriendWithAlbumsById)
// routerFriends.get("/withPhotos/:id", auth, Friend_controller.getFriendWithPhotosById)

// routerFriends.get(
//   "/AlbumsWithPhotos/:id",
//   Friend_controller.getListAlbumsWithPhotosByFriendID
// )
routerFriends.post("/add", auth, friend_controller.addFriend)
// routerFriends.put(
//   "/update/:id",
//   validation(schema),
//   auth,
//   Friend_controller.updateFriendById
// )
// router.put('/update-another/:id', admin, Friend_controller.updateAnotherFriendById)
// routerFriends.delete("/delete/:id", auth, Friend_controller.deleteFriendById)
// routerFriends.post("/login", Friend_controller.loginFriend)
// routerFriends.post(
//   "/logOutCurrentDevice",
//   auth,
//   Friend_controller.logOutCurrentDevice
// )
// routerFriends.post("/logOutAllDevices", auth, Friend_controller.logOutAllDevices)
// routerFriends.delete(
//   "/deleteFriendWithPets/:id",
//   auth,
//   Friend_controller.deleteFriendWithPets
// )

module.exports = routerFriends
