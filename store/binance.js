import { sides, coins, fiats, payments } from '~/utils/binance'

export const state = () => ({
  activeCoin: coins.BTC,
  activeSide: sides.BUY,
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
}
