<template>
  <q-page class="flex q-pa-md">
    <q-card class="full-width">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="signup" label="Signup" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <LoginSignup :tab="tab" />
        </q-tab-panel>

        <q-tab-panel name="signup">
          <LoginSignup :tab="tab" />
        </q-tab-panel>

      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import LoginSignup from '../components/LoginSignup.vue';

export default {
  data () {
    return {
      tab: 'login'
    }
  },
  components: {
    LoginSignup
  }
}
</script>
