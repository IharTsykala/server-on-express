const Joi = require('@hapi/joi');

const schema = Joi.object({
    
    login:  Joi.string()  ,  

    name:  Joi.string(),
 
    surname: Joi.ref('password'),

    password: Joi.number()  ,      

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


// schema.validate({name: 'abc', password: 1994 });
// // -> { value: { username: 'abc', birth_year: 1994 } }

// schema.validate({});
// // -> { value: {}, error: '"username" is required' }

// Also -

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
