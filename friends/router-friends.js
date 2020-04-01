const express = require("express")
const FriendController = require("./controller-friends.js")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")

const friend_controller = new FriendController()

const routerFriends = new express.Router()
routerFriends.get("/", auth, friend_controller.getAllFriend)

routerFriends.get(
  "/logInUserAllFriends",
  auth,
  friend_controller.getLogInUserAllFriends
)

routerFriends.get(
  "/getArrayFriendsByIdUser",
  auth,
  friend_controller.getArrayFriendsByIdUser
)

routerFriends.post("/add", auth, friend_controller.addFriend)

routerFriends.delete("/removeFriend", friend_controller.removeFriend)

module.exports = routerFriends
