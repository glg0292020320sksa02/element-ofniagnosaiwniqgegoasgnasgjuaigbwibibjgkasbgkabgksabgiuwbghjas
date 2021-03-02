export const state = () => ({
  walletList: [],
  selectedCurrency: {},
  selectedWallets: null,
  selectedHistory: null,
  depositCoin: {},
  withdrawCoin: {},
})

export const getters = {
  walletList(state) {
    return state.walletList
  },
  walletFiltered(state) {
    return symbol =>
      state.walletList.filter(wallet => wallet.currency.symbol !== symbol)
  },
  walletWithoutVNDS(state) {
    return (
      state.walletList.filter(item => item.currency.symbol !== 'VNDS') || []
    )
  },
  VNDS(state) {
    return state.walletList.find(item => item.currency.symbol === 'VNDS') || {}
  },
  depositCoin(state) {
    return state.depositCoin
  },
  withdrawCoin(state) {
    return state.withdrawCoin
  },
  selectedWallets(state) {
    return state.selectedWallets
  },
  selectedHistory(state) {
    return state.selectedHistory
  },
}

export const mutations = {
  SET_WALLET_LIST(state, payload) {
    state.walletList = payload || []
  },
  SET_SELECTED_CURRENCY(state, payload) {
    state.selectedCurrency = payload
  },
  SET_DEPOSIT_COIN(state, payload) {
    state.depositCoin = payload
  },
  SET_WITHDRAW_COIN(state, payload) {
    state.withdrawCoin = payload
  },
  SET_SELECTED_WALLET(state, payload) {
    state.selectedWallets = payload
  },
  SET_SELECTED_HISTORY(state, payload) {
    state.selectedHistory = payload
  },
}

export const actions = {
  async getWallets({ commit }) {
    const wallets = await this.$axios.$get('/api/wallets')

    commit('SET_WALLET_LIST', wallets)
  },
  withdraw({}, { target, body }) {
    return this.$axios.$post(`/api/withdrawals/${target}`, body)
  },
  depositPM({}, body) {
    return this.$axios.$post(`/api/deposits/perfectmoney/render`, body)
  },
  changeSelectedCurrency({ commit }, body) {
    commit('SET_SELECTED_CURRENCY', body)
  },
  setDepositCoin({ commit }, body) {
    commit('SET_DEPOSIT_COIN', body)
  },
  setWithdrawCoin({ commit }, body) {
    commit('SET_WITHDRAW_COIN', body)
  },
  setSelectedWallets({ commit }, payload) {
    commit('SET_SELECTED_WALLET', payload)
  },
  setSelectedHistory({ commit }, payload) {
    commit('SET_SELECTED_HISTORY', payload)
  },
}
