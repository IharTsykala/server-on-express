  
const express = require('express')
const UserController = require('./controller')

const user_controller = new UserController()

const router = new express.Router()
router.delete('/delete/:id', user_controller.deleteUser)
router.get('/:id',  user_controller.getUser)
router.get('/',  user_controller.getAllUser)
router.post('/add', user_controller.addUser)
router.put('/update/:id', user_controller.updateUser)

module.exports = router