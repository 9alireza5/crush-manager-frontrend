import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }]
    }
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        //@ts-expect-error it's just what it is
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils'
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      api: "http://172.30.27.119:5000"
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  }
})
