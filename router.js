  
const express = require('express')
const UserController = require('./controller')

const user_controller = new UserController()

const router = new express.Router()
router.get('/all',  user_controller.getAllUser)
router.get('/:id',  user_controller.getUser)
router.post('/add', user_controller.addUser)
router.put('/update/:id', user_controller.updateUser)
router.delete('/delete/:id', user_controller.deleteUser)

module.exports = router