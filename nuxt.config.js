require('dotenv').config();

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Hes Academy',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ], 
    script: [
      { src: 'https://js.stripe.com/v3' }
    ]
  },
  env: {
    STRIPE_KEY: process.env.STRIPE_KEY,
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#00BDFF' },
  /*
  ** Global CSS
  */
  css: [
    './assets/icons/font/flaticon.css',
    './assets/styles/fonts.css',
    './assets/styles/main.scss',
    './assets/styles/layout.scss',
    './assets/styles/icons.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    './plugins/components.js',
    './plugins/filters.js',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
  ],
  apollo: {  
    clientConfigs: {
      default: {
        httpEndpoint: process.env.NODE_ENV == 'development' ? 'http://localhost:1337/graphql' : 'https://hesacademy-backend.herokuapp.com/graphql',
      }
    }
  },
  markdownit: {
    preset: 'default',
    html: true,
    linkify: true,
    breaks: true,
    injected: true, 
    typographer: true
  },
  styleResources: {
    scss: [
      '~/assets/styles/variables.scss',
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
