const { safeImg, safeMultipleImg } = require("./service-upload")

class UploadController {
  constructor() {}

  safeImg = async (req, res) => {
    try {
      // console.log(req)
      const result = await safeImg(req.file, res)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }

  safeMultipleImg = async (req, res) => {
    try {
      // console.log(req.query)
      const result = await safeMultipleImg(req.files, req.query, res)
      res.status(201).send(result)
    } catch (e) {
      res.status(400).send({ error: e.message })
    }
  }
}

module.exports = UploadController
