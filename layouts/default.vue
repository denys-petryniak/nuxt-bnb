<template>
  <div class="app">
    <header class="app-header">
      <nuxt-link class="app-logo" to="/">
        <img src="/images/logo.svg" alt="Logo" />
      </nuxt-link>
      <div class="app-search">
        <input
          type="text"
          ref="citySearch"
          @changed="changed"
          placeholder="Enter a city"
        />
        <client-only>
          <template #placeholder>
            <input class="datepicker" />
            <span class="-ml-6 mr-2">to</span>
            <input class="datepicker" /><br />
          </template>
          <date-picker
            v-model="range"
            is-range
            timezone="UTC"
            :modelConfig="{ timeAdjust: '00:00:00' }"
          >
            <template v-slot="{ inputValue, inputEvents }">
              <input
                :value="inputValue.start"
                v-on="inputEvents.start"
                class="datepicker"
              />
              <span class="-ml-6 mr-2">to</span>
              <input
                :value="inputValue.end"
                v-on="inputEvents.end"
                class="datepicker"
              /><br />
            </template>
          </date-picker>
        </client-only>
        <button @click="search">
          <img src="/images/icons/search.svg" alt="Search icon" />
        </button>
      </div>
      <div v-click-outside="hideDrawer" class="app-user-menu">
        <template v-if="isLoggedIn">
          <img
            :src="user.profileUrl"
            alt="User avatar"
            class="avatar"
            @click="isShowDrawer = !isShowDrawer"
          />
          <div :class="['drawer', { show: isShowDrawer }]">
            <router-link to="/admin">Admin</router-link>
            <button type="button" @click="$auth.signOut()">Sign out</button>
          </div>
        </template>
        <div v-show="!isLoggedIn" id="googleButton" class="ml-8">
          <div
            id="g_id_onload"
            :data-client_id="$config.auth.clientId"
            data-auto_select="true"
            data-callback="auth"
          ></div>
          <div
            class="g_id_signin"
            data-type="icon"
            data-shape="circle"
            data-theme="outline"
            data-text="signin_with"
            data-size="large"
          ></div>
        </div>
      </div>
    </header>
    <nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      location: {
        lat: 0,
        lng: 0,
        label: "",
      },
      range: {
        start: null,
        end: null,
      },
      isShowDrawer: false,
    };
  },

  computed: {
    user() {
      return this.$store.state.auth.user;
    },

    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
  },

  watch: {
    $route() {
      this.hideDrawer();
    },
  },

  mounted() {
    this.$maps.makeAutoComplete(this.$refs.citySearch);
  },

  methods: {
    search() {
      if (!this.location.label || !this.range.start || !this.range.end) return;

      this.$router.push({
        name: "search",
        query: {
          ...this.location,
          start: this.range.start.getTime() / 1000,
          end: this.range.end.getTime() / 1000,
        },
      });
    },

    changed(event) {
      const place = event.detail;

      if (!place.geometry) {
        return;
      }

      this.location.lat = place.geometry.location.lat();
      this.location.lng = place.geometry.location.lng();
      this.location.label = this.$refs.citySearch.value;
    },

    hideDrawer() {
      this.isShowDrawer = false;
    },
  },
};
</script>
