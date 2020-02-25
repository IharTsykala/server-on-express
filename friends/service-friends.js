const mongoose = require("mongoose")
const Friend = require("./model-friends")
const ObjectId = mongoose.Types.ObjectId

class ServiceFriend {
  constructor() {}

  getAllFriends = async function() {
    try {
      return await Friend.find({})
    } catch (e) {
      console.log(e)
    }
  }

  // getFilteredFriends = async function(value) {
  //   try {
  //     return await Friend.find({
  //       login: { $regex: `${value}\.*`, $options: "i" }
  //     })
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  getLogInUserAllFriends = async function(id) {
    try {
      // console.log(id)
      return await Friend.aggregate([
        {
          $match: {
            $or: [
              { requestFriendId: new ObjectId(id) },
              { responseFriendId: new ObjectId(id) }
            ]
          }
        }
      ])
    } catch (e) {
      console.log(e)
    }
  }

  addFriend = async function(body) {
    const friend = new Friend(body)
    await friend.save()
    return { friend }
  }

  // deleteFriendById = async function(id) {
  //   try {
  //     if (await fs.pathExists(`public/images/Friends/${id}`)) {
  //       await fs.remove(`public/images/Friends/${id}`)
  //     }
  //     return await Friend.deleteOne({ _id: id })
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
}

module.exports = ServiceFriend
