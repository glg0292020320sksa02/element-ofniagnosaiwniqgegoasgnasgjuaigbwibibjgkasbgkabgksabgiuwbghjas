import merge from 'deepmerge'
import enLocale from 'element-ui/lib/locale/lang/en'
import viLocale from 'element-ui/lib/locale/lang/vi'
import en from '../locales/en.json'
import vi from '../locales/vi.json'

const mergeVI = merge(viLocale, vi)
const mergeEN = merge(enLocale, en)

const i18n = {
  locales: [
    { code: 'en', iso: 'en-US', name: 'English' },
    { code: 'vi', iso: 'vi-VN', name: 'Tiếng Việt' },
  ],
  defaultLocale: 'en',
  lazy: true,
  vuex: {
    syncLocale: true,
  },
  strategy: 'no_prefix',
  vueI18n: {
    silentTranslationWarn: true,
    fallbackLocale: 'en',
    messages: {
      en: mergeEN,
      vi: mergeVI,
    },
  },
}

export { i18n }

export default i18n
