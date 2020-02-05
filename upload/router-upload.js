const express = require("express")
const UploadController = require("./controller-upload")
const upload = require("../middleware/multer")
const auth = require("../middleware/auth")


const upload_controller = new UploadController()

const routerUpload = new express.Router()

routerUpload.post(
  "/public/safeFileIntoImages",
  auth,
  upload,  
  upload_controller.safeImg
)

module.exports = routerUpload
