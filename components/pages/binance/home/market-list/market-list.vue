<template>
  <div class="market-list bg-gray-200">
    <div class="top-tabs bg-white shadow">
      <div class="container flex flex-row justify-between items-center">
        <div class="flex flex-row justify-start items-center">
          <side-tab></side-tab>
          <coin-tab class="ml-3"></coin-tab>
        </div>
        <button
          class="bg-primary-50 text-primary px-6 py-2 rounded text-xs font-bold"
          @click="onRedirectWallet"
        >
          {{ newOrderLabel }}
        </button>
      </div>
    </div>
    <div class="mid-tab shadow">
      <div class="container py-2 flex flex-row justify-between items-end">
        <filter-order></filter-order>
        <button
          class="bg-transparent text-gray-800 border border-gray-300 px-4 py-1 rounded text-xs font-bold flex flex-row flex-nowrap items-center"
          @click="loadAllOrders"
        >
          <icon-refresh class="w-3 h-3 mr-1"></icon-refresh>
          {{ $t('Refresh') }}
        </button>
      </div>
    </div>
    <div class="bottom-tab container">
      <table-content-loader
        v-if="$fetchState.pending || loading"
      ></table-content-loader>
      <order-table v-else :items="orderListFiltered"></order-table>
    </div>
    <div class="drawer">
      <el-drawer
        :visible.sync="drawer"
        :append-to-body="true"
        size="25%"
        class="create-order-drawer"
      >
        <template v-slot:title>
          <div class="bg-primary text-white font-bold">{{ newOrderLabel }}</div>
        </template>
        <div class="px-6">
          <create-buy-order
            v-if="isBuy"
            @created="reloadOrders"
          ></create-buy-order>
          <create-sell-order v-else @created="reloadOrders"></create-sell-order>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import SideTab from '@/components/pages/binance/home/side-tab'
import CoinTab from '@/components/pages/binance/home/coin-tab'
import FilterOrder from '@/components/pages/binance/home/filter-order'
import IconRefresh from '@/components/ui/icon/icon-refresh'
import OrderTable from '@/components/pages/binance/home/order-table'
import TableContentLoader from '@/components/common/table-content-loader'
import CreateSellOrder from '@/components/pages/binance/home/exchange/create-sell-order'
import CreateBuyOrder from '@/components/pages/binance/home/exchange/create-buy-order'

import { sides } from '~/utils/binance'

export default {
  name: 'MarketList',
  components: {
    OrderTable,
    SideTab,
    CoinTab,
    FilterOrder,
    IconRefresh,
    TableContentLoader,
    CreateSellOrder,
    CreateBuyOrder,
  },
  fetch() {
    this.loadAllOrders()
  },
  data() {
    return {
      orders: [],
      loading: false,
      showCreateOrder: false,
      sides,
      drawer: false,
    }
  },
  computed: {
    ...mapGetters({
      activeSide: 'binance/activeSide',
      activeCoin: 'binance/activeCoin',
    }),
    isBuy() {
      return this.activeSide.value === sides.BUY.value
    },
    orderListFiltered() {
      if (!this.orders.length) return []

      return this.orders
        .filter(order => order.type !== this.activeSide?.value)
        .filter(order => {
          const symbol = order?.wallet?.currency?.symbol

          return symbol === this.activeCoin?.symbol
        })
        .sort((a, b) => {
          return b.price - a.price
        })
    },
    newOrderLabel() {
      return this.isBuy
        ? this.$t('create-a-new-buy-order')
        : this.$t('create-a-new-sell-order')
    },
  },
  methods: {
    ...mapActions({
      getAllOrders: 'market/getAllOrders',
      setActiveSide: 'binance/setActiveSide',
    }),
    async loadAllOrders() {
      this.loading = true
      const { data } = await this.getAllOrders()

      this.loading = false
      this.orders = data
    },
    onRedirectWallet() {
      const targetSide = this.isBuy ? sides.BUY : sides.SELL

      this.setActiveSide(targetSide)
      // this.showCreateOrder = true
      this.drawer = true
    },
    selectActiveSide(payload) {
      this.setActiveSide(payload)
    },
    reloadOrders() {
      this.drawer = false
      this.loadAllOrders()
    },
  },
}
</script>
<style>
.create-order-drawer .el-drawer__header {
  @apply bg-primary p-6;
}
.create-order-drawer .el-dialog__close.el-icon {
  @apply text-white !important;
}
</style>
