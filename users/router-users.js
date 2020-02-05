const express = require("express")
const UserController = require("./controller-users.js")
const auth = require("../middleware/auth")
const { validation, schema } = require("../middleware/schemaValidation-user")

const user_controller = new UserController()

const routerUsers = new express.Router()
routerUsers.get("/", user_controller.getAllUser)
routerUsers.get("/:id", auth, user_controller.getUserById)
routerUsers.get("/pets/:id", user_controller.getUserPetsById)
routerUsers.get("/withPets/:id", user_controller.getUserWithPetsById)
routerUsers.post("/add",
 validation(schema), 
 user_controller.addUser)
routerUsers.put(
  "/update/:id",
  validation(schema),
  auth,
  user_controller.updateUserById
)
routerUsers.delete("/delete/:id", auth, user_controller.deleteUserById)
routerUsers.post("/login", user_controller.loginUser)
routerUsers.post(
  "/logOutCurrentDevice",
  auth,
  user_controller.logOutCurrentDevice
)
routerUsers.post("/logOutAllDevices", user_controller.logOutAllDevices)
routerUsers.delete(
  "/deleteUserWithPets/:id",
  auth,
  user_controller.deleteUserWithPets
)

module.exports = routerUsers
