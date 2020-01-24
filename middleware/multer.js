const multer = require("multer")

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images")
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storageConfig }).single("test")

  module.exports = upload;