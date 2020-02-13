import axios from 'axios';
import {apiUrl} from './global-variables.js';
import authHeader from './auth-header';

class CreditService
{
	async getCreditSumByCustomerAndPsychic(psychicId)
	{
		return axios
			.get(`${apiUrl}/credit/sum-by-customer-and-psychic`, {headers: authHeader(), params: {psychicId}})
			.then((response) =>
				  {
					  return response;
				  })
			.catch((error) =>
				   {
					   console.log(error);
				   });
	}
}

export default new CreditService();
