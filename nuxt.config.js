import CompressionPlugin from 'compression-webpack-plugin'
import { auth, pwa, webfontloader, i18n, svgSprite } from './configs'

export default {
  ssr: false,
  target: 'server',
  head: {
    title: 'Coinex',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com/' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com/',
        crossorigin: true,
      },
    ],
  },
  loading: { color: '#fff' },
  css: [
    '@/assets/scss/index.scss',
    '@/assets/scss/element-ui.scss',
    '@/assets/styles/antd.less',
  ],
  plugins: [
    { src: '@/plugins/persisted-state', mode: 'client' },
    '@/plugins/common',
    '@/plugins/notifications',
    '@/plugins/element-ui',
    '@/plugins/ant-design',
  ],
  buildModules: [
    '@nuxtjs/composition-api',
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
    ['@nuxtjs/tailwindcss', { exposeConfig: true }],
    ['@aceforth/nuxt-optimized-images', { optimizeImages: true }],
    ['nuxt-webfontloader', webfontloader],
  ],
  modules: [
    '@nuxtjs/axios',
    ['@nuxtjs/auth', auth],
    '@nuxtjs/device',
    ['nuxt-i18n', i18n],
    ['@nuxtjs/pwa', pwa],
    ['@vt7/svg-sprite', svgSprite],
    'vue-currency-input/nuxt',
  ],
  components: false,
  build: {
    transpile: [/^element-ui/, '@nuxtjs/auth'],
    extractCSS: false,
    plugins: [new CompressionPlugin()],
  },
  extendPlugins(plugins) {
    plugins.push('@/plugins/axios.js')

    return plugins
  },
  router: {
    middleware: ['auth'],
    prefetchLinks: false,
  },
  serverMiddleware: ['~/serverMiddleware/selectiveSSR.js'],
  axios: {
    proxy: true,
    progress: false,
    debug: process.env.NODE_ENV === 'development',
  },
  proxy: {
    '/api/': { target: process.env.BASE_URL },
  },
  styleResources: { scss: './assets/scss/_variables.scss' },
}
