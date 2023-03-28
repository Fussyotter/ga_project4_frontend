import React, { useState } from 'react';
import { login, logout } from './auth';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await login({ username: username, password: password });
			console.log('login successful');
		} catch (error) {
			console.error('login failed:', error);
		}
	};
    const handleLogout = async () => {
        try {
            await logout();
            console.log('logout successful');
        } catch(error) {
            console.error('logout failed',error);
        }
    }


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
            <button onClick={handleLogin}>Log in</button>
            <button onClick={handleLogout}>log out</button>
		</>
	);
};
export default Login;