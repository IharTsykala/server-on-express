const ServiceMessage = require("./service-messages")

const service = new ServiceMessage()

class MessageController {
  constructor() {}
  getAllMessage = async (req, res) => {
    try {
      const result = await service.getAllMessages()
      res.send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  getFilteredMessages = async (req, res) => {
    try {
      const result = await service.getFilteredMessages(req.params.value)
      res.send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  getMessageById = async (req, res) => {
    try {
      const result = await service.getMessageById(req.params.id)
      res.send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  addMessage = async body => {
    try {
      // console.log(body)
      return await service.addMessage(body)
      // res.status(201).send(result)
    } catch (e) {
      console.log(e)
    }
  }

  updateMessageById = async (req, res) => {
    try {
      const result = await service.updateMessageById(req.params.id, req.body)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }
}

module.exports = MessageController
