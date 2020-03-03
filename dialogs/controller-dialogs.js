const ServiceDialog = require("./service-dialogs")

const service = new ServiceDialog()

class DialogController {
  constructor() {}
  getAllDialog = async (req, res) => {
    try {
      const result = await service.getAllDialogs()
      res.send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  getFilteredDialogs = async (req, res) => {
    try {
      const result = await service.getFilteredDialogs(req.params.value)
      res.send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  getDialogById = async (req, res) => {
    try {
      const result = await service.getDialogById(req.params.id)
      res.send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  addDialog = async (req, res) => {
    try {
      // console.log(req.body)
      const result = await service.addDialog(req.body)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  updateDialogById = async (req, res) => {
    try {
      // console.log(req)
      const result = await service.updateDialogById(req.params.id, req.body)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  deleteDialogById = async (req, res) => {
    try {
      const result = await service.deleteDialogById(req.params.id)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }
}

module.exports = DialogController
