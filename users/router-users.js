const express = require("express")
const UserController = require("./controller-users.js")
const auth = require("../middleware/auth")

const user_controller = new UserController()

const routerUsers = new express.Router()
routerUsers.get("/all", user_controller.getAllUser)
routerUsers.get("/:id", user_controller.getUserById)
routerUsers.get("/pets/:id", user_controller.getUserPetsById)
routerUsers.get("/withPets/:id", user_controller.getUserWithPetsById)
routerUsers.post("/add", user_controller.addUser)
routerUsers.put("/update/:id", user_controller.updateUserById)
routerUsers.delete("/delete/:id", auth, user_controller.deleteUserById)
routerUsers.post("/login", auth, user_controller.loginUser)
routerUsers.post(
  "/logOutCurrentDevice",
  auth,
  user_controller.logOutCurrentDevice
)
routerUsers.post("/logOutAllDevices", auth, user_controller.logOutAllDevices)

module.exports = routerUsers
