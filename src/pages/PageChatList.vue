<template>
  <q-page class="flex q-pa-md">
    <q-list
      class="full-width"
      separator>
      <q-item-label header>Active Chats</q-item-label>
      <q-item
        v-for="(chatSession, key) in chatSessionList.data"
        :key="key"
        :to="'/chat/' + chatSession.id"
        clickable
        v-ripple>
        <q-item-section avatar>
          <q-avatar color="teal" text-color="white">
            {{ chatSession.psychic.firstName.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ chatSession.psychic.firstName }} {{ chatSession.psychic.lastName }}</q-item-label>
          <q-item-label caption lines="2">Created at: {{ convertIsoFormatWithHourAndMinutes(chatSession.createdAt) }}
          </q-item-label>
        </q-item-section>

        <!--<q-item-section side>-->
        <!--<q-badge-->
        <!--:color="chatSession.online ? 'light-green-5' : 'grey-4'">-->
        <!--{{ chatSession.online ? 'Online' : 'Offline' }}-->
        <!--</q-badge>-->
        <!--</q-item-section>-->
      </q-item>

    </q-list>
  </q-page>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import {convertIsoFormatWithHourAndMinutes} from '../servicies/date-utils'

  export default {
    computed: {
      ...mapActions('chatSession', ['chatSessions']),
      ...mapGetters('chatSession', ['chatSessionList']),
    },
    methods: {
      convertIsoFormatWithHourAndMinutes(date) {
        return convertIsoFormatWithHourAndMinutes(date);
      }
    }
  }
</script>

<style>
</style>
