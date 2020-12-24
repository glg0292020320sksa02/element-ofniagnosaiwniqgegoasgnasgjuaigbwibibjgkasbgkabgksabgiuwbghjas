export const actions = {
  register({}, data) {
    return this.$axios.$post('/api/auth/register', data)
  },
  forgotPassword({}, data) {
    return this.$axios.$post('/api/forgot_password/send_reset_link', data)
  },
  resetPassword({}, data) {
    return this.$axios.$post('/api/forgot_password/reset', data)
  },
  changePassword({}, data) {
    return this.$axios.$put('/api/home/change_password', data)
  },
  resendVerification() {
    return this.$axios.$post('/api/auth/verification/resend')
  },
  generate2fa() {
    return this.$axios.$post('/api/2fa/generate')
  },
  enable2fa({}, data) {
    return this.$axios.$post('/api/2fa/enable', data)
  },
  disable2fa({}, data) {
    return this.$axios.$post('/api/2fa/disable', data)
  },
}
