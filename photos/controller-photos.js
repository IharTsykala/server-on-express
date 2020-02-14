const ServicePhotos = require("./service-photos")

const service = new ServicePhotos()

class PhotosController {
  constructor() {}

  getAllPhotos = async (req, res) => {
    try {
      const result = await service.getAllPhotos()
      res.send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  getPhotosById = async (req, res) => {
    try {
      const result = await service.getPhotosById(req.params.id)
      res.send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  addPhotos = async (req, res) => {
    try {
      const result = await service.addPhotos(req.body)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  addPhotosIntoAlbum = async (req, res) => {
    try {
      const result = await service.addPhotosIntoAlbum(req.body)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  updatePhotosById = async (req, res) => {
    try {
      // console.log(req)
      const result = await service.updatePhotosById(req.params.id, req.body)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  deletePhotosById = async (req, res) => {
    try {      
      const token = req.header("Authorization").replace("Bearer ", "")
      const result = await service.deletePhotosById(req.params.id, token)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }
}

module.exports = PhotosController
