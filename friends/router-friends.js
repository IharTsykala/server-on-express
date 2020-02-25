const express = require("express")
const FriendController = require("./controller-Friends.js")
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

routerFriends.post("/add", auth, friend_controller.addFriend)

module.exports = routerFriends
