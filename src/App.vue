<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('psychicOffer', ['psychicOfferList']),
  },
  mounted() {
    this.psychicOfferList();
  }
}
</script>

<style>
</style>
