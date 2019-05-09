// @ts-ignore
const app_info = require('./package')
import express        from 'express'
import { create_api } from './api'

const db_host = process.env.DB_HOST || 'localhost'
const db_name = process.env.DB_NAME || 'Northwind'
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASSWORD || process.env.DB_PASS
const db_url  = db_user ? `mongodb://${db_user}:${db_pass}@${db_host}/${db_name}` : `mongodb://${db_host}/${db_name}`

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: app_info.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: app_info.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },

  /*
  ** Global CSS
  */
  css: [
    '~assets/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ['~/modules/logger', { app_info, filters: ['!^\/healthz.*'] }],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Server Middleware
  ** Nuxt.js uses 'connect module as server
  ** So most of express middleware works with Nuxt.js middleware
  */
  serverMiddleware: [
    express.json(),
    // cors(),
    create_api({ db_url }),
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
