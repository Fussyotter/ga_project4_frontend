import React, { useState } from 'react';
import { login, logout, getArticlesForUser } from './auth';
import { toast } from 'react-toastify';
import API from '../NewsApi';
const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loginStatus, setLoginStatus] = useState(null);
	const [user, setUser] = useState(null);
	const [authorDescriptionTitle, setAuthorDescriptionTitle] = useState([]);
	// const [token, setToken] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const { user, authorDescriptionTitle } = await login({
				username: username,
				password: password,
			});
			toast.success('Login Successful!', {
				position: toast.POSITION.TOP_CENTER,
			});
			console.log('login successful');

			setUser(user);
			setLoginStatus(true);
			setAuthorDescriptionTitle(authorDescriptionTitle);
			console.log(authorDescriptionTitle.author);

			// const articles = await getArticlesForUser(username, token);
		} catch (error) {
			console.error('login failed:', error);
			toast.error('Login Failed!', {
				position: toast.POSITION.TOP_RIGHT,
			});
			setLoginStatus(false);
			setUser(null);
		}
	};
	const handleLogout = async () => {
		try {
			await logout();
			toast.success('Log OUT Successful!', {
				position: toast.POSITION.TOP_CENTER,
			});
			console.log('logout successful');
			setLoginStatus(false);
			setUser(null);
		} catch (error) {
			console.error('logout failed', error);
			setLoginStatus(false);
			setUser(null);
		}
	};

	return (
		<>
			<details>
				<summary>Login</summary>
				<div>
					<label htmlFor='username'>Username:</label>
					<input
						type='text'
						id='username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor='password'>password:</label>
					<input
						type='text'
						id='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>
					{!loginStatus ? (
						<button onClick={handleLogin}>Log in</button>
					) : (
						<div>
							<p>Welcome, {username}!</p>
							<div className='grid'>
								{authorDescriptionTitle.map((item) => (
									<div className='article'>
										<div className='card'>
											<div key={item.title}>
												<h3>{item.title}</h3>
												<img src={item.urlToImage} />
												<p>Author: {item.author}</p>
												<a href={item.url}>Read more</a>
												{console.log(item)}
											</div>
										</div>
									</div>
								))}
							</div>
							<button onClick={handleLogout}>log out</button>
						</div>
					)}
				</div>
			</details>
			<API username={username} authorDescriptionTitle={authorDescriptionTitle} setAuthorDescriptionTitle={setAuthorDescriptionTitle}/>
		</>
	);
};

export default Login;
