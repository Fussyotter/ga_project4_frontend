import axios from 'axios';

export const signupNewUser = async (userData) => {
	try {
		const response = await axios.post(
			'http://localhost:8000/v1/users/',
			userData
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			// request made and server responded with bad status code
			throw new Error(JSON.stringify(error.response.data));
		} else if (error.message) {
			// error message is available
			throw new Error(JSON.stringify(error.message));
		} else {
			// other errors
			throw new Error(JSON.stringify(error));
		}
	}
};
