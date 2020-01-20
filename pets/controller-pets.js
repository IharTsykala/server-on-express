const servicePets = require("./service-pets")

class PetsController {
  constructor() {}

  getAllPets = async (req, res) => {
    try {
      const result = await servicePets.getAllPets()
      res.send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  getPetsById = async (req, res) => {
    try {      
      const result = await servicePets.getPetsById(req.params.id)
      res.send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  addPets  = async (req, res) => {
    try {      
      const result = await servicePets.addPets (req.body)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  updatePetsById = async (req, res) => {
    try {
      const result = await servicePets.updatePetsById(req.params.id, req.body)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  } 

  deletePetsById  = async (req, res) => {
    try {
      const result = await servicePets.deletePetsById(req.params.id)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }   
}

module.exports = PetsController
