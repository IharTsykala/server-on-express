const express = require("express")
const UploadController = require("./controller-upload")
const uploadUser = require("../middleware/multerUser")
const uploadAdmin = require("../middleware/multerAdmin")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")

const upload_controller = new UploadController()

const routerUpload = new express.Router()

routerUpload.post(
  "/public/userSafeFileIntoImages",
  auth,
  uploadUser,
  upload_controller.safeImg
)

routerUpload.post(
  "/public/adminSafeFileIntoImages/:id",
  admin,
  uploadAdmin,
  upload_controller.safeImg
)

module.exports = routerUpload
