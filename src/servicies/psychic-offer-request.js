import axios from 'axios';
import {apiUrl, statusCodes} from './global-variables.js';

class PsychicOfferService {
	getPsychicOfferList() {
		return axios
			.get(`${apiUrl}/psychic-offer`)
			.then(function (response) {
				if (response.status === statusCodes.ok) {
					return response.data;
				}
			});
	}
}

export default new PsychicOfferService();
