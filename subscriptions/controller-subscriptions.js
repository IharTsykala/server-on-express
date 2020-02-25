const ServiceSubscription = require("./service-subscriptions")

const service = new ServiceSubscription()
class SubscriptionController {
  constructor() {}
  getAllSubscription = async (req, res) => {
    try {
      const result = await service.getAllSubscription()
      res.send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  addSubscription = async (req, res) => {
    try {
      const result = await service.addSubscription(req.body)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  deleteSubscribe = async (req, res) => {
    try {
      const result = await service.deleteSubscribe(req.query)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  getUserWithSubscriptionsById = async (req, res) => {
    try {
      const result = await service.getUserWithSubscriptionsById(req.params.id)
      res.send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  getUserWithObservablesById = async (req, res) => {
    try {
      const result = await service.getUserWithObservablesById(req.params.id)
      res.send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  getStatusUsersSubscribeByID = async (req, res) => {
    try {
      const result = await service.getStatusUsersSubscribeByID(
        req.params.idLogInUser
      )
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }
}

module.exports = SubscriptionController
