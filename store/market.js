export const state = () => ({
  selectedSellOrder: null,
  selectedBuyOrder: null,
  selectedOrder: null,
})
export const mutations = {
  SET_SELECTED_BUY_ORDER(state, payload) {
    state.selectedBuyOrder = payload
  },
  SET_SELECTED_SELL_ORDER(state, payload) {
    state.selectedSellOrder = payload
  },
  SET_SELECTED_ORDER(state, payload) {
    state.selectedOrder = payload
  },
}
export const getters = {
  selectedSellOrder(state) {
    return state.selectedSellOrder || {}
  },
  selectedBuyOrder(state) {
    return state.selectedBuyOrder || {}
  },
  selectedOrder(state) {
    return state.selectedOrder || {}
  },
}
export const actions = {
  getListingLatest() {
    return this.$axios.$get('/api/market/listing_latest')
  },
  getOrders({}, params) {
    return this.$axios.$get('/api/orders', { params })
  },
  deleteOrder({}, id) {
    return this.$axios.$delete(`/api/orders/${id}`)
  },
  getAllOrders({}, params) {
    return this.$axios.$get('/api/orders/all', { params })
  },
  getDetailOrder({}, id) {
    return this.$axios.$get(`/api/orders/${id}`)
  },
  addOrderBuy({}, body) {
    return this.$axios.$post('/api/orders/buy', body)
  },
  addOrderSell({}, body) {
    return this.$axios.$post('/api/orders/sell', body)
  },
  addExchangesBuy({}, body) {
    return this.$axios.$post('/api/exchanges/buy', body)
  },
  addExchangesSell({}, body) {
    return this.$axios.$post('/api/exchanges/sell', body)
  },
  getCurrentCurrencyPrice({}, currencyCode) {
    return this.$axios.$get(`/api/prices/${currencyCode}`)
  },
  setSelectedBuyOrder({ commit }, payload) {
    commit('SET_SELECTED_BUY_ORDER', payload)
  },
  setSelectedSellOrder({ commit }, payload) {
    commit('SET_SELECTED_SELL_ORDER', payload)
  },
  setSelectedOrder({ commit }, payload) {
    commit('SET_SELECTED_ORDER', payload)
  },
  getExchangeAmount({}, body) {
    return this.$axios.$post('/api/exchanges/calculate_amount', body)
  },
  getMarketCap({}) {
    return this.$axios.$get('/api/transactions/market')
  },
  getAllOrderTransactions({}, params) {
    return this.$axios.$get(`/api/orders/transactions/${params}`)
  },
}
