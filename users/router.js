  
const express = require('express')
const UserController = require('./controller.js')

const user_controller = new UserController()

const router = new express.Router()
// router.get('/all',  user_controller.getAllUser)
// router.get('/pets', user_controller.getUserPet)
router.get('/:id/pets',  user_controller.getUserIDPets)
// router.get('/:id',  user_controller.getUser)
// router.get('/:id/pets',  user_controller.getUserIDPets)
router.post('/add', user_controller.addUser)
router.put('/update/:id', user_controller.updateUser)
router.delete('/delete/:id', user_controller.deleteUser)

module.exports = router