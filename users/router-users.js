const express = require("express")
const UserController = require("./controller-users.js")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const { validation, schema } = require("../middleware/schemaValidation-user")

const user_controller = new UserController()

const routerUsers = new express.Router()
routerUsers.get("/", auth, user_controller.getAllUser)
routerUsers.get("/:id", auth, user_controller.getUserById)
routerUsers.get("/pets/:id", auth, user_controller.getUserPetsById)
routerUsers.get("/withPets/:id", auth, user_controller.getUserWithPetsById)
routerUsers.get("/withAlbums/:id", auth, user_controller.getUserWithAlbumsById)
routerUsers.get("/withPhotos/:id", auth, user_controller.getUserWithPhotosById)
routerUsers.get("/AlbumsWithPhotos/:id", user_controller.getListAlbumsWithPhotosByUserID)
routerUsers.post("/add", validation(schema), user_controller.addUser)
routerUsers.put(
  "/update/:id",
  validation(schema),
  auth,
  user_controller.updateUserById
)
// router.put('/update-another/:id', admin, user_controller.updateAnotherUserById)
routerUsers.delete("/delete/:id", auth, user_controller.deleteUserById)
routerUsers.post("/login", user_controller.loginUser)
routerUsers.post(
  "/logOutCurrentDevice",
  auth,
  user_controller.logOutCurrentDevice
)
routerUsers.post("/logOutAllDevices", auth, user_controller.logOutAllDevices)
routerUsers.delete(
  "/deleteUserWithPets/:id",
  auth,
  user_controller.deleteUserWithPets
)

module.exports = routerUsers
