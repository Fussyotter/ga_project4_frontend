import axios from 'axios';
// https://axios-http.com/docs
export const setAxiosAuthToken = (token) => {
	if (typeof token !== 'undefined' && token) {
		axios.defaults.headers.common['Authorization'] = 'Token ' + token;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
};
// Delete auth header
// Apply for every request
export const login = async (userData) => {
	try {
		console.log('Logging in with data:', userData);

		const response = await axios.post(
			'http://localhost:8000/v1/token/login/',
			userData
		);
		console.log('Login response:', response.data);

		const { auth_token } = response.data;
		setToken(auth_token);
		// console.log(auth_token)
		const user = await getCurrentUser();
		const userArticlesResponse = await axios.get(
			`http://localhost:8000/articles/user/${userData.username}`,
			{
				headers: {
					Authorization: `Token ${auth_token}`,
				},
			}
		);
		const authorDescriptionTitle = userArticlesResponse.data.map((item) => ({
			author: item.author,
			description: item.description,
			title: item.title,
			url: item.url,
			urlToImage: item.urlToImage,
		}));

		console.log(authorDescriptionTitle);
		return { success: true, user, authorDescriptionTitle };
		// this is to set state in login.jsx
		// return { success: true };
	} catch (error) {
		console.error('Login error:', error);

		unsetCurrentUser();
		return { success: false, error };
	}
};
// goes to the api endpoint with djoser and enters the information into fields.
export const getCurrentUser = async () => {
	try {
		const response = await axios.get('http://localhost:8000/v1/users/me');
		const user = {
			username: response.data.username,
			email: response.data.email,
			first_name: response.data.first_name,
		};
		// setCurrentUser(user);
		return user;
	} catch (error) {
		throw error;
	}
};
// export const loadUser = async (auth_token) => {
// 	setAxiosAuthToken(auth_token);
// 	const user = await getCurrentUser();
// 	setCurrentUser(user);
// };
export const setCurrentUser = (user) => {
	// stores user
	localStorage.setItem('user', JSON.stringify(user));
	console.log('set user');
	console.log(user);
};

// we're passing the token to the parent to pass it down to the login's child
export const setToken = (token) => {
	setAxiosAuthToken(token);
	localStorage.setItem('token', token);
};

// setToken(token)
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

// export const getArticlesForUser = async (username, token) => {
// 	try {
// 		const response = await axios.get(
// 			`http://localhost:8000/articles/users/${username}/`,
// 			{
// 				headers: {
// 					Authorization: `Token ${token}`,
// 				},
// 			}
// 		);

// 		const articles = response.data.map((article) => ({
// 			title: article.title,
// 			url: article.url,
// 		}));

// 		return articles;
// 	} catch (error) {
// 		throw error;
// 	}
// };
