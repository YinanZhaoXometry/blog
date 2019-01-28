const pkg = require('./package')

module.exports = {


  mode: 'universal',

  /*
  ** Router config
  */
  router: {
    middleware: 'redirect'
    // base: '/app/'
  },

  /*
  ** Headers of the page
  */
  head: {
    // title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      // { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }

    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#0074BF', height: '3px' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/less/index.less',
    '~/assets/theme/index.css',
    '~/assets/fonts/iconfont/iconfont.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/element-ui-min'
  ],

  /*
  ** Loaders
  */
  loader: [
    {
      test: /\.less$/,
      loaders: 'style-loader!css-loader!less-loader'
    }
  ],


  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: "http://kuhe.io"
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** 设置代理
  */
  // proxy: {
  //   '/api/': {target:'http://127.0.0.1:3030' },
  //   '/images/': {target:'http://127.0.0.1:3030' }
  // },

  /*
  ** Build configuration
  */

  build: {
    babel: {
      "plugins": [
        [ "component", {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
        }]
      ]
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
