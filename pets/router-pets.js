  
const express = require('express')
const PetsController = require('./controller-pets')

const pets_controller = new PetsController()

const routerPets = new express.Router()
routerPets.get('/all',  pets_controller.getAllPets)
routerPets.get('/:id',  pets_controller.getPetsById)
routerPets.post('/add', pets_controller.addPets)
routerPets.put('/update/:id', pets_controller.updatePetsById)
routerPets.delete('/delete/:id', pets_controller.deletePetsById)


module.exports = routerPets