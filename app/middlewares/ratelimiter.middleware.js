const rateLimit = require('express-rate-limit');
const  API_LIMIT  = process.env.API_LIMIT

const rateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: API_LIMIT, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false // Disable the `X-RateLimit-*` headers
});

module.exports = rateLimiter;
