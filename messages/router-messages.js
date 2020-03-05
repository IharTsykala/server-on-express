const express = require("express")
const MessagesController = require("./controller-messages")

const messages_controller = new MessagesController()

const routerMessages = new express.Router()
// routerMessages.get("/all", messages_controller.getAllMessages)
routerMessages.get("/:id", messages_controller.getMessagesByIdDialog)
routerMessages.post("/add", messages_controller.addMessage)
// routerMessages.put("/update/:id", messages_controller.updateMessagesById)
// routerMessages.delete("/delete/:id", messages_controller.deleteMessagesById)
// routerMessages.get("/withPhotos/:id", messages_controller.getMessagesWithPhotosById)

module.exports = routerMessages