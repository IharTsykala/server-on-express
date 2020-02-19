const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const Album = require("./model-albums")

class ServiceAlbums {
  constructor() {}

  getAllAlbums = async function() {
    try {
      return await Album.find({})
    } catch (e) {
      console.log(e)
    }
  }

  getAlbumsById = async function(id) {
    try {
      return await Album.findById(id)
    } catch (e) {
      console.log(e)
    }
  }

  addAlbums = async function(body) {
    const album = new Album(body)
    try {
      await album.save()
    } catch (e) {
      console.log(e)
    }
    return { album }
  }

  updateAlbumsById = async function(id, body) {
    try {
      return await Album.findByIdAndUpdate(id, body)
    } catch (e) {
      console.log(e)
    }
  }

  deleteAlbumsById = async function(id) {
    try {
      // console.log(id)
      return await Album.deleteOne({ _id: id })
    } catch (e) {
      console.log(e)
    }
  }

  getAlbumWithPhotosById = async function(id) {
    try {
      return await Album.aggregate([
        {
          $match: { _id: new ObjectId(id) }
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
}

module.exports = ServiceAlbums
