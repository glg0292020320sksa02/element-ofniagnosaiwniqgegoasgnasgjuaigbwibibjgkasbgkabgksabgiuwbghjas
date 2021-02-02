const STATUS_CODE_SUCCESS = 200
const TOKEN_ERROR = ['unauthenticated', 'tokenHasBeenRevoked']

export default function ({ $axios, $auth }) {
  $axios.onResponseError(res => {
    const { status, data } = res.response

    if (status !== STATUS_CODE_SUCCESS) {
      if (TOKEN_ERROR.includes(data?.errorCode)) {
        $auth.logout()
      }

      const error = { statusCode: status, ...data }

      return Promise.reject(error)
    }

    return res
  })
}
