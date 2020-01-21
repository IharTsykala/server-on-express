const express = require("express")
const multer = require("multer")
const UploadController = require("./controller-upload")

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storageConfig }).single("test")

const upload_controller = new UploadController()

const routerUpload = new express.Router()

routerUpload.post(
  "/public/safeFileIntoImages",
  upload,
  upload_controller.safeImg
)

module.exports = routerUpload
