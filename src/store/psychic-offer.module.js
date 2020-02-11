import PsychicOfferService from '../servicies/psychic-offer-request';

export const psychicOffer = {
	namespaced: true,
	state: {psychicOffers: null},
	actions: {
		psychicOfferList({commit}) {
			return PsychicOfferService.getPsychicOfferList().then(
				list => {
					commit('psychicOffers', list);
					return list;
				},
				error => {
					commit('psychicOfferListFailure');
					return error;
				}
			);
		}
	},
	mutations: {
		psychicOffers(state, list) {
			state.psychicOffers = list;
		},
		psychicOfferListFailure(state) {
			state.psychicOffers = null;
		}
	},
	getters: {
		psychicOfferListData: state => {
			return state.psychicOffers;
		}
	}
};
