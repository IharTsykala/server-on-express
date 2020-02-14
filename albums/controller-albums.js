const ServiceAlbums = require("./service-albums")

const service = new ServiceAlbums()

class AlbumsController {
  constructor() {}

  getAllAlbums = async (req, res) => {
    try {
      const result = await service.getAllAlbums()
      res.send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  getAlbumsById = async (req, res) => {
    try {
      const result = await service.getAlbumsById(req.params.id)
      console.log(result)
      res.send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  addAlbums = async (req, res) => {
    try {
      const result = await service.addAlbums(req.body)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  updateAlbumsById = async (req, res) => {
    try {
      const result = await service.updateAlbumsById(req.params.id, req.body)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  deleteAlbumsById = async (req, res) => {
    try {
      console.log(req.params.id)
      const result = await service.deleteAlbumsById(req.params.id)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  getAlbumWithPhotosById = async (req, res) => {
    try {
      // console.log(req.params.id)
      const result = await service.getAlbumWithPhotosById(req.params.id)
      res.send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }  
}

module.exports = AlbumsController
