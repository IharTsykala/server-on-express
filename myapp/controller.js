const service = require('./service')

class UserController {
    constructor(){}
    addUser = async (req, res) => {
        try {
            const result = await service.addUser(req.body)            
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
    deleteUser = async (req, res) => {
        try {
            const result = await service.delUser(req.params.id)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    updateUser = async (req, res) => {
        try {            
            const result = await service.updateUser(req.body)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }    
    getUser = async (req, res) => {
        try {            
            const result = await service.getUser(req.params.id)
            res.send(result)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
    getAllUser = async (req, res) => {
        try {            
            const result = await service.getAllUsers()            
            res.send(result)            
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
}

module.exports = UserController;