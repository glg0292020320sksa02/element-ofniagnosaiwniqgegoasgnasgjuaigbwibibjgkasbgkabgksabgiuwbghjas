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
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          400: '#60A5FA',
          default: '#1D4ED8',
        },
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          400: '#34D399',
          default: 'rgb(2,192,118)',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          400: '#F87171',
          default: 'rgb(248, 73, 96)',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF9C3',
          200: '#FEF08A',
          400: '#FACC15',
          default: 'rgb(255, 196, 0)',
        },
        disabled: '#EBECF0',
        body: '#091E42',
        subtitle: '#7A869A',
      },
      fontSize: {
        xxs: '0.5rem',
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
