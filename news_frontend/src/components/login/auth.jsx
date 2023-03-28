import axios from 'axios';

export const setAxiosAuthToken = (token) => {
	if (typeof token !== 'undefined' && token) {
		// Apply for every request
		axios.defaults.headers.common['Authorization'] = 'Token ' + token;
	} else {
		// Delete auth header
		delete axios.defaults.headers.common['Authorization'];
	}
};
export const login = async (userData) => {
	try {
		console.log('Logging in with data:', userData);

		const response = await axios.post(
			'http://localhost:8000/v1/token/login/',
			userData
		);
		console.log('Login response:', response.data);

		const { auth_token } = response.data;
		setAxiosAuthToken(auth_token);
		await getCurrentUser();
	} catch (error) {
		console.error('Login error:', error);

		unsetCurrentUser();
		throw error;
	}
};

export const getCurrentUser = async () => {
	try {
		const response = await axios.get('http://localhost:8000/v1/users/me');
		const user = {
			username: response.data.username,
			email: response.data.email,
		};
		setCurrentUser(user);
		return user;
	} catch (error) {
		unsetCurrentUser();
		throw error;
	}
};

export const setCurrentUser = (user) => {
	localStorage.setItem('user', JSON.stringify(user));
	console.log('set user');
	console.log(user)
};

export const setToken = (token) => {
	setAxiosAuthToken(token);
	localStorage.setItem('token', token);
};

export const unsetCurrentUser = () => {
	setAxiosAuthToken('');
	localStorage.removeItem('token');
	localStorage.removeItem('user');
};

export const logout = async () => {
	try {
		await axios.post('http://localhost:8000/v1/token/logout/');
		unsetCurrentUser();
		console.log('logout success');
	} catch (error) {
		unsetCurrentUser();
		throw error;
	}
};
