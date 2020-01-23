const Joi = require("@hapi/joi")

const schema = Joi.object({
  login: Joi.string(),

  name: Joi.string(),

    phone: Joi.string()
    .pattern(new RegExp('^((375(29|33|25|44))|(\\+375\s\((29|33|25|44)\)\s)|(8\s\(0(29|33|25|44)\)\s))[1-9]{1}([0-9]{6}|[0-9]{2}-[0-9]{2}-[0-9]{2})$')),

    password: Joi.number()  ,      

    role: Joi.string()        

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

<<<<<<< HEAD
const validation = (schema)=> {
   
  return async(req, res, next)=>{

    try {
        const value = await schema.validateAsync(req.body);
        next()
    }
    catch (err) {
        res.status(400).send({ error: err.message })
     }
=======
const validation = schema => {
  return async (req, res, next) => {
    try {
      const value = await schema.validateAsync(req.body)
      next()
    } catch (err) {
      console.log(err)
>>>>>>> e715dc7887a9c8b34603de9b68d4790772147146
    }
  }
}

module.exports = { validation, schema }
