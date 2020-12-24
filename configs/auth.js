const auth = {
  cookie: false,
  redirect: {
    login: '/auth/login',
    logout: false,
    home: false,
    callback: '/auth/callback',
  },
  strategies: {
    local: {
      endpoints: {
        login: {
          url: '/api/auth/login',
          method: 'post',
          propertyName: 'access_token',
        },
        logout: { url: '/auth/logout', method: 'post' },
        user: { url: '/api/auth/me', method: 'get', propertyName: '' },
      },
    },
    google: {
      _scheme: '~/utils/scheme-oauth2',
      client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
      oauth2_endpoint: '/api/auth/oauth2_login',
    },
  },
}

export { auth }

export default auth
