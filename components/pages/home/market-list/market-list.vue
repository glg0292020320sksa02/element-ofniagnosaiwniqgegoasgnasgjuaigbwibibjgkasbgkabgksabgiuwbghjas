<template>
  <div
    class="relative bg-gray-100 p-6 rounded-lg flex flex-col justify-start items-stretch"
  >
    <div class="flex flex-row justify-between items-baseline py-4 px-1">
      <div class="flex flex-row justify-start items-end">
        <c-group-button
          :value="activeSide"
          class="mr-8"
          :items="sides"
          object
          @change="selectActiveSide($event)"
        ></c-group-button>
        <c-tab
          :value="activeTab"
          :items="tabsBySide"
          @change="selectActiveTab($event)"
        ></c-tab>
      </div>
      <el-button
        size="small"
        class="bg-primary-100 text-primary border-none"
        @click="onRedirectWallet"
      >
        {{ createOrderButtonLabel }}
      </el-button>
    </div>
    <table-content-loader
      v-if="$fetchState.pending || loading"
    ></table-content-loader>
    <div v-else>
      <order-table :orders="orderListFiltered" :side="activeSide"></order-table>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { coin, sideRequestObj, side } from '@/utils/constant'
import OrderTable from '@/components/pages/home/order-table'
import CGroupButton from '@/components/ui/control/c-group-button'
import CTab from '@/components/ui/control/c-tab'
import TableContentLoader from '@/components/common/table-content-loader'

export default {
  components: {
    OrderTable,
    CGroupButton,
    CTab,
    TableContentLoader,
  },
  fetch() {
    this.loadAllOrders()
  },
  data() {
    return {
      tabs: Object.values(coin),
      sides: Object.values(sideRequestObj),
      orders: [],
      loading: false,
    }
  },
  computed: {
    ...mapGetters({
      activeTab: 'activeTab',
      activeSide: 'activeSide',
    }),
    orderListFiltered() {
      if (!this.orders.length) return []

      return this.orders
        .filter(order => order.type === this.activeSide)
        .filter(order => {
          const symbol = order?.wallet?.currency?.symbol

          return symbol === this.activeTab
        })
        .sort((a, b) => {
          return b.price - a.price
        })
    },
    createOrderButtonLabel() {
      return this.activeSide === 'BUY'
        ? this.$t('create-a-new-sell-order')
        : this.$t('create-a-new-buy-order')
    },
    tabsBySide() {
      return this.activeSide === 'SELL'
        ? this.tabs.filter(item => item !== 'VNDS')
        : this.tabs
    },
  },
  methods: {
    ...mapActions({
      getAllOrders: 'market/getAllOrders',
      setActiveSide: 'setActiveSide',
      setActiveTab: 'setActiveTab',
    }),
    async loadAllOrders() {
      this.loading = true
      const { data } = await this.getAllOrders()

      this.loading = false
      this.orders = data
    },
    onRedirectWallet() {
      const exchangeSide = this.activeSide === side.BUY ? side.SELL : side.BUY
      const router = `/wallet/${exchangeSide.toLowerCase()}?coin=${
        this.activeTab
      }`

      this.$router.push(router)
    },
    selectActiveSide(payload) {
      this.setActiveSide(payload)
    },
    selectActiveTab(payload) {
      this.setActiveTab(payload)
    },
  },
}
</script>
