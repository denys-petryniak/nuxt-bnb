export default {
  components: true,

  head: {
    titleTemplate: 'NuxtBnB: %s',

    htmlAttrs: {
      lang: 'en',
    },

    bodyAttrs: {
      class: ['my-style'],
    },

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],

    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
  },

  router: {
    prefetchLinks: false,
  },

  plugins: [
    '~/plugins/maps.client',
    '~/plugins/dataApi',
    '~/plugins/auth.client',
    '~/plugins/vCalendar.client',
    '~/plugins/stripe.client',
    '~/plugins/click-outside.client',
  ],

  modules: [
    '~/modules/auth',
    '~/modules/algolia',
    '~/modules/cloudinary',
    '~/modules/stripe',
    '@nuxtjs/cloudinary',
  ],

  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/eslint-module', // https://go.nuxtjs.dev/eslint
  ],

  cloudinary: {
    cloudName: 'dlb7sfdnr',
  },

  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dlb7sfdnr/image/upload/',
    },
  },

  css: ['~/assets/sass/app.scss'],

  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    },
    extend(config) {
      config.resolve.alias['node-fetch-native'] = require.resolve('node-fetch')
    },
  },

  publicRuntimeConfig: {
    rootUrl:
      process.env.NODE_ENV === 'production'
        ? 'https://nuxtairbnb.vercel.app'
        : 'http://localhost:3000',
    auth: {
      cookieName: 'idToken',
      clientId:
        '736761392411-pa0sqah7jpgdpsm34a3uk961q0rqbfld.apps.googleusercontent.com',
    },
    algolia: {
      appId: 'HTQ6DUKPLH',
      key: 'e2f285ffa12aabeb7f0e9ff5b326cf27',
    },
    cloudinary: {
      apiKey: '386431866795293',
    },
    stripe: {
      key: 'pk_test_51KWOzoKsFB8ghWoke2qoA9EGIK8VCiaPUlHYf41XOS7OHBGhu1hSvzf1Cbyuob9tAQ8LKur0ShWNmoSazvFcnJsx00wa3nKARr',
    },
  },

  privateRuntimeConfig: {
    algolia: {
      appId: 'HTQ6DUKPLH',
      key: process.env.ALGOLIA_SECRET_KEY,
    },
    cloudinary: {
      apiSecret: process.env.CLOUDINARY_SECRET_KEY,
    },
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
    },
  },
}
