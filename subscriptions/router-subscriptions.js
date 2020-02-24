const express = require("express")
const SubscriptionController = require("./controller-subscriptions.js")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const { validation, schema } = require("../middleware/schemaValidation-user")
const subscription_controller = new SubscriptionController()
const routerSubscriptions = new express.Router()

routerSubscriptions.get("/", auth, subscription_controller.getAllSubscription)
routerSubscriptions.get(
  "/withSubscriptions/:id",
  // auth,
  subscription_controller.getUserWithSubscriptionsById
)

routerSubscriptions.get(
  "/withObservables/:id",
  auth,
  subscription_controller.getUserWithObservablesById
)

routerSubscriptions.get(
  "/getStatusUsersSubscribeByID/:id",
  auth,
  subscription_controller.getStatusUsersSubscribeByID
)

routerSubscriptions.post("/add", subscription_controller.addSubscription)

routerSubscriptions.post("/deleteSubscribe", subscription_controller.deleteSubscribe)

module.exports = routerSubscriptions
