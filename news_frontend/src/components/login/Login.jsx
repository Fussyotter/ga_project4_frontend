import React, { useState } from 'react';
import { login, logout } from './auth';
import { toast } from 'react-toastify';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loginStatus, setLoginStatus] = useState(null)

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await login({ username: username, password: password });
			toast.success('Login Successful!', {
				position: toast.POSITION.TOP_CENTER,
			});
			console.log('login successful');
			setLoginStatus('success');
		} catch (error) {
			console.error('login failed:', error);
			toast.error('Login Failed!', {
				position: toast.POSITION.TOP_RIGHT,
			});
			setLoginStatus('failed');
		}
	};
	const handleLogout = async () => {
		try {
			await logout();
			toast.success('Log OUT Successful!', {
				position: toast.POSITION.TOP_CENTER,
			});
			console.log('logout successful');
			setLoginStatus('failed');
		} catch (error) {
			console.error('logout failed', error);
			setLoginStatus('failed');

		}
	};

	return (
		<>
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
			<p></p>
			<button onClick={handleLogin}>Log in</button>
			<button onClick={handleLogout}>log out</button>
		</>
	);
};
export default Login;
