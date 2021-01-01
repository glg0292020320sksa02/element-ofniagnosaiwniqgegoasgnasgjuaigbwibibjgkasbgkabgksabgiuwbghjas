export const state = () => ({
  activeTab: 'BTC',
  activeSide: 'BUY',
  selectedUserView: null,
  selectedTransactionView: null,
})
export const getters = {
  isEnable2FA(state) {
    const user = state.auth.user || {}

    return user.is_enable_2fa || false
  },
  activeTab(state) {
    return state.activeTab
  },
  activeSide(state) {
    return state.activeSide
  },
  selectedUserView(state) {
    return state.selectedUserView ? state.selectedUserView : {}
  },
  selectedTransactionView(state) {
    return state.selectedTransactionView ? state.selectedTransactionView : {}
  },
}
export const mutations = {
  SET_ACTIVE_TAB(state, payload) {
    state.activeTab = payload
  },
  SET_ACTIVE_SIDE(state, payload) {
    state.activeSide = payload
  },
  SET_SELECTED_USER_VIEW(state, payload) {
    state.selectedUserView = payload
  },
}
export const actions = {
  setActiveTab({ commit }, payload) {
    commit('SET_ACTIVE_TAB', payload)
  },
  setActiveSide({ commit }, payload) {
    commit('SET_ACTIVE_SIDE', payload)
  },
  setSelectedUserView({ commit }, payload) {
    commit('SET_SELECTED_USER_VIEW', payload)
  },
  getUserDetail({}, id) {
    return this.$axios.$get(`/api/exchanges/profile/${id}`)
  },
  getTransactionDetail({}, id) {
    return this.$axios.$get(`/api/transactions/find/${id}`)
  },
}
