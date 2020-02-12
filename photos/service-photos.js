const Photo = require("./model-photos")

class ServicePhotos {
  constructor() {}

  getAllPhotos = async function() {
    try {
      return await Photo.find({})
    } catch (e) {
      console.log(e)
    }
  }

  getPhotosById = async function(id) {
    try {
      console.log(id)
      return await Photo.find({ ownerUser: id }).populate("ownerUser")
    } catch (e) {
      console.log(e)
    }
  }

  addPhotos = async function(body) {
    const photo = new Photo(body)
    try {
      await photo.save()
    } catch (e) {
      console.log(e)
    }
    return { photo }
  }

  updatePhotosById = async function(id, body) {
    try {      
      return await Photo.findByIdAndUpdate(id, body)
    } catch (e) {
      console.log(e)
    }
  }

  deletePhotosById = async function(id) {
    try {
      console.log(id)
      return await Photo.deleteOne({ _id: id })
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = ServicePhotos
