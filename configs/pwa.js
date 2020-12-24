const pwa = {
  manifest: {
    name: 'Coinex',
    short_name: 'Coinex',
    background_color: '#fff',
    description: 'Coinex',
    lang: 'en',
  },
  meta: {
    nativeUI: true,
    ogHost: process.env.META_OG_HOST,
  },
}

export { pwa }

export default pwa
