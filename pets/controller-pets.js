const ServicePets = require("./service-pets")

const service = new ServicePets()

class PetsController {
  constructor() {}

  getAllPets = async (req, res) => {
    try {
      const result = await service.getAllPets()
      res.send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  getPetsById = async (req, res) => {
    try {
      const result = await service.getPetsById(req.params.id)
      res.send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  addPets = async (req, res) => {
    try {
      console.log(req.body)
      const result = await service.addPets(req.body)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  updatePetsById = async (req, res) => {
    try {
      const result = await service.updatePetsById(req.params.id, req.body)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  deletePetsById = async (req, res) => {
    try {
      const result = await service.deletePetsById(req.params.id)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }
}

module.exports = PetsController
