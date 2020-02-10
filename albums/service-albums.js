const Album = require("./model-albums")

class ServicePets {
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
      return await Albums.deleteOne({ _id: id })
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = ServicePets
