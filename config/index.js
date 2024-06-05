const Dotenv = require('dotenv');
Dotenv.config({ silent: true });
module.exports = {
    port:process.env.PORT,
    db: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		name: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT
	},
	HTTP_STATUS_CODES: {
		OK: 200,
		CREATED: 201,
		ACCEPTED: 202,
		NO_CONTENT: 204,
		BAD_REQUEST: 400,
		UNAUTHORIZED: 401,
		FORBIDDEN: 403,
		NOT_FOUND: 404,
		UNPROCESSABLE_ENTITY: 422,
		TOO_MANY_REQUESTS: 429,
		INTERNAL_SERVER_ERROR: 500,
		BAD_GATEWAY: 502,
		SERVICE_UNAVAILABLE: 503
	},
	JWT: {
		SECRET_KEY: process.env.SECRET_KEY ,
		EXPIRY: process.env.JWT_EXPIRY
	},
}