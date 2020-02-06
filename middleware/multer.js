const multer = require("multer")

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/images/users/${req.user._id}`)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.jpg`)
  }
})

const upload = multer({ storage: storageConfig }).single("test")

module.exports = upload
