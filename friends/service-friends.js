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

  getLogInUserAllFriends  = async function(id) {
    try {
      // console.log(id)
      return await Friend.aggregate([
        {
            $match:{ $or:[{  requestFriendId: new ObjectId(id)}, { responseFriendId: new ObjectId(id) }] }                    
        }                
      ])
    }
     catch (e) {
      console.log(e)
    }
  }    

  addFriend = async function(body) {
    const friend = new Friend(body)
    await friend.save()        
    return { friend }
  }

  // updateFriendById = async function(id, body) {
  //   try {
  //     console.log(body)
  //     return await Friend.findByIdAndUpdate(id, body)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

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

  // getFriendPetsById = async function(id) {
  //   try {
  //     return await Pet.find({ owner: id }).populate("owner")
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // getFriendWithPetsById = async function(id) {
  //   try {
  //     return await Friend.aggregate([
  //       {
  //         $match: { _id: new ObjectId(id) }
  //       },
  //       {
  //         $lookup: {
  //           from: "pets",
  //           localField: "_id",
  //           foreignField: "owner",
  //           as: "pets"
  //         }
  //       }
  //     ])
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // getFriendWithAlbumsById = async function(id) {
  //   try {
  //     return await Friend.aggregate([
  //       {
  //         $match: { _id: new ObjectId(id) }
  //       },
  //       {
  //         $lookup: {
  //           from: "albums",
  //           localField: "_id",
  //           foreignField: "ownerFriend",
  //           as: "albums"
  //         }
  //       }
  //     ])
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // getListAlbumsWithPhotosByFriendID = async function(id) {
  //   try {
  //     return await Album.aggregate([
  //       {
  //         $match: { ownerFriend: ObjectId(id) }
  //       },
  //       {
  //         $lookup: {
  //           from: "photos",
  //           localField: "_id",
  //           foreignField: "ownerAlbum",
  //           as: "photos"
  //         }
  //       }
  //     ])
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // getFriendWithPhotosById = async function(id) {
  //   try {
  //     return await Friend.aggregate([
  //       {
  //         $match: { _id: new ObjectId(id) }
  //       },
  //       {
  //         $lookup: {
  //           from: "photos",
  //           localField: "_id",
  //           foreignField: "ownerFriend",
  //           as: "photos"
  //         }
  //       }
  //     ])
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // loginFriend = async function(login, password) {
  //   const Friend = await Friend.findByCredentials(login, password)
  //   const token = await Friend.generateAuthToken()
  //   return { Friend, token }
  // }

  // logOutCurrentDevice = async function(Friend, currentToken) {
  //   Friend.tokens = await Friend.tokens.filter(tkn => {
  //     return tkn.token !== currentToken
  //   })
  //   await Friend.save()
  // }

  // logOutAllDevices = async function(Friend, currentToken) {
  //   const ind = await Friend.tokens.findIndex(tkn => tkn.token === currentToken)
  //   if (ind !== -1) {
  //     Friend.tokens = []
  //   } else {
  //     throw new Error("the token don't exist")
  //   }
  //   await Friend.save()
  // }

  // deleteFriendWithPets = async function(id) {
  //   try {
  //     const deletePets = await Pet.deleteMany({ owner: id })
  //     const deleteFriend = await Friend.deleteOne({ _id: id })
  //     return deletePets, deleteFriend
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
}

module.exports = ServiceFriend
