export const actions = {
  updateProfile({}, data) {
    return this.$axios.$put('/api/home/profile', data)
  },
  getSettings() {
    return this.$axios.$get('/api/settings')
  },
  changeSetting({}, data) {
    return this.$axios.$put('/api/settings', data)
  },
  getAuthLoggings() {
    return this.$axios.$get('/api/auth_loggings')
  },
  getActivityLogs() {
    return this.$axios.$get('/api/activity_logs')
  },
  removeToken({}, id) {
    return this.$axios.$delete(`/api/auth_loggings/revoke_token/${id}`)
  },
  removeAllToken() {
    return this.$axios.$delete(`/api/auth_loggings/revoke_all_tokens`)
  },
  getCurrencies() {
    return this.$axios.$get('/api/currencies')
  },
  getTransactions({}, params) {
    return this.$axios.$get('/api/transactions', { params })
  },
  getAllTransactions({}, params) {
    return this.$axios.$get('/api/transactions/all', { params })
  },
}
