import axios from 'axios';
import {apiUrl, statusCodes} from './global-variables.js';

class AuthService {
	loginCustomer(loginData) {
		return axios
			.post(`${apiUrl}/auth/customer/login`, loginData)
			.then(function (response) {
				if (response.status === statusCodes.accepted) {
					localStorage.setItem('customerToken', response.data);
					return response;
				}
			});
	}

	logoutCustomer() {
		localStorage.removeItem('customerToken');
	}

	createCustomer(customerData) {
		return axios
			.post(`${apiUrl}/customer`, customerData)
			.then(function (response) {
				return response;
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export default new AuthService();
