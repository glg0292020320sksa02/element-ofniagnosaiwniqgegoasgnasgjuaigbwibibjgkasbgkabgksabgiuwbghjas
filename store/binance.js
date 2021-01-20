import { sides, coins, fiats, payments } from '~/utils/binance'

export const state = () => ({
  activeCoin: coins.BTC,
  activeSide: sides.BUY,
  selectedOrder: null,
  filterOrder: {
    amount: 0,
    fiat: fiats.VND,
    payment: payments.VCB,
  },
})
export const getters = {
  activeCoin(state) {
    return state.activeCoin
  },
  activeSide(state) {
    return state.activeSide
  },
  filterOrder(state) {
    return state.filterOrder
  },
  selectedOrder(state) {
    return state.selectedOrder || {}
  },
}
export const mutations = {
  SET_ACTIVE_COIN(state, payload) {
    state.activeCoin = payload
  },
  SET_ACTIVE_SIDE(state, payload) {
    state.activeSide = payload
  },
  SET_FILTER_ORDER_ITEM(state, { item, payload }) {
    state.filterOrder[item] = payload
  },
  SET_SELECTED_ORDER(state, payload) {
    state.selectedOrder = payload
  },
}
export const actions = {
  setActiveCoin({ commit }, payload) {
    commit('SET_ACTIVE_COIN', payload)
  },
  setActiveSide({ commit }, payload) {
    commit('SET_ACTIVE_SIDE', payload)
  },
  setFilterOrderItem({ commit }, { item, payload }) {
    commit('SET_FILTER_ORDER_ITEM', { item, payload })
  },
  setSelectedOrder({ commit }, payload) {
    commit('SET_SELECTED_ORDER', payload)
  },

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
