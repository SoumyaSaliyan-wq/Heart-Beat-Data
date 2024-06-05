const { JWT } = require('../../config');
const jwt = require('jsonwebtoken');

module.exports.generateToken = (payload) => {
	try {
		const options = {
			expiresIn: JWT.EXPIRY
		};
        console.log(options)
		const token = jwt.sign(payload, JWT.SECRET_KEY, options);
		return token;
	} catch (error) {
        console.log(error);
		return false;
	}
};

module.exports.validateToken = token => {
	try {
		const payload = jwt.verify(token, JWT.SECRET_KEY);
		return {
			success: true,
			data: payload
		};
	} catch (error) {
		return {
			success: false,
			data: error
		};
	}
};

