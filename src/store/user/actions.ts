import { User, SET_USER_DATA, LOGOUT_USER, LOG_USER, AUTH_USER, Credentials } from './types';
import { Dispatch } from 'redux';


export const logIn = (creds: Credentials) => {
	return{
		type: LOG_USER,
		payload: creds,
	};
};

export const setUserInfo = (userData: User) => {
	return{
		type: SET_USER_DATA,
		payload: userData,
	};
};

export const logOut = (auth: boolean) => {
	return{
		type: LOGOUT_USER,
		authenticated: auth,
	};
};
export const authUser = (auth: boolean) => {
	return (dispatch: Dispatch) =>
		dispatch({
			type: AUTH_USER,
			authenticated: auth,
		});
};

