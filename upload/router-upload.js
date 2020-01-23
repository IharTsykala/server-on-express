const express = require("express")
const UploadController = require("./controller-upload")
const upload = require("../middleware/multer")


const upload_controller = new UploadController()

const routerUpload = new express.Router()

routerUpload.post(
  "/public/safeFileIntoImages",
  upload,
  upload_controller.safeImg
)

module.exports = routerUpload
