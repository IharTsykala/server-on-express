const multer = require("multer")
console.log('hi2')

const storageConfig = multer.diskStorage({  
  destination: (req, file, cb) => {  
    // console.log(req)     
    cb(null, `public/images/users/${req.user._id}`)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.jpg`)
  }
})

const uploadUser = multer({ storage: storageConfig }).single("user")

module.exports = uploadUser