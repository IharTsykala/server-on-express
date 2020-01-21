const safeImg = require("./service-upload")

class UploadController {
  constructor() {}

  safeImg = async (req, res) => {
    try {
      const result = await safeImg(req.file, res)
      res.status(201).send(result)
    } catch (e) {
      console.log("lol")
      res.status(400).send({ error: e.message })
    }
  }
}

module.exports = UploadController
