import { SET_USER_DATA, AUTH_USER ,UserActionTypes, User } from './types';


export type UserState = {
	user: User
}
const initialState: User = {
	email: '',
	token: '',
	authenticated: true,
	name: '',
	lastName: '',

};

const userReducer  = (state = initialState, action: UserActionTypes): User => {
	switch (action.type) {
		case 'SET_USER_DATA':
			return {
				...initialState,
				...action.payload,
			};
		case 'AUTH_USER':
			return {
				...initialState,
				...{ authenticated: action.authenticated },
			};
		default:
			return  state;
	}
};

export default userReducer;
