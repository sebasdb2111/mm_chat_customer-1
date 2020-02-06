<template>
	<q-form @submit="submitForm">
    <q-input
      v-if="tab === 'signup'"
      v-model="formData.username"
      class="q-mb-md"
      outlined
      lazy-rules
      :rules="[val => (val !== null && val !== '') || 'Please type an username']"
      label="Username" />
		<q-input
			v-model="formData.email"
			class="q-mb-md"
			outlined
			type="email"
      lazy-rules
      :rules="[val => (val !== null && val !== '') || 'Please type your email']"
			label="Email" />
		<!--<q-input-->
			<!--v-model="formData.password"-->
			<!--class="q-mb-md"-->
			<!--outlined-->
			<!--type="password"-->
			<!--label="Password" />-->
    <q-input
      color="teal"
      outlined
      v-model="formData.password"
      label="Password"
      lazy-rules
      :rules="[val => (val !== null && val !== '') || 'Please type your password']"
      :type="formData.isPwd ? 'password' : 'text'"
    >
      <template v-slot:append>
        <q-icon
          :name="formData.isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="formData.isPwd = !formData.isPwd"
        />
      </template>
    </q-input>
    <q-input
      v-if="tab === 'signup'"
      color="teal"
      outlined
      v-model="formData.retypePassword"
      label="Retype Password"
      lazy-rules
      :rules="[val => (val !== null && val !== '') || 'Please retype the password']"
      :type="formData.isRePwd ? 'password' : 'text'"
    >
      <template v-slot:append>
        <q-icon
          :name="formData.isRePwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="formData.isRePwd = !formData.isRePwd"
        />
      </template>
    </q-input>
    <q-input
      v-if="tab === 'signup'"
      color="teal"
      outlined
      type="text"
      v-model="formData.firstName"
      label="First name"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please type your first name']"
    />
    <q-input
      v-if="tab === 'signup'"
      color="teal"
      outlined
      type="text"
      v-model="formData.lastName"
      label="Last name"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please type your last name']"
    />
    <q-input
      v-if="tab === 'signup'"
      outlined
      color="teal"
      v-model="formData.dateBirth"
      label="Date of birth"
      mask="date"
      lazy-rules
      :rules="[val => (val !== null && val !== '') || 'Please type your date birth']"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy
            class="cursor-pointer"
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              color="teal"
              :first-day-of-week="1"
              v-model="formData.dateBirth"
              @input="() => $refs.qDateProxy.hide()"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
		<div class="row">
			<q-space />
      <div class="row justify-end">
        <q-btn type="submit" color="teal" :disabled="tab === 'login' && (!this.formData.email || !this.formData.password)">
          <span v-if="tab === 'signup'">Signup</span>
          <span v-else>Login</span>
        </q-btn>
      </div>
		</div>
	</q-form>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
  import { addEighteenYear, isoToday } from '../servicies/date-utils';

	export default {
		props: ['tab'],
		data() {
			return {
        loading: false,
				formData: {
          username: null,
          email: null,
          password: null,
          retypePassword: null,
          isPwd: true,
          isRePwd: true,
          firstName: null,
          lastName: null,
          dateBirth: null
				}
			}
		},
		methods: {
			...mapActions('auth', ['login']),
			...mapActions('customer', ['currentCustomer']),
      ...mapActions('chatSession', ['chatSessions']),
      ...mapGetters('auth', ['loggedIn', 'customer']),
      checkAdultCustomer() {
        const adultCustomer = isoToday() > addEighteenYear(this.dateBirth);

        if (!adultCustomer) {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You are not of legal age to use our services'
          });
        }

        return adultCustomer;
      },
      checkSamePassword() {
        const correctPassword = this.password === this.retypePassword;

        if (!correctPassword) {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Passwords are not equal'
          });
        }

        return correctPassword;
      },
			submitForm() {
        if (this.tab === 'login') {
          this.login({ email: this.formData.email, password: this.formData.password })
          const customerLoggedIn = this.loggedIn;
          const customer = this.customer;

          if (customerLoggedIn && customer) {
            this.currentCustomer({token: customer.data});
            this.chatSessions();
            this.$router.push('/');
          }
          else {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message:
                'Email or password was not correct, please try again'
            });
          }
        }
        else {
          const adultCustomer = this.checkAdultCustomer();
          const correctPassword = this.checkSamePassword();

          if (
            adultCustomer &&
            correctPassword &&
            null !== this.formData.username &&
            null !== this.formData.firstName &&
            null !== this.formData.lastName &&
            null !== this.formData.email
          ) {
            this.signup({
              username: this.username,
              email: this.email,
              password: this.password,
              firstName: this.firstName,
              lastName: this.lastName,
              dateBirth: this.dateBirth
            })
              .then(() => {
                this.$q.notify({
                  color: 'teal',
                  textColor: 'white',
                  icon: 'checkmark',
                  message: 'Account created, please login!'
                });

                setTimeout(() => { this.$router.go(); }, 2000);

                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
                this.$q.notify({
                  color: 'red-5',
                  textColor: 'white',
                  icon: 'checkmark',
                  message: 'Make sure your data is correct'
                });
              });
          }
        }

        // const customerLoggedIn = this.loggedIn();
        //
        // if (customerLoggedIn) {
        //   this.$router.push('/');
        // } else {
        //   this.$q.notify({
        //     color: 'red-5',
        //     textColor: 'white',
        //     icon: 'warning',
        //     message:
        //       'Email or password was not correct, please try again'
        //   });
        // }
			}
		}
	}
</script>
