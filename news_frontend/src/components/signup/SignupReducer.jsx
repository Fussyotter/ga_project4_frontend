// import needed actions

import {
	CREATE_USER_ERROR,
	CREATE_USER_SUBMITTED,
	CREATE_USER_SUCCESS,
} from './SignupTypes';

// define inital state of signup

const initialState = {
	usernameError: '',
	passwordError: '',
	isSubmitted: false,
};

//define how action will change state of the  signup defined above
export const signupReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_USER_SUBMITTED:
			return {
				usernameError: '',
				passwordError: '',
				isSubmitted: true,
			};
		case CREATE_USER_ERROR:
			const errorState = {
				usernameError: '',
				passwordError: '',
				isSubmitted: false,
			};
			if (action.errorData.hasOwnProperty('username')) {
				errorState.usernameError = action.errorData['username'];
			}
			if (action.errorData.hasOwnProperty('password')) {
				errorState.passwordError = action.errorData['password'];
			}
			return errorState;
		case CREATE_USER_SUCCESS:
			return {
				usernameError: '',
				passwordError: '',
				isSubmitted: false,
			};
		default:
			return state;
	}
};
