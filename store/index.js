export const state = () => ({
  activeTab: 'BTC',
  selectedUserView: null,
})
export const getters = {
  isEnable2FA(state) {
    const user = state.auth.user || {}

    return user.is_enable_2fa || false
  },
  activeTab(state) {
    return state.activeTab
  },
  selectedUserView(state) {
    return state.selectedUserView ? state.selectedUserView : {}
  },
}
export const mutations = {
  SET_ACTIVE_TAB(state, payload) {
    state.activeTab = payload
  },
  SET_SELECTED_USER_VIEW(state, payload) {
    state.selectedUserView = payload
  },
}
export const actions = {
  setActiveTab({ commit }, payload) {
    commit('SET_ACTIVE_TAB', payload)
  },
  setSelectedUserView({ commit }, payload) {
    commit('SET_SELECTED_USER_VIEW', payload)
  },
  getUserDetail({}, id) {
    return this.$axios.$get(`/api/exchanges/profile/${id}`)
  },
}
