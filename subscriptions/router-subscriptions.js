const express = require("express")
const SubscriptionController = require("./controller-subscriptions.js")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const { validation, schema } = require("../middleware/schemaValidation-user")

const subscription_controller = new SubscriptionController()

const routerSubscriptions = new express.Router()
routerSubscriptions.get("/", auth, subscription_controller.getAllSubscription)
// routerUsers.get("/filter/:value", auth, user_controller.getFilteredUsers)
// routerUsers.get("/:id", auth, user_controller.getUserById)
// routerUsers.get("/pets/:id", auth, user_controller.getUserPetsById)
routerSubscriptions.get(
  "/withSubscriptions/:id",
  auth,
  subscription_controller.getUserWithSubscriptionsById
)
routerSubscriptions.get(
  "/withObservables/:id",
  auth,
  subscription_controller.getUserWithObservablesById
)

// routerUsers.get("/withAlbums/:id", auth, user_controller.getUserWithAlbumsById)
// routerUsers.get("/withPhotos/:id", auth, user_controller.getUserWithPhotosById)
// routerUsers.get("/AlbumsWithPhotos/:id", user_controller.getListAlbumsWithPhotosByUserID)
routerSubscriptions.post("/add", auth, subscription_controller.addSubscription)
// routerUsers.put(
//   "/update/:id",
//   validation(schema),
//   auth,
//   user_controller.updateUserById
// )
// // router.put('/update-another/:id', admin, user_controller.updateAnotherUserById)
// routerUsers.delete("/delete/:id", auth, user_controller.deleteUserById)
// routerUsers.post("/login", user_controller.loginUser)
// routerUsers.post(
//   "/logOutCurrentDevice",
//   auth,
//   user_controller.logOutCurrentDevice
// )
// routerUsers.post("/logOutAllDevices", auth, user_controller.logOutAllDevices)
// routerUsers.delete(
//   "/deleteUserWithPets/:id",
//   auth,
//   user_controller.deleteUserWithPets
// )

module.exports = routerSubscriptions
