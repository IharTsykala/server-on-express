const express = require("express")
const AlbumsController = require("./controller-albums")

const albums_controller = new AlbumsController()

const routerAlbums = new express.Router()
routerAlbums.get("/all", albums_controller.getAllAlbums)
routerAlbums.get("/:id", albums_controller.getAlbumsById)
routerAlbums.post("/add", albums_controller.addAlbums)
routerAlbums.put("/update/:id", albums_controller.updateAlbumsById)
routerAlbums.delete("/delete/:id", albums_controller.deleteAlbumsById)

module.exports = routerAlbums
