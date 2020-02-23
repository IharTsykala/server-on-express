const mongoose = require("mongoose")
const Subscription = require("./model-subscriptions")
const fs = require("fs-extra")
const ObjectId = mongoose.Types.ObjectId
const User = require("../users/model-users")

class ServiceSubscription {
  constructor() {}

  getAllServiceSubscription = async function() {
    try {
      return await Subscription.find({})
    } catch (e) {
      console.log(e)
    }
  }

  addSubscription = async function(body) {
    const subscription = new Subscription(body)
    await subscription.save()
    return { subscription }
  }

  updateUserById = async function(id, body) {
    try {
      return await Subscription.findByIdAndUpdate(id, body)
    } catch (e) {
      console.log(e)
    }
  }

  deleteUserById = async function(id) {
    try {
      return await Subscription.deleteOne({ _id: id })
    } catch (e) {
      console.log(e)
    }
  }

  getUserWithObservablesById = async function(id) {
    try {
      return await Subscription.find({ responseSubscriberId: id })
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = ServiceSubscription
