<template>
  <div class="market-list bg-gray-200">
    <div class="top-tabs bg-white shadow">
      <div class="container flex flex-row justify-between items-center">
        <div class="flex flex-row justify-start items-center">
          <div
            class="side-tab bg-gray-100 rounded border border-gray-300 inline-block"
          >
            <button
              class="px-4 py-1 text-xs font-bold rounded bg-error text-white shadow"
            >
              {{ $t(side.name) }}
            </button>
          </div>
          <coin-tab class="ml-3"></coin-tab>
        </div>
        <button
          class="bg-primary-50 text-primary px-6 py-2 rounded text-xs font-bold"
          @click="onRedirectWallet"
        >
          {{ $t('create-a-new-sell-order') }}
        </button>
      </div>
    </div>
    <div class="mid-tab shadow">
      <div class="container py-2 flex flex-row justify-between items-end">
        <filter-order></filter-order>
        <button
          class="bg-transparent text-gray-800 border border-gray-300 px-4 py-1 rounded text-xs font-bold flex flex-row flex-nowrap items-center"
          @click="loadAllOrders()"
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
      <div class="flex flex-row justify-end my-4">
        <el-pagination
          :current-page.sync="options.page"
          background
          small
          layout="prev, pager, next"
          :page-size="options.perPage"
          :total="options.totalPage"
          class="order-pagination mx-0 px-0 text-subtitle"
          @current-change="loadOrdersByPage"
        ></el-pagination>
      </div>
    </div>
    <div class="drawer">
      <el-drawer
        :visible.sync="drawer"
        :append-to-body="true"
        size="25%"
        class="create-order-drawer"
      >
        <template v-slot:title>
          <div class="bg-primary text-white font-bold">
            {{ $t('create-a-new-sell-order') }}
          </div>
        </template>
        <div class="px-6">
          <create-sell-order @created="reloadOrders"></create-sell-order>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import CoinTab from '@/components/pages/binance/home/coin-tab'
import FilterOrder from '@/components/pages/binance/home/filter-order'
import IconRefresh from '@/components/ui/icon/icon-refresh'
import OrderTable from '@/components/pages/binance/home/order-table'
import TableContentLoader from '@/components/common/table-content-loader'
import CreateSellOrder from '@/components/pages/binance/home/exchange/create-sell-order'

import { sides } from '~/utils/binance'

export default {
  name: 'MarketSellList',
  components: {
    OrderTable,
    CoinTab,
    FilterOrder,
    IconRefresh,
    TableContentLoader,
    CreateSellOrder,
  },
  fetch() {
    this.loadAllOrders()
  },
  data() {
    return {
      orders: [],
      loading: false,
      showCreateOrder: false,
      side: sides.SELL,
      sides,
      drawer: false,
      options: {
        payment_method: '',
        amount: '',
        user_id: '',
        currency: '',
        page: 1,
        fiat: '',
        type: '',
        totalPage: 1,
        perPage: 150,
      },
    }
  },
  computed: {
    ...mapGetters({
      activeSide: 'binance/activeSide',
      activeCoin: 'binance/activeCoin',
      filterOrder: 'binance/filterOrder',
    }),
    optionsToString() {
      return (
        this.options.payment_method +
        this.options.amount +
        this.options.user_id +
        this.options.currency +
        this.options.fiat +
        this.options.type
      )
    },
    filterOrderToString() {
      return (
        this.filterOrder?.amount +
        this.filterOrder?.payment?.value +
        this.filterOrder?.fiat?.value
      )
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
  },
  watch: {
    optionsToString() {
      this.options.page = 1
      this.loadAllOrders(this.options)
    },
    filterOrderToString() {
      this.options.amount = this.filterOrder?.amount || ''
      this.options.fiat = this.filterOrder?.fiat?.value || 'VND'
      this.options.payment_method = this.filterOrder?.payment?.value || ''
    },
  },
  methods: {
    ...mapActions({
      getAllOrders: 'market/getAllOrders',
      setActiveSide: 'binance/setActiveSide',
    }),
    async loadAllOrders(options) {
      this.loading = true
      const parrams = {
        payment_method: options?.payment_method,
        amount: options?.amount,
        user_id: options?.user_id,
        currency: options?.currency,
        fiat: options?.fiat,
        page: options?.page,
        type: options?.type,
      }
      const { data, total, per_page } = await this.getAllOrders(parrams)

      this.loading = false
      this.orders = data
      this.options.totalPage = total || 1
      this.options.perPage = per_page || 1000
    },
    async loadOrdersByPage() {
      await this.loadAllOrders(this.options)
    },
    onRedirectWallet() {
      this.setActiveSide(this.side)
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
.order-pagination .number,
.order-pagination .el-icon.more.btn-quicknext,
.order-pagination .btn-prev,
.order-pagination .btn-next {
  @apply bg-transparent text-subtitle font-normal !important;
}
.order-pagination .number.active {
  @apply bg-gray-300 text-body !important;
}
</style>
