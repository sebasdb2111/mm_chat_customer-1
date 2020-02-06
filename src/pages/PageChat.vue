<template>
  <q-page
    ref="pageChat"
    class="page-chat flex column"
  >
    <q-toolbar class="bg-teal-3 text-white ">
      <q-toolbar-title>
        <q-avatar color="white" text-color="teal">
          S<!--{{ chatSession.owner.firstName.charAt(0) }}-->
        </q-avatar>
        Sebas
      </q-toolbar-title>
    </q-toolbar>
    <div class="q-pa-md column col justify-end">
      <q-infinite-scroll reverse>
        <q-chat-message
          v-for="(msg, index) in messages"
          :key="`${index}`"
          :sent="msg.sent"
          :text-color="msg.textColor"
          :bg-color="msg.bgColor"
          :text="msg.text"
          :name="msg.name"
        />
      </q-infinite-scroll>
    </div>
    <q-footer class="bg-teal shadow-2" elevated>
      <q-toolbar>
        <q-form
          @submit="sendMessage"
          class="full-width"
        >
          <q-input
            v-model="newMessage"
            @blur="scrollToBottom"
            ref="newMessage"
            bg-color="white"
            outlined
            rounded
            placeholder="Type your message"
            dense
          >
            <template v-slot:after>
              <q-btn
                round
                dense
                flat
                type="submit"
                color="white"
                icon="send" />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
	import { mapState, mapActions, mapGetters } from 'vuex'
	import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details.js'

	export default {
		mixins: [mixinOtherUserDetails],
	  data() {
	  	return {
	  		newMessage: '',
	  		showMessages: false,
        messages: []
	  	}
	  },
	  computed: {
	  	...mapState('chatSession', ['conversation']),
	  	...mapState('customer', ['customerDetails'])
	  },
	  methods: {
	  	...mapActions('chatSession', [/*'getConversation',*/ 'sendMessage']),
	  	...mapGetters('customer', ['customerData']),
      sendMessage(e) {
        e.preventDefault();
        this.$store
          .dispatch('chatSession/sendMessage', {
            chatSessionId: Number(this.$route.params.chatSessionId),
            message: this.newMessage
          })
          .then(message => {
            const __ret = this.getCustomerAndSender(message.data);
            const name = __ret.name;

            this.messages = [
              ...this.messages,
              {
                id: message.data.id,
                text: [message.data.message],
                deleted: message.data.deleted,
                stamp: message.data.createdAt,
                sent: true,
                name,
                bgColor: 'grey-3'
              }
            ];
          })
          .catch(() => {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'checkmark',
              message: 'Something went worng'
            });
          });

        this.clearMessage()
      },
      mountConversation(conversation) {
        conversation.forEach(msg => {
          const __ret = this.getCustomerAndSender(msg);
          const sent = __ret.sent;
          const name = __ret.name;
          const bgColor = __ret.bgColor;

          this.messages.push({
            id: msg.id,
            text: [msg.message],
            deleted: msg.deleted,
            stamp: msg.createdAt,
            sent,
            name,
            bgColor
          });
        });

        return this.messages;
      },
      getCustomerAndSender(message) {
        const customer = this.customerDetails;
        let bgColor = 'teal-3';
        let sent = false;
        let name = '';

        if (
          message.customer &&
          message.customer.id === customer.id &&
          message.customer.username === customer.username
        ) {
          bgColor = 'grey-3';
          sent = true;
        }

        if (
          message.customer &&
          message.customer.id === customer.id &&
          message.customer.username === customer.username
        ) {
          name = `${customer.firstName} ${customer.lastName}`;
          console.log('CUSTOMER NAME', name)
        } else {
          name = `${message.psychic.firstName} ${message.psychic.lastName}`;
          console.log('MESSAGE NAME', name)
        }

        return { sent, name, bgColor };
      },
	  	clearMessage() {
	  		this.newMessage = '';
	  		this.$refs.newMessage.focus()
	  	},
	  	scrollToBottom() {
	  		const pageChat = this.$refs.pageChat.$el
	  		setTimeout(() => {
		  		window.scrollTo(0, pageChat.scrollHeight)
	  		}, 20);
	  	}
	  },
	  watch: {
      conversation: function(val) {
        const conversation = this.mountConversation(val.data);
        console.log(conversation)
        if (Object.keys(conversation).length) {
	  			this.scrollToBottom()
	  			setTimeout(() => {
	  				// this.showMessages = true
	  			}, 200)
	  		}
	  	}
	  },
	  // mounted() {
      // this.getConversation(this.$route.params.chatSessionId);
	  // }
	}
</script>

<style lang="stylus">
	.page-chat
		background #e2dfd5
		&:after
			content ''
			display block
			position fixed
			left 0
			right 0
			top 0
			bottom 0
			z-index 0
			opacity 0.1
			background-image radial-gradient(circle at 100% 150%, silver 24%, white 25%, white 28%, silver 29%, silver 36%, white 36%, white 40%, transparent 40%, transparent), radial-gradient(circle at 0    150%, silver 24%, white 25%, white 28%, silver 29%, silver 36%, white 36%, white 40%, transparent 40%, transparent), radial-gradient(circle at 50%  100%, white 10%, silver 11%, silver 23%, white 24%, white 30%, silver 31%, silver 43%, white 44%, white 50%, silver 51%, silver 63%, white 64%, white 71%, transparent 71%, transparent), radial-gradient(circle at 100% 50%, white 5%, silver 6%, silver 15%, white 16%, white 20%, silver 21%, silver 30%, white 31%, white 35%, silver 36%, silver 45%, white 46%, white 49%, transparent 50%, transparent), radial-gradient(circle at 0    50%, white 5%, silver 6%, silver 15%, white 16%, white 20%, silver 21%, silver 30%, white 31%, white 35%, silver 36%, silver 45%, white 46%, white 49%, transparent 50%, transparent)
			background-size 100px 50px
	.q-banner
		top 50px
		z-index 2
		opacity 0.8
	.q-message
		z-index 1
</style>
