const Joi = require("@hapi/joi")

const schema = Joi.object({
  login: [
    Joi.string().error(new Error("login")),
    Joi.number().error(new Error("login"))
  ],

  firstName: Joi.string()
    .error(new Error("lastName"))
    .allow(""),

  lastName: Joi.string()
    .error(new Error("lastName"))
    .allow(""),

  phone: Joi.string()
    .pattern(
      new RegExp(
        `^((\\+375)\\s\\((29|33|25|44)\\)\\s|(375)(29|33|25|44)|(8\\s\\((0(29|33|25|44)\\)))\\s)(([0-9]{7})|([0-9]{3}-[0-9]{2}-[0-9]{2}))`
      )
    )
    .error(new Error("invalid phone"))
    .allow(""),

  password: Joi.number()
    .positive()
    .error(new Error("password"))
    .allow(""),

  email: Joi.string()
    .error(new Error("email"))
    .allow(""),

  avatar: Joi.string().error(new Error("avatar")),

  role: Joi.string().error(new Error("role")),

  tokens: [
    {
      token: {
        type: [Joi.string(), Joi.number()]
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
      res.status(400).send({ error: err.message })
    }
  }
}

module.exports = { validation, schema }
