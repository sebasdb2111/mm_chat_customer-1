export default {
	computed: {
		otherUserDetails() {
			if (this.$store.state.store.customer[this.$route.params.chatSessionId]) {
				return this.$store.state.store.customer[this.$route.params.chatSessionId]
			}
			return {}
		}
	}
}
