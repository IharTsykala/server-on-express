const mongoose = require("mongoose")
const Pet = require("../pets/model-pets")
const User = require("./model-users")
const Friend = require("../friends/model-friends")
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
      // console.log(body)
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

      const length = responseArray.length

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
  getUserAfterPaginationAndSearchAndFilter = async body => {
    try {
      console.log(body)
      if (body.checked && body.valueSearchBox) {
        let friends = await Friend.aggregate([
          {
            $match: {
              $or: [
                { requestFriendId: new ObjectId(body.idLogInUser) },
                { responseFriendId: new ObjectId(body.idLogInUser) }
              ]
            }
          },
          {
            $project: {
              _id: 0,
              friends: {
                $cond: {
                  if: {
                    $eq: ["$requestFriendId", new ObjectId(body.idLogInUser)]
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
          },
          {
            $match: {
              "friends.login": {
                $regex: `${body.valueSearchBox}\.*`,
                $options: "i"
              }
            }
          },
          {
            $skip: (body.numberPage - 1) * body.limitRender
          },
          {
            $limit: body.limitRender
          }
        ])

        let countFriends = await Friend.aggregate([
          {
            $match: {
              $or: [
                { requestFriendId: new ObjectId(body.idLogInUser) },
                { responseFriendId: new ObjectId(body.idLogInUser) }
              ]
            }
          }
        ])
        // console.log(countFriends)
        return friends.map(friend => {
          delete friend.friends.password
          delete friend.friends.tokens
          delete friend.friends.__v
          return Object.assign({}, friend.friends, {
            subscriptions: "friend",
            countUsers: countFriends.length,
            limitRenderUsers: body.limitRender,
            countPage: Math.ceil(countFriends.length / body.limitRender)
          })
        })
      } else if (body.checked && !body.valueSearchBox) {
        // console.log(1)
        let friends = await Friend.aggregate([
          {
            $match: {
              $or: [
                { requestFriendId: new ObjectId(body.idLogInUser) },
                { responseFriendId: new ObjectId(body.idLogInUser) }
              ]
            }
          },
          {
            $project: {
              _id: 0,
              friends: {
                $cond: {
                  if: {
                    $eq: ["$requestFriendId", new ObjectId(body.idLogInUser)]
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
          },
          {
            $skip: (body.numberPage - 1) * body.limitRender
          },
          {
            $limit: body.limitRender
          }
        ])

        let countFriends = await Friend.aggregate([
          {
            $match: {
              $or: [
                { requestFriendId: new ObjectId(body.idLogInUser) },
                { responseFriendId: new ObjectId(body.idLogInUser) }
              ]
            }
          }
        ])

        return friends.map(friend => {
          delete friend.friends.password
          delete friend.friends.tokens
          delete friend.friends.__v
          return Object.assign({}, friend.friends, {
            subscriptions: "friend",
            countUsers: countFriends.length,
            limitRenderUsers: body.limitRender,
            countPage: Math.ceil(countFriends.length / body.limitRender)
          })
        })
      } else if (!body.checked && body.valueSearchBox) {
        // console.log(2)
        let users = await User.aggregate([
          {
            $match: {
              $or: [
                {
                  login: {
                    $regex: `${body.valueSearchBox}\.*`,
                    $options: "i"
                  },
                  _id: { $ne: new ObjectId(body.idLogInUser) }
                }
              ]
            }
          },
          {
            $skip: (body.numberPage - 1) * body.limitRender
          },
          {
            $limit: body.limitRender
          }
        ])

        let countUsers = await User.aggregate([
          {
            $match: {
              $or: [
                {
                  login: {
                    $regex: `${body.valueSearchBox}\.*`,
                    $options: "i"
                  },
                  _id: { $ne: new ObjectId(body.idLogInUser) }
                }
              ]
            }
          }
        ])

        return users.map(user => {
          delete user.password
          delete user.tokens
          delete user.__v
          return Object.assign({}, user, {
            countUsers: countUsers.length,
            limitRenderUsers: body.limitRender,
            countPage: Math.ceil(countUsers.length / body.limitRender)
          })
        })
      } else if (!body.checked & !body.valueSearchBox) {
        let users = await User.aggregate([
          {
            $match: { _id: { $ne: new ObjectId(body.idLogInUser) } }
          },
          {
            $skip: (body.numberPage - 1) * body.limitRender
          },
          {
            $limit: body.limitRender
          }
        ])

        let countUsers = await User.aggregate([
          {
            $match: { _id: { $ne: new ObjectId(body.idLogInUser) } }
          }
        ])

        return users.map(user => {
          delete user.password
          delete user.tokens
          delete user.__v
          return Object.assign({}, user, {
            countUsers: countUsers.length,
            limitRenderUsers: body.limitRender,
            countPage: Math.ceil(countUsers.length / body.limitRender)
          })
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = ServiceUser
