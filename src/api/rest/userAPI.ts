import httpClient from './http';

export const getUsers = () => {
	return httpClient.get('/users', { withCredentials: true })
		.then(data => console.log(data))
		.catch(err => console.log(err));
};

export const createUser = () => {
	return httpClient.post('/users', {
		data:{
			attributes:{
				email: 'test4@test.com',
				password: 'test123',
				passwordConfirmation: 'test123',
				role: 'manager',
				first_name: 'testowy',
				last_name: 'użytkownik',
			},
		},
	}, { withCredentials: true })
		.then(data => console.log(data))
		.catch(err => console.log(err));
};

export const deleteUser = (id) => {
	return httpClient.delete(`/users/${id}`, { withCredentials: true })
		.then(data => console.log(data))
		.catch(err => console.log(err));
};

export const updateWholeUser = (id) => {
	return httpClient.put(`/users/${id}`, {
		data:{
			attributes:{
				email: 'test4@test.com',
				password: 'test123',
				passwordConfirmation: 'test123',
				role: 'manager',
				first_name: 'testowy',
				last_name: 'użytkownik',
			},
		},
	}, { withCredentials: true })
		.then(data => console.log(data))
		.catch(err => console.log(err));
};

export const updatePartUser = ( id ) => {
	return httpClient.patch(`/users/${id}`, {
		data:{
			attributes:{
				email: 'test4@test.com',
				password: 'test123',
				first_name: 'testowy',
				last_name: 'użytkownik',
			},
		},
	}, { withCredentials: true })
		.then(data => console.log(data))
		.catch(err => console.log(err));
};
