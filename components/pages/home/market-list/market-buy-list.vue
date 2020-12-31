<template>
  <div
    class="relative bg-gray-100 p-6 rounded-lg flex flex-col justify-start items-stretch"
  >
    <div class="flex flex-row justify-between items-baseline py-4 px-1">
      <div class="flex flex-row justify-start items-end">
        <c-tab
          v-model="activeTab"
          :items="tabs"
          @change="selectActiveTab($event)"
        ></c-tab>
      </div>
      <el-button
        size="small"
        class="bg-primary-100 text-primary border-none"
        @click="onRedirectWallet"
      >
        Tạo lệnh mua mới
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
import { mapActions } from 'vuex'
import { coin, sideRequestObj, side } from '@/utils/constant'
import OrderTable from '@/components/pages/home/order-table'
import CTab from '@/components/ui/control/c-tab'
import TableContentLoader from '@/components/common/table-content-loader'

export default {
  components: {
    OrderTable,
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
      activeSide: side.SELL,
      activeTab: coin.BTC,
      orders: [],
      loading: false,
    }
  },
  computed: {
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
  },
  methods: {
    ...mapActions({
      getAllOrders: 'market/getAllOrders',
      setActiveTab: 'setActiveTab',
    }),
    async loadAllOrders() {
      this.loading = true
      const { data } = await this.getAllOrders()

      this.loading = false
      this.orders = data
    },
    onRedirectWallet() {
      const router = `/wallet/buy?coin=${this.activeTab}`

      this.$router.push(router)
    },
    selectActiveTab(payload) {
      this.setActiveTab(payload)
    },
  },
}
</script>
