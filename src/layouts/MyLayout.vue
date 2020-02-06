<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-teal text-white shadow-2">
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          class="absolute-left"
          v-go-back.single
          icon="arrow_back"
          flat
          dense
          label="Back"
        />
        <q-btn
          v-else
          flat
          dense
          round
          class="q-mr-sm"
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />
        <q-toolbar-title class="absolute-center">
          MM Chat
        </q-toolbar-title>

        <q-btn
          v-if="!isLogged"
          to="/auth"
          class="absolute-right q-pr-sm"
          no-caps
          flat
          dense
          label="Login/Signup"
        />
        <q-btn
          v-if="isLogged"
          @click="logout"
          to="/auth"
          class="absolute-right q-pr-sm"
          no-caps
          flat
          dense
          label="Logout"
        />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Menu</q-item-label>
        <div>
          <q-item clickable to="/">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Our Psychics</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-if="isLogged" to="/active-chats">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Active Chats</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    data() {
      return {
        leftDrawerOpen: false
      };
    },
    computed: {
      isLogged() {
          return this.loggedIn();
      }
    },
    methods: {
      ...mapActions('auth', ['logout']),
      ...mapGetters('auth', ['loggedIn'])
    }
  };
</script>
