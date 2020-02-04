const multer = require("multer")
const name = Date.parse(new Date())

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images")
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.jpg`)
  }
})

const upload = multer({ storage: storageConfig }).single("test")

module.exports = upload
