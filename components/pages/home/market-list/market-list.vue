<template>
  <div
    class="relative bg-gray-100 p-6 rounded-lg flex flex-col justify-start items-stretch"
  >
    <div class="flex flex-row justify-between items-baseline py-4 px-1">
      <div class="flex flex-row justify-start items-end">
        <c-group-button
          v-model="activeSide"
          class="mr-8"
          :items="sides"
          object
          @change="selectActiveSide($event)"
        ></c-group-button>
        <c-tab v-model="activeTab" :items="tabs"></c-tab>
      </div>
      <el-button
        size="small"
        class="bg-indigo-100 text-primary border-none"
        @click="onRedirectWallet"
      >
        {{ createOrderButtonLabel }}
      </el-button>
    </div>
    <order-table :orders="orderListFiltered" :side="activeSide"></order-table>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { coin, sideRequestObj, side } from '@/utils/constant'
import OrderTable from '@/components/pages/home/order-table'
import CGroupButton from '@/components/ui/control/c-group-button'
import CTab from '@/components/ui/control/c-tab'

export default {
  components: {
    OrderTable,
    CGroupButton,
    CTab,
  },
  fetch() {
    this.loadAllOrders()
  },
  data() {
    return {
      tabs: Object.values(coin),
      sides: Object.values(sideRequestObj),
      activeSide: side.BUY,
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
    createOrderButtonLabel() {
      return this.activeSide === 'BUY'
        ? this.$t('create-a-new-buy-order')
        : this.$t('create-a-new-sell-order')
    },
  },
  methods: {
    ...mapActions({
      getAllOrders: 'market/getAllOrders',
      setActiveSide: 'setActiveSide',
    }),
    async loadAllOrders() {
      this.loading = true
      const { data } = await this.getAllOrders()

      this.loading = false
      this.orders = data
    },
    onRedirectWallet() {},
    selectActiveSide(payload) {
      this.setActiveSide(payload)
    },
  },
}
</script>
