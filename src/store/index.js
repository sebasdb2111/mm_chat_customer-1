import Vue from 'vue';
import Vuex from 'vuex';
import {auth} from './auth.module';
import {customer} from './customer.module';
import {psychicOffer} from './psychic-offer.module';
import {chatSession} from './chat-session.module';
import {credit} from './credit.module';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {auth, customer, chatSession, psychicOffer, credit}
});
