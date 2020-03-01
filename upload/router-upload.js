const express = require("express")
const UploadController = require("./controller-upload")
const uploadAvatar = require("../middleware/multerAvatar")
const { uploadMultipleUser } = require("../middleware/multerUser")
const auth = require("../middleware/auth")

const upload_controller = new UploadController()

const routerUpload = new express.Router()

routerUpload.post(
  "/public/userSafeFileIntoImages/:id",
  auth,
  uploadAvatar,
  upload_controller.safeImg
)

routerUpload.post(
  "/public/multipleUserSafeFileIntoImages",
  auth,
  uploadMultipleUser,
  upload_controller.safeMultipleImg
)

// routerUpload.post(
//   "/public/adminSafeFileIntoImages/:id",
//   admin,
//   uploadAdmin,
//   upload_controller.safeImg
// )

module.exports = routerUpload
