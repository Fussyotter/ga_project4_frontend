import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		first_name: '',
		last_name: '',
	});

	const handleInputChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post('http://localhost:8000/register/', formData)
			.then((res) => {
				console.log('new user created', res.data);
			})
			.catch((error) => {
				console.error('error creating user:', error);
			});
		
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				User Name:
				<input
					type='text'
					name='username'
					required
					onChange={handleInputChange}
				/>
			</label>
			<label>
				Email:
				<input
					type='email'
					name='email'
					required
					onChange={handleInputChange}
				/>
			</label>
			<label>
				Password:
				<input
					type='password'
					name='password'
					required
					onChange={handleInputChange}
				/>
			</label>
			<label>
				First name:
				<input
					type='text'
					name='first_name'
					required
					onChange={handleInputChange}
				/>
			</label>
			<label>
				Last name:
				<input
					type='text'
					name='last_name'
					required
					onChange={handleInputChange}
				/>
			</label>
			<button type='submit'>Create account</button>
		</form>
	);
}
export default Registration
