<template>
	<q-page class="flex">
		<q-list
			class="full-width"
			separator>
			<q-item-label header>Active Chats</q-item-label>
			<q-item
				v-for="(chatSession, key) in chatListData"
				:key="key"
				:to="'/chat/' + chatSession.id"
				clickable
				v-ripple
			>
				<q-item-section avatar>
					<q-avatar color="teal" text-color="white">
						{{ chatSession.psychic.firstName.charAt(0) }}
					</q-avatar>
				</q-item-section>

				<q-item-section>
					<q-item-label>{{ chatSession.psychic.firstName }} {{ chatSession.psychic.lastName }}</q-item-label>
					<q-item-label caption lines="2">Created at: {{
						convertIsoFormatWithHourAndMinutes(chatSession.createdAt) }}
					</q-item-label>
				</q-item-section>
				<q-item-section side>
					<p :class="chatSession.psychic.status ? 'text-teal' : 'text-red'">
						{{ chatSession.psychic.status ? 'online' : 'offline' }}
					</p>
				</q-item-section>
			</q-item>
		</q-list>
	</q-page>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
	import {convertIsoFormatWithHourAndMinutes} from '../servicies/date-utils'

	export default {
		data() {
			return {
				chats: [],
			}
		},
		async created() {
			await this.chatSessions();

			const chats = this.chatSessionList;
			this.chats = chats.data;
			// this.$socket.client.emit('customers-online-ping');
		},
		watch: {
			chatSessionList() {
				const chats = this.chatSessionList;
				this.chats = chats.data;
			}
		},
		computed: {
			...mapGetters('chatSession', ['chatSessionList']),
			chatListData() {
				this.$socket.client.on('psychic_online', psychic => {
					let indexOfChat = this.chats.findIndex(el => el.psychic.id === psychic.id);
					this.chats[indexOfChat].psychic.status = true;
					this.$set(this.chats, indexOfChat, this.chats[indexOfChat]);
				});

				this.$socket.client.on('psychic_offline', psychic => {
					let indexOfChat = this.chats.findIndex(el => el.psychic.id === psychic.id);
					delete(this.chats[indexOfChat].psychic.status);
					this.$set(this.chats, indexOfChat, this.chats[indexOfChat]);
				});

				// TODO: hay que mejorar esta iteracion
				this.$socket.client.on('psychics_online_list', psychicsOnline => {
					const indexOfPsychicOffer = this.psychicOffers.findIndex(psyOff => {
						psychicsOnline.forEach(psychic => {
							if (psychic.id === psyOff.psychic.id) {
								psyOff.psychic.status = true;
							}
							else {
								delete(psyOff.psychic.status);
							}
						})
					});
					this.$set(this.psychicOffers, indexOfPsychicOffer, this.psychicOffers[indexOfPsychicOffer]);
				});

				return this.chats;
			}
		},
		methods: {
			...mapActions('chatSession', ['chatSessions']),
			convertIsoFormatWithHourAndMinutes(date) {
				return convertIsoFormatWithHourAndMinutes(date);
			}
		}
	}
</script>
