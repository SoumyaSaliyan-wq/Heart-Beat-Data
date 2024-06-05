const Joi = require('joi');
const createHttpError = require('http-errors');
const responseHelper = require('../helpers/response.helper');

// const options = {
// 	errors: {
// 		wrap: {
// 			label: ''
// 		}
// 	}
// };
// // const validateMiddleware = validator => {
// // 	//! If validator is not exist, throw err

// // 	if (!Validators.hasOwnProperty(validator)) throw new Error(`'${validator}' validator is not exist`);

// // 	return async function(req, res, next) {
// // 		try {
// // 			const validated = await Validators[validator].validateAsync(req.body, options);
// // 			req.body = validated;
// // 			next();
// // 		} catch (err) {
// // 			//* Pass err to next
// // 			//! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
// // 			if (err.isJoi)
// // 				// return next(createHttpError(422, {message: err.message}))
// // 				return responseHelper.badRequestError(res, err.message);
// // 			next(createHttpError(500));
// // 		}
// // 	};
// // };
// const validateMiddleware = (schema, property) => { 
//     return (req, res, next) => { 
//         // console.log(req.body,schema)
//     const { error } = Joi.validate(req.body, schema); 
//     const valid = error == null; 

//     if (valid) { 
//       next(); 
//     } else { 
//       const { details } = error; 
//       const message = details.map(i => i.message).join(',');

//       console.log("error", message); 
//      res.status(422).json({ error: message }) } 
//     } 
//   } 
// module.exports=validateMiddleware

module.exports.validateBody = (schema, property) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            console.log(details)

            const message = details.map(i => i.message).join(',');

            return responseHelper.badRequestError(res, message);
        }
    }
}

module.exports.validateParam = (schema, property) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.params);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');

            return responseHelper.badRequestError(res, message);
        }
    }
}
module.exports.validateQuery = (schema, property) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.query);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            console.log(details)
            const message = details.map(i => i.message).join(',');

            return responseHelper.badRequestError(res, message);
        }
    }
}

