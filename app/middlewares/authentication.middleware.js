const jwtUtil=require('../utils/jwt')
const responseHelper=require('../helpers/response.helper')
const responseMessageHelper=require('../helpers/response_message.helper')
const isAuthenticated=async(req,res,next)=>{
    try{

        const { headers } = req;
        const authHeader = headers.authorization || headers[`authorization`];
        if (!authHeader) return responseHelper.authorizationError(res, responseMessageHelper.jwt.INVALID_AUTHORIZATION);
        if (!authHeader.startsWith('Bearer ')) {
            return responseHelper.authorizationError(res,   responseMessageHelper.jwt.INVALID_AUTHORIZATION);
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return responseHelper.authorizationError(res, responseMessageHelper.jwt.INVALID_AUTHORIZATION);
        }
    
        const jwtTokenData = jwtUtil.validateToken(token);
        const { success } = jwtTokenData;
        if (!success) {
            return responseHelper.authorizationError(res,  responseMessageHelper.jwt.INVALID_AUTHORIZATION);
        }
        req.token = token;	 
        return next();
    }
    catch(error){
        console.log(error);
        return responseHelper.serverError(res,responseMessageHelper.errorMessages.SERVER_ERROR)
    }

}
module.exports = isAuthenticated