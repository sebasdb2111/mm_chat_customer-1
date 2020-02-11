import axios from 'axios';
import authHeader from './auth-header';
import {apiUrl, statusCodes} from './global-variables.js';

class CustomerService {
	getCurrentCustomer() {
		return axios
			.get(`${apiUrl}/customer/by-token`, {headers: authHeader()})
			.then(function (response) {
				if (response.status === statusCodes.ok) {
					return response.data;
				}
			});
	}
}

export default new CustomerService();
