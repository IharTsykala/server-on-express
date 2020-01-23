const Joi = require("@hapi/joi")
const pref = '(29|33|25|44)'
const diop = '[0-9]'

const schema = Joi.object({
  login: [
    Joi.string(),
    Joi.number()
  ],

  name: Joi.string(),

    phone: Joi.string()
    .pattern(new RegExp(`^((\\+375)\\s\\((29|33|25|44)\\)\\s|(375)(29|33|25|44)|(8\\s\\((0(29|33|25|44)\\)))\\s)(([0-9]{7})|([0-9]{3}-[0-9]{2}-[0-9]{2}))`)).error(new Error('invalid phone')),

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
