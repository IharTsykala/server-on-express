const express = require("express")
const DialogController = require("./controller-dialogs.js")
const auth = require("../middleware/auth")

const dialog_controller = new DialogController()

const routerDialogs = new express.Router()
routerDialogs.get("/", dialog_controller.getAllDialog)
routerDialogs.get("/:id", dialog_controller.getAllDialogsByIdUser)
routerDialogs.post("/add", dialog_controller.addDialog)
routerDialogs.put("/update/:id", auth, dialog_controller.updateDialogById)
routerDialogs.delete("/delete/:id", auth, dialog_controller.deleteDialogById)

module.exports = routerDialogs
