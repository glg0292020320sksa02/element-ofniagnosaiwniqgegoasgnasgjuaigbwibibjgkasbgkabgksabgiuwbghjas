import createPersistedState from 'vuex-persistedstate'

export default async ({ store }) => {
  await window.onNuxtReady(() => {
    createPersistedState({
      key: 'vuex',
      paths: [
        'selectedUserView',
        'activeTab',
        'market/selectedSellOrder',
        'market/selectedBuyOrder',
      ],
    })(store)
  })
}
