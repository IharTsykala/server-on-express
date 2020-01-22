const Joi = require("@hapi/joi")

const schema = Joi.object({
  login: Joi.string(),

  name: Joi.string(),

  surname: Joi.ref("password"),

  password: Joi.number(),

  role: Joi.string(),

  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
})

const validation = schema => {
  return async (req, res, next) => {
    try {
      const value = await schema.validateAsync(req.body)
      next()
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = { validation, schema }
