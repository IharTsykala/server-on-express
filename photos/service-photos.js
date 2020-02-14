const Photo = require("./model-photos")
const fs = require("fs-extra")
const jwt = require("jsonwebtoken")

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
      // console.log(id)
      return await Photo.find({ ownerUser: id }).populate("ownerUser")
    } catch (e) {
      console.log(e)
    }
  }

  addPhotos = async function(body) {
    // console.log(body)
    const photo = new Photo(body)
    try {
      await photo.save()
    } catch (e) {
      console.log(e)
    }
    return { photo }
  }

  addPhotosIntoAlbum = async function(body) {
    console.log(body)
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

  deletePhotosById = async function(idPhoto, token) {
    try {
      const decoded = jwt.verify(token, "IharTsykala")
      const idUser = decoded._id
      const namePhoto = await Photo.find({ _id: idPhoto })
      await Photo.deleteOne({ _id: idPhoto })
      if (
        await fs.pathExists(
          `public/images/users/${idUser}/${namePhoto[0].name}`
        )
      ) {
        await fs.remove(`public/images/users/${idUser}/${namePhoto[0].name}`)
      }
      await Photo.deleteOne({ _id: idPhoto })

      return "Photo deleted"
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = ServicePhotos
