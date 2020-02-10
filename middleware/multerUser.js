const multer = require("multer")

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {       
    cb(null, `public/images/users/${req.user._id}`)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.jpg`)
  }
})

const uploadAdmin = multer({ storage: storageConfig }).single("user")

module.exports = uploadAdmin