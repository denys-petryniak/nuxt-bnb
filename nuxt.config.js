export default {
  components: true,

  head: {
    titleTemplate: "NuxtBnB: %s",

    htmlAttrs: {
      lang: "en",
    },

    bodyAttrs: {
      class: ["my-style"],
    },

    meta: [
      {
        charset: "utf-8",
      },
    ],
  },

  router: {
    prefetchLinks: false,
  },

  plugins: ["~/plugins/maps.client", "~/plugins/dataApi", "~/plugins/auth.client"],

  modules: [],

  buildModules: ["@nuxtjs/tailwindcss"],

  css: ["~/assets/sass/app.scss"],

  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    },
  },

  publicRuntimeConfig: {
    auth: {
      cookieName: "idToken",
      clientId: "736761392411-pa0sqah7jpgdpsm34a3uk961q0rqbfld.apps.googleusercontent.com",
    },
  },

  privateRuntimeConfig: {},
};
