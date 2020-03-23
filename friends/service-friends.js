const mongoose = require("mongoose")
const Friend = require("./model-friends")
const ObjectId = mongoose.Types.ObjectId
const User = require("../users/model-users")

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

  getArrayFriendsByIdUser = async function({ idLogInUser }) {
    try {
      // const friendsRequest = await Friend.find({
      //   $or: [
      //     { requestFriendId: new ObjectId(idLogInUser) },
      //     { responseFriendId: new ObjectId(idLogInUser) }
      //   ]
      // }).populate("requestFriendId")

      // console.log(friendsRequest)

      //   let friends = []
      //   const friendsRequest = await Friend.find({
      //     requestFriendId: new ObjectId(idLogInUser)
      //   })
      //   friendsRequest.forEach(friend =>
      //     friends.push(new ObjectId(friend.responseFriendId))
      //   )

      //   const friendsResponse = await Friend.find({
      //     responseFriendId: new ObjectId(idLogInUser)
      //   })
      //   friendsResponse.forEach(friend =>
      //     friends.push(new ObjectId(friend.requestFriendId))
      //   )

      //   return await User.find(
      //     { _id: { $in: friends } },
      //     {
      //       login: 1,
      //       role: 1,
      //       firstName: 1,
      //       lastName: 1,
      //       email: 1,
      //       phone: 1,
      //       avatar: 1
      //     }
      //   )

        let friends = await Friend.aggregate([
          {
            $match: {
              $or: [
                { requestFriendId: new ObjectId(idLogInUser) },
                { responseFriendId: new ObjectId(idLogInUser) }
              ]
            }
          },
          {
            $project: {
              _id: 0,
              friends: {
                $cond: {
                  if: {
                    $eq: ["$requestFriendId", new ObjectId(idLogInUser)]
                  },
                  then: "$responseFriendId",
                  else: "$requestFriendId"
                }
              }
            }
          },
          {
            $lookup: {
              from: "users",
              localField: "friends",
              foreignField: "_id",
              as: "friends"
            }
          },
          {
            $unwind: "$friends"
          }
        ])

        return friends.map(friend => {
          delete friend.friends.password
          delete friend.friends.tokens
          delete friend.friends.__v
          return Object.assign({}, friend.friends, { subscriptions: "friend" })
        })
    } catch (e) {
      console.log(e)
    }
  }

  addFriend = async function(body) {
    const friend = new Friend(body)
    await friend.save()
    return { friend }
  }

  // removeFriend = async function({ idLogInUser, IdSecondUser }) {
  //   try {
  //     const friend = {
  //       requestFriendId: new ObjectId(idLogInUser),
  //       responseFriendId: new ObjectId(IdSecondUser)
  //     }
  //     const friendViseVersa = {
  //       requestFriendId: new ObjectId(IdSecondUser),
  //       responseFriendId: new ObjectId(idLogInUser)
  //     }
  //     let findFriend = await Friend.findOne(friend)
  //     if (findFriend === null)
  //       findFriend = await Friend.findOne(friendViseVersa)

  //     return await Friend.deleteOne({
  //       _id: new ObjectId(findFriend._id)
  //     })
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
}

module.exports = ServiceFriend
