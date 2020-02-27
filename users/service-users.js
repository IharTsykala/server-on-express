const mongoose = require("mongoose")
const Pet = require("../pets/model-pets")
const User = require("./model-users")
const Album = require("../albums/model-albums")
const ObjectId = mongoose.Types.ObjectId
const fs = require("fs-extra")

class ServiceUser {
  constructor() {}

  getAllUsers = async function() {
    try {
      return await User.find({})
    } catch (e) {
      console.log(e)
    }
  }

  getFilteredUsers = async function(value) {
    try {
      return await User.find({
        login: { $regex: `${value}\.*`, $options: "i" }
      })
    } catch (e) {
      console.log(e)
    }
  }

  getUserById = async function(id) {
    try {
      return await User.findById(id)
    } catch (e) {
      console.log(e)
    }
  }

  addUser = async function(body) {
    const user = new User(body)
    await user.save()
    if (!(await fs.pathExists(`public/images/users/${user._id}`))) {
      await fs.ensureDir(`public/images/users/${user._id}`)
    }
    const token = await user.generateAuthToken()
    return { user, token }
  }

  updateUserById = async function(id, body) {
    try {
      console.log(body)
      return await User.findByIdAndUpdate(id, body)
    } catch (e) {
      console.log(e)
    }
  }

  deleteUserById = async function(id) {
    try {
      if (await fs.pathExists(`public/images/users/${id}`)) {
        await fs.remove(`public/images/users/${id}`)
      }
      return await User.deleteOne({ _id: id })
    } catch (e) {
      console.log(e)
    }
  }

  getUserPetsById = async function(id) {
    try {
      return await Pet.find({ owner: id }).populate("owner")
    } catch (e) {
      console.log(e)
    }
  }

  getUserWithPetsById = async function(id) {
    try {
      return await User.aggregate([
        {
          $match: { _id: new ObjectId(id) }
        },
        {
          $lookup: {
            from: "pets",
            localField: "_id",
            foreignField: "owner",
            as: "pets"
          }
        }
      ])
    } catch (e) {
      console.log(e)
    }
  }

  getUserWithAlbumsById = async function(id) {
    try {
      return await User.aggregate([
        {
          $match: { _id: new ObjectId(id) }
        },
        {
          $lookup: {
            from: "albums",
            localField: "_id",
            foreignField: "ownerUser",
            as: "albums"
          }
        }
      ])
    } catch (e) {
      console.log(e)
    }
  }

  getListAlbumsWithPhotosByUserID = async function(id) {
    try {
      return await Album.aggregate([
        {
          $match: { ownerUser: ObjectId(id) }
        },
        {
          $lookup: {
            from: "photos",
            localField: "_id",
            foreignField: "ownerAlbum",
            as: "photos"
          }
        }
      ])
    } catch (e) {
      console.log(e)
    }
  }

  getUserWithPhotosById = async function(id) {
    try {
      return await User.aggregate([
        {
          $match: { _id: new ObjectId(id) }
        },
        {
          $lookup: {
            from: "photos",
            localField: "_id",
            foreignField: "ownerUser",
            as: "photos"
          }
        }
      ])
    } catch (e) {
      console.log(e)
    }
  }

  loginUser = async function(login, password) {
    const user = await User.findByCredentials(login, password)
    const token = await user.generateAuthToken()
    return { user, token }
  }

  logOutCurrentDevice = async function(user, currentToken) {
    user.tokens = await user.tokens.filter(tkn => {
      return tkn.token !== currentToken
    })
    await user.save()
  }

  logOutAllDevices = async function(user, currentToken) {
    const ind = await user.tokens.findIndex(tkn => tkn.token === currentToken)
    if (ind !== -1) {
      user.tokens = []
    } else {
      throw new Error("the token don't exist")
    }
    await user.save()
  }

  deleteUserWithPets = async function(id) {
    try {
      const deletePets = await Pet.deleteMany({ owner: id })
      const deleteUser = await User.deleteOne({ _id: id })
      return deletePets, deleteUser
    } catch (e) {
      console.log(e)
    }
  }

  getUserWithSubscriptionsById = async function(id) {
    try {
      let responseArray = await User.aggregate([
        {
          $lookup: {
            from: "subscriptions",
            localField: "_id",
            foreignField: "responseSubscriberId",
            as: "subscribers"
          }
        },
        {
          $project: {
            subscribers: {
              $cond: {
                if: {
                  $size: "$subscribers"
                },
                then: {
                  $size: {
                    $filter: {
                      input: "$subscribers",
                      as: "subscribers",
                      cond: {
                        $eq: [
                          "$$subscribers.requestSubscriberId",
                          new ObjectId(id)
                        ]
                      }
                    }
                  }
                },
                else: false
              }
            },
            login: 1,
            role: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            phone: 1,
            avatar: 1
          }
        },
        {
          $lookup: {
            from: "subscriptions",
            localField: "_id",
            foreignField: "requestSubscriberId",
            as: "observers"
          }
        },
        {
          $addFields: {
            observers: {
              $cond: {
                if: {
                  $size: "$observers"
                },
                then: {
                  $size: {
                    $filter: {
                      input: "$observers",
                      as: "observers",
                      cond: {
                        $eq: [
                          "$$observers.responseSubscriberId",
                          new ObjectId(id)
                        ]
                      }
                    }
                  }
                },
                else: false
              }
            }
          }
        },
        {
          $lookup: {
            from: "friends",
            localField: "_id",
            foreignField: "responseFriendId",
            as: "requestFriends"
          }
        },
        {
          $addFields: {
            requestFriends: {
              $cond: {
                if: {
                  $size: "$requestFriends"
                },
                then: {
                  $size: {
                    $filter: {
                      input: "$requestFriends",
                      as: "requestFriends",
                      cond: {
                        $eq: [
                          "$$requestFriends.requestFriendId",
                          new ObjectId(id)
                        ]
                      }
                    }
                  }
                },
                else: false
              }
            }
          }
        },
        {
          $lookup: {
            from: "friends",
            localField: "_id",
            foreignField: "requestFriendId",
            as: "responseFriends"
          }
        },
        {
          $addFields: {
            responseFriends: {
              $cond: {
                if: {
                  $size: "$responseFriends"
                },
                then: {
                  $size: {
                    $filter: {
                      input: "$responseFriends",
                      as: "responseFriends",
                      cond: {
                        $eq: [
                          "$$responseFriends.responseFriendId",
                          new ObjectId(id)
                        ]
                      }
                    }
                  }
                },
                else: false
              }
            }
          }
        }
      ])

      return responseArray.map(user => {
        if (user.subscribers)
          user = Object.assign({}, user, {
            subscriptions: "subscriber"
          })
        if (user.observers)
          user = Object.assign({}, user, { subscriptions: "observer" })
        if (user.responseFriends)
          user = Object.assign({}, user, { subscriptions: "friend" })
        if (user.requestFriends)
          user = Object.assign({}, user, { subscriptions: "friend" })
        delete user.subscribers
        delete user.observers
        delete user.responseFriends
        delete user.requestFriends
        return user
      })
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = ServiceUser

// getUserWithSubscriptionsById2 = async function(id) {
//   try {
//     // console.log(id)
//     let responseArray = await User.aggregate([
//       {
//         $lookup: {
//           from: "subscriptions",
//           localField: "_id",
//           foreignField: "responseSubscriberId",
//           as: "subscriptions"
//         }
//       },
//       {
//         $project: {
//           subscriptions: {
//             $cond: {
//               if: {
//                 $size: "$subscriptions"
//               },
//               then: {
//                 $map: {
//                   input: "$subscriptions",
//                   as: "subscriptions",
//                   in: [
//                     "$$subscriptions.requestSubscriberId",
//                     id,
//                     {
//                       $cond: {
//                         if: {
//                           $gte: ["$$subscriptions.requestSubscriberId", id]
//                         },
//                         then: "subscriber",
//                         else: false
//                       }
//                     }
//                   ]
//                 }
//               },
//               else: false
//             }
//           },
//           login: 1,
//           role: 1,
//           firstName: 1,
//           lastName: 1,
//           email: 1,
//           phone: 1,
//           avatar: 1
//         }
//       },
//       {
//         $lookup: {
//           from: "subscriptions",
//           localField: "_id",
//           foreignField: "requestSubscriberId",
//           as: "observers"
//         }
//       },
//       {
//         $addFields: {
//           observers: {
//             $cond: {
//               if: {
//                 $size: "$observers"
//               },
//               then: {
//                 $map: {
//                   input: "$observers",
//                   as: "observers",
//                   in: [
//                     "$$observers.responseSubscriberId",
//                     id,
//                     {
//                       $cond: {
//                         if: {
//                           $gte: ["$$observers.responseSubscriberId", id]
//                         },
//                         then: "observer",
//                         else: false
//                       }
//                     }
//                   ]
//                 }
//               },
//               else: false
//             }
//           }
//         }
//       },
//       {
//         $lookup: {
//           from: "friends",
//           localField: "_id",
//           foreignField: "responseFriendId",
//           as: "responseFriends"
//         }
//       },
//       {
//         $addFields: {
//           responseFriends: {
//             $cond: {
//               if: {
//                 $size: "$responseFriends"
//               },
//               then: {
//                 $map: {
//                   input: "$responseFriends",
//                   as: "responseFriends",
//                   in: [
//                     "$$responseFriends.requestFriendId",
//                     id,
//                     {
//                       $cond: {
//                         if: {
//                           $gte: ["$$responseFriends.requestFriendId", id]
//                         },
//                         then: "responseFriends",
//                         else: false
//                       }
//                     }
//                   ]
//                 }
//               },
//               else: false
//             }
//           }
//         }
//       },
//       {
//         $lookup: {
//           from: "friends",
//           localField: "_id",
//           foreignField: "requestFriendId",
//           as: "requestFriends"
//         }
//       },
//       {
//         $addFields: {
//           requestFriends: {
//             $cond: {
//               if: {
//                 $size: "$requestFriends"
//               },
//               then: {
//                 $map: {
//                   input: "$requestFriends",
//                   as: "requestFriends",
//                   in: [
//                     "$$requestFriends.responseFriendId",
//                     id,
//                     {
//                       $cond: {
//                         if: {
//                           $gte: ["$$requestFriends.responseFriendId", id]
//                         },
//                         then: "requestFriends",
//                         else: false
//                       }
//                     }
//                   ]
//                 }
//               },
//               else: false
//             }
//           }
//         }
//       }
//     ])

//     responseArray = responseArray.map(user => {
//       if (Array.isArray(user.subscriptions)) {
//         user.subscriptions.map(item => {
//           if (item[0] == id && item[2] == "subscriber") {
//             user = Object.assign({}, user, { subscriptions: "subscriber" })
//           }
//         })
//       }

//       if (Array.isArray(user.observers)) {
//         user.observers.map(item => {
//           if (item[0] == id && item[2] == "observer") {
//             user = Object.assign({}, user, { subscriptions: "observer" })
//           }
//         })
//       }

//       if (Array.isArray(user.responseFriends)) {
//         user.responseFriends = user.responseFriends.map(item => {
//           if (item[0] == id && item[2] == "responseFriends") {
//             user = Object.assign({}, user, { subscriptions: "friend" })
//           }
//         })
//       }

//       if (Array.isArray(user.requestFriends)) {
//         user.responseFriends = user.requestFriends.map(item => {
//           if (item[0] == id && item[2] == "requestFriends") {
//             user = Object.assign({}, user, { subscriptions: "friend" })
//           }
//         })
//       }

//       if (user === null) return user
//       else {
//         delete user.observers
//         delete user.responseFriends
//         delete user.requestFriends
//         if (Array.isArray(user.subscriptions)) user.subscriptions = false
//         return user
//       }
//     })
//     return responseArray
//   } catch (e) {
//     console.log(e)
//   }
// }
