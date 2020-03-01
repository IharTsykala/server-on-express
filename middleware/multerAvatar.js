const multer = require("multer")

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {    
    cb(null, `public/images/users/${req.params.id}`)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.jpg`)
  }
})

const uploadAvatar = multer({ storage: storageConfig }).single("user")

module.exports = uploadAvatar
