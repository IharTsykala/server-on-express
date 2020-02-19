const mongoose = require("mongoose")
const Subscription = require("./model-subscriptions")
const fs = require("fs-extra")

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
      console.log(body)
      return await Subscription.findByIdAndUpdate(id, body)
    } catch (e) {
      console.log(e)
    }
  }


  //

  deleteUserById = async function(id) {
    try {      
      return await Subscription.deleteOne({ _id: id })
    } catch (e) {
      console.log(e)
    }
  }

  getUserWithSubscriptionsById = async function(id) {
    try {
      return await Subscription.find({ subscriberId: id })
    } catch (e) {
      console.log(e)
    }
  }

  getUserWithObservablesById = async function(id) {
    try {
      return await Subscription.find({ observableId: id })
    } catch (e) {
      console.log(e)
    }
  }

//   getUserWithPetsById = async function(id) {
//     try {
//       return await User.aggregate([
//         {
//           $match: { _id: new ObjectId(id) }
//         },
//         {
//           $lookup: {
//             from: "pets",
//             localField: "_id",
//             foreignField: "owner",
//             as: "pets"
//           }
//         }
//       ])
//     } catch (e) {
//       console.log(e)
//     }
//   }

//   getUserWithAlbumsById = async function(id) {
//     try {
//       return await User.aggregate([
//         {
//           $match: { _id: new ObjectId(id) }
//         },
//         {
//           $lookup: {
//             from: "albums",
//             localField: "_id",
//             foreignField: "ownerUser",
//             as: "albums"
//           }
//         }
//       ])
//     } catch (e) {
//       console.log(e)
//     }
//   }

//   getListAlbumsWithPhotosByUserID = async function(id) {
//     try {      
//       return await Album.aggregate([
//         {
//           $match: { ownerUser: ObjectId(id) }
//         },
//         {
//           $lookup: {
//             from: "photos",
//             localField: "_id",
//             foreignField: "ownerAlbum",
//             as: "photos"
//           }
//         }
//       ])
//     } catch (e) {
//       console.log(e)
//     }
//   }


//   getUserWithPhotosById = async function(id) {
//     try {
//       return await User.aggregate([
//         {
//           $match: { _id: new ObjectId(id) }
//         },
//         {
//           $lookup: {
//             from: "photos",
//             localField: "_id",
//             foreignField: "ownerUser",
//             as: "photos"
//           }
//         }
//       ])
//     } catch (e) {
//       console.log(e)
//     }
//   }

//   loginUser = async function(login, password) {
//     const user = await User.findByCredentials(login, password)
//     const token = await user.generateAuthToken()
//     return { user, token }
//   }

//   logOutCurrentDevice = async function(user, currentToken) {
//     user.tokens = await user.tokens.filter(tkn => {
//       return tkn.token !== currentToken
//     })
//     await user.save()
//   }

//   logOutAllDevices = async function(user, currentToken) {
//     const ind = await user.tokens.findIndex(tkn => tkn.token === currentToken)
//     if (ind !== -1) {
//       user.tokens = []
//     } else {
//       throw new Error("the token don't exist")
//     }
//     await user.save()
//   }

//   deleteUserWithPets = async function(id) {
//     try {
//       const deletePets = await Pet.deleteMany({ owner: id })
//       const deleteUser = await User.deleteOne({ _id: id })
//       return deletePets, deleteUser
//     } catch (e) {
//       console.log(e)
//     }
//   }
}

module.exports = ServiceSubscription
