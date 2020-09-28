import httpClient from './http';

export const loginUser = () => {
	httpClient.post('/login', {
	    data:{
	        attributes:{
                email: 'test@test.com',
                password: 'test123',
            }
        }

	}, {withCredentials: true});
};

