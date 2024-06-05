module.exports = {
	errorMessages: {
		BAD_REQUEST: 'Bad request.',
		UNAUTHORISED: 'Unauthorised access. Please login to your account.',
		FORBIDDEN: 'You are not authorised to make this request.',
		NOT_FOUND: 'Endpoint not found.',
		RESOURCE_NOT_FOUND: 'Resource not found.',
		SERVER_ERROR: 'Something went wrong, please try again later.',
		UNAUTHORISED_ACCESS: 'You are not Authorised to access this resource. '
	},
	userMessages:{
		DUPLICATE: 'User already exists with this phone number',
		CREATE_ERROR:'User Creation Failed',
		CREATE_SUCCESS:'User created successfully',
		NOT_FOUND:'User not found',
		INVALID_CREDENTIALS:'Invalid credentials',
		LOGIN_SUCCESS:'User logged in successfully',
		FETCH_SUCCESS:'Users fetched successfully',
		UPDATE_ERROR:'No changes to update',
		UPDATE_SUCCESS:'User Details updated successfully'
	},
	jwt:{
		INVALID_AUTHORIZATION:'Invalid Authorization'
	}
}