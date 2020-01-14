  
const express = require('express')
// const auth = require('../middleware/auth')
// const admin = require('../middleware/admin')
// console.log(express)
const UserController = require('./controller')
// console.log(UserController)
const user_controller = new UserController()

const router = new express.Router()

router.delete('/delete/:id', user_controller.deleteUser)
// router.get('/race/:login',auth, user_controller.getUserWithRaces)
// router.get('/registrated/league/:title',auth, user_controller.registratedOnLeague)
// router.get('/league/:login',auth, user_controller.getUserWithLeague)
router.get('/:id',  user_controller.getUser)
router.get('/',  user_controller.getAllUser)

router.post('/add', user_controller.addUser)
// router.post('/login', user_controller.login)
// router.get('/me',auth, user_controller.profile)
// router.post('/logout',auth, user_controller.logout)
router.put('/update/:id', user_controller.updateUser)
// router.get('/:id', admin, user_controller.getUserId)
module.exports = router