import axios from 'axios';

const httpClient = axios.create({
	baseURL: 'http://localhost:3000/api/v1',


});

export default httpClient;
