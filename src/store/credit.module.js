import CreditService from '../servicies/credit-request';

export const credit = {
	namespaced: true,
	state: {availableCredits: null},
	actions: {
		getCreditSumByCustomerAndPsychic({commit}, psychicId) {
			return CreditService.getCreditSumByCustomerAndPsychic(psychicId).then(
				customer => {
					commit('getCreditSumByCustomerAndPsychic', customer);
					return customer;
				},
				error => {
					commit('getCreditSumByCustomerAndPsychicFailure');
					return error;
				}
			);
		}
	},
	mutations: {
		getCreditSumByCustomerAndPsychic(state, credits) {
			state.availableCredits = credits;
		},
		getCreditSumByCustomerAndPsychicFailure(state) {
			state.availableCredits = null;
		}
	},
	getters: {
		getCreditsPerChat: state => {
			return state.availableCredits;
		}
	}
};
