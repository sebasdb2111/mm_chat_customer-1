import AuthService from '../servicies/auth-request.js';

const customerToken = localStorage.getItem('customerToken');
const initialState = customerToken
	? {loggedIn: true, customerToken}
	: {loggedIn: false, customerToken: null};

export const auth = {
	namespaced: true,
	state: initialState,
	actions: {
		login({commit}, customerToken) {
			return AuthService.loginCustomer(customerToken).then(
				customerToken => {
					commit('loginSuccess', customerToken);
					return customerToken;
				},
				error => {
					commit('loginFailure');
					return error;
				}
			);
		},
		logout({commit}) {
			AuthService.logoutCustomer();
			commit('logout');
		},
		signup({commit}, customerData) {
			return AuthService.createCustomer(customerData).then(
				response => {
					// commit('singupSuccess');
					console.log(response)
					return response;
				},
				error => {
					commit('singupFailure');
					return error;
				}
			);
		}
	},
	mutations: {
		loginSuccess(state, customerToken) {
			state.loggedIn = true;
			state.customerToken = customerToken;
		},
		loginFailure(state) {
			state.loggedIn = false;
			state.customerToken = null;
		},
		logout(state) {
			state.loggedIn = false;
			state.customerToken = null;
		},
		// singupSuccess(state) {
		// 	state.status.loggedIn = false;
		// },
		singupFailure(state) {
			state.status.loggedIn = false;
		}
	},
	getters: {
		customer: state => {
			return state.customerToken;
		},
		loggedIn: state => {
			return state.loggedIn;
		}
	}
};
