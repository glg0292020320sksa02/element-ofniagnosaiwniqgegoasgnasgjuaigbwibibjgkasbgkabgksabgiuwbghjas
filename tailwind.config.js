const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')
const whitelister = require('purgecss-whitelister')

/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  important: true,
  theme: {
    container: {
      center: true,
      padding: {
        default: '1rem',
      },
    },
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        primary: {
          200: '#C7D2FE',
          default: '#4F46E5',
        },
        success: {
          200: 'rgba(2, 192, 118, 0.2)',
          default: 'rgb(2,192,118)',
        },
        error: {
          200: 'rgb(248, 73, 96, 0.2)',
          default: 'rgb(248, 73, 96)',
        },
        warning: {
          200: 'rgba(255, 196, 0, 0.2)',
          default: 'rgb(255, 196, 0)',
        },
        secondary: '#172B4D',
        disabled: '#EBECF0',
        body: '#091E42',
        headline: '#253858',
        subtitle: '#7A869A',
      },
      fontSize: {
        'x-small': '0.5rem',
        xxs: '0.5rem',
        small: '0.65rem',
      },
    },
  },
  variants: {},
  plugins: [
    plugin(({ addBase, config }) => {
      addBase({
        body: { color: config('theme.colors.body') },
      })
    }),
    require('@tailwindcss/custom-forms'),
  ],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    // enabled: false,
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
    // These options are passed through directly to PurgeCSS
    options: {
      whitelist: whitelister([
        './node_modules/element-ui/lib/theme-chalk/index.css',
      ]),
    },
  },
}
