const express = require("express")
const PhotosController = require("./controller-photos")

const photos_controller = new PhotosController()

const routerPhotos = new express.Router()
routerPhotos.get("/all", photos_controller.getAllPhotos)
routerPhotos.get("/:id", photos_controller.getPhotosById)
routerPhotos.post("/add", photos_controller.addPhotos)
routerPhotos.put("/update/:id", photos_controller.updatePhotosById)
routerPhotos.delete("/delete/:id", photos_controller.deletePhotosById)

module.exports = routerPhotos
