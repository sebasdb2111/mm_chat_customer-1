<template>
	<q-page class="flex">
		<q-list
			class="full-width"
			separator>
			<q-item-label header>Our Psychics</q-item-label>
			<q-item
				v-for="(offer, key) in psychicOffersData"
				:key="key"
				@click="createChat(offer.psychic.id)"
				clickable
				v-ripple
			>
				<q-item-section avatar>
					<q-avatar color="teal" text-color="white">
						{{ offer.psychic.firstName.charAt(0) }}
					</q-avatar>
				</q-item-section>

				<q-item-section>
					<q-item-label>
						{{ offer.psychic.firstName }} {{ offer.psychic.lastName }}
					</q-item-label>
					<q-item-label caption lines="2">
						Since: {{ convertIsoFormat(offer.psychic.createdAt) }}
					</q-item-label>
				</q-item-section>
				<q-item-section side>
					<p :class="offer.psychic.status ? 'text-teal' : 'text-red'">
						{{ offer.psychic.status ? 'online' : 'offline' }}
					</p>
				</q-item-section>
			</q-item>
		</q-list>
	</q-page>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
	import {getYear} from '../servicies/date-utils'

	export default {
		data() {
			return {
				loading: false,
				psychicOffers: []
			}
		},
		async created() {
			this.psychicOffers = this.psychicOfferListData;
		},
		watch: {
			psychicOfferListData() {
				this.psychicOffers = this.psychicOfferListData;
			}
		},
		computed: {
			...mapActions('chatSession', ['createChatSession', 'chatSessions']),
			...mapGetters('chatSession', ['chatSessionData', 'chatSessionList']),
			...mapGetters('psychicOffer', ['psychicOfferListData']),
			psychicOffersData() {
				this.$socket.client.on('psychic_online', psychic => {
					let indexOfPsychicOffer = this.psychicOffers.findIndex(el => el.psychic.id === psychic.id);
					this.psychicOffers[indexOfPsychicOffer].psychic.status = true;
					this.$set(this.psychicOffers, indexOfPsychicOffer, this.psychicOffers[indexOfPsychicOffer]);
				});

				this.$socket.client.on('psychic_offline', psychic => {
					const indexOfPsychicOffer = this.psychicOffers.findIndex(el => el.psychic.id === psychic.id);
					delete(this.psychicOffers[indexOfPsychicOffer].psychic.status);
					this.$set(this.psychicOffers, indexOfPsychicOffer, this.psychicOffers[indexOfPsychicOffer]);
				});

				return this.psychicOffers;
			}
		},
		methods: {
			convertIsoFormat(date) {
				return getYear(date);
			},
			async createChat(psychicId) {
				await this.$store.dispatch('chatSession/createChatSession', {psychicId: psychicId, userId: null});
				const chatSession = await this.chatSessionData;

				if (chatSession) {
					this.$router.push(`chat/${chatSession.data.id}`);
				} else {
					this.$q.notify({
						color: 'red-5',
						textColor: 'white',
						icon: 'checkmark',
						message: 'Something went wrong'
					});
				}
			}
		}
	}
</script>
