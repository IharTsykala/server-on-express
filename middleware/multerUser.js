const multer = require("multer")

const storageConfig = multer.diskStorage({  
  destination: (req, file, cb) => {  
    // console.log(req.files)     
    cb(null, `public/images/users/${req.user._id}`)
  },
  filename: (req, file, cb) => {   
    cb(null, `${Date.now()}`+file.originalname)
  }
})

const uploadUser = multer({ storage: storageConfig }).single("user")
const uploadMultipleUser = multer({ storage: storageConfig }).array("multipleUser")

module.exports = { uploadUser, uploadMultipleUser }