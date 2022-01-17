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

  modules: ["~/modules/auth", "~/modules/algolia", "~/modules/cloudinary"],

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
    algolia: {
      appId: "HTQ6DUKPLH",
      key: "e2f285ffa12aabeb7f0e9ff5b326cf27",
    },
  },

  privateRuntimeConfig: {
    algolia: {
      appId: "HTQ6DUKPLH",
      key: "686f5e59770cf830fbd3e26cd6ed4c18",
    },
    cloudinary: {
      apiSecret: "-y-rDgENfUIs3t3rMHHrnmBCcAg",
    },
  },
};
