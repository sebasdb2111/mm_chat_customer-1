<template>
	<q-page class="flex">
		<q-list
			class="full-width"
			separator>
			<q-item-label header>Active Chats</q-item-label>
			<q-item
				v-for="(chatSession, key) in chats"
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
					<p>{{ chatSession.psychic.status ? 'online' : 'offline' }}</p>
				</q-item-section>
			</q-item>
		</q-list>
	</q-page>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
	import {convertIsoFormatWithHourAndMinutes} from '../servicies/date-utils'

	export default {
		async created() {
			await this.chatSessions();
			await this.activeChats();

			const chats = await this.chatSessionList();

			this.$socket.client.on('psychic_online', psychic => {
				let chat = chats.data.findIndex(el => el.psychic.id === psychic.id);
				chats.data[chat].psychic.status = true;
			});

			this.$socket.client.on('psychic_offline', psychic => {
				let chat = chats.data.findIndex(el => el.psychic.id === psychic.id);
				chats.data[chat].psychic.status = false;
			})
		},
		data() {
			return {
				chats: [],
			}
		},
		methods: {
			...mapActions('chatSession', ['chatSessions']),
			...mapGetters('chatSession', ['chatSessionList']),
			async activeChats() {
				//TODO: chek if this call is necessary
				await this.chatSessions;
				const chats = await this.chatSessionList();
				this.chats = chats.data;
			},
			convertIsoFormatWithHourAndMinutes(date) {
				return convertIsoFormatWithHourAndMinutes(date);
			}
		}
	}
</script>
