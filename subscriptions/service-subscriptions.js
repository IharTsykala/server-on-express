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

  deleteSubscribe = async function({idLogInUser,IdObserversUser}) {
    try {
      const subscribe = {
        requestSubscriberId: new ObjectId(idLogInUser),
        responseSubscriberId: new ObjectId(IdObserversUser)
      }
      const findSubscribe = await Subscription.findOne(subscribe)     

      return await Subscription.deleteOne({"_id": new ObjectId(findSubscribe._id)})
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
