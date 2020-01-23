const Joi = require("@hapi/joi")

const schema = Joi.object({
  login: [
    Joi.string(),
    Joi.number()
  ],

  name: Joi.string(),

    phone: Joi.string()
    .pattern(new RegExp('^((375(29|33|25|44))|(\\+375\s\((29|33|25|44)\)\s)|(8\s\(0(29|33|25|44)\)\s))[1-9]{1}([0-9]{6}|[0-9]{2}-[0-9]{2}-[0-9]{2})$')),

    password: Joi.number().positive(),      

    role: Joi.string(),

  tokens: [
    {
      token: {
        type: [
            Joi.string(),
            Joi.number()
        ]
      }
    }
  ]
})

const validation = (schema)=> {
   
  return async(req, res, next)=>{

    try {
        const value = await schema.validateAsync(req.body);
        next()
    }
    catch (err) {
        res.status(400).send({ error: err.message })     
    }
  }
}

module.exports = { validation, schema }
