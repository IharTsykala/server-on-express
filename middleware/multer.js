const multer = require("multer")
const name = "lol"

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images")
  },
  filename: (req, file, cb) => {
    cb(null, `${name}.jpg`)
  }
})

const upload = multer({ storage: storageConfig }).single("test")

module.exports = upload
