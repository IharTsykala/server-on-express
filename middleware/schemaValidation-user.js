const Joi = require('@hapi/joi');

const schema = Joi.object({
    
    login:  Joi.string()  ,  

    name:  Joi.string(),
 
    surname: Joi.ref('password'),

    phone: Joi.string()
    .pattern(new RegExp('^[0-9]{3,30}')),

    password: Joi.number()  ,      

    role: Joi.string()     
    

    })


const validation = (schema)=> {
   
  return async(req, res, next)=>{

    try {
        const value = await schema.validateAsync(req.body);
        next()
    }
    catch (err) {
        console.lot(err)
     }
    }
}

module.exports = { validation, schema }
