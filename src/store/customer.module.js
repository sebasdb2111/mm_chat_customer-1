import CustomerService from '../servicies/customer-request';

export const customer = {
  namespaced: true,
  state: {customerDetails: null},
  actions: {
    currentCustomer({ commit }) {
      return CustomerService.getCurrentCustomer().then(
        customer => {
          commit('current', customer);
          return customer;
        },
        error => {
          commit('currentCustomerFailure');
          return error;
        }
      );
    }
  },
  mutations: {
    current(state, customer) {
      state.customerDetails = customer;
    },
    currentCustomerFailure(state) {
      state.customerDetails = null;
    }
  },
  getters: {
    customerData: state => {
      return state.customerDetails;
    }
  }
};
