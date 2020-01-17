  
const express = require('express')
const AnimalController = require('./controller')

const animal_controller = new AnimalController()

const router = new express.Router()
router.get('/all',  animal_controller.getAllUser)
router.get('/:id',  animal_controller.getUser)
router.post('/add', animal_controller.addUser)
router.put('/update/:id', animal_controller.updateUser)
router.delete('/delete/:id', animal_controller.deleteUser)


module.exports = router