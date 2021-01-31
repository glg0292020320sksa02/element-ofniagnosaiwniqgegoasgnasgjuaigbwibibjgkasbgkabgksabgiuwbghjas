<template>
  <div class="market-trending bg-gray-100 rounded-lg p-6 py-8">
    <table-content-loader
      v-if="$fetchState.pending || loading"
    ></table-content-loader>
    <div v-else class="flex flex-row justify-start items-stretch flex-wrap">
      <div
        v-for="market in marketTrendingSelected"
        :key="market.id"
        class="w-64 m-1 flex-grow"
      >
        <market-trending-item
          :item="market"
          :buy="bestSellOrders[market.symbol]"
          :sell="bestBuyOrders[market.symbol]"
          @buy="selectSellOrder(market.symbol)"
          @sell="selectBuyOrder(market.symbol)"
        ></market-trending-item>
      </div>
      <div class="w-64 m-1 flex-grow">
        <market-trending-item :item="vnds"></market-trending-item>
      </div>
      <div class="w-64 m-1 flex-grow"></div>
      <div class="w-64 m-1 flex-grow"></div>
    </div>

    <div class="drawer">
      <el-drawer
        :visible.sync="drawer"
        :append-to-body="true"
        size="25%"
        class="exchange-drawer"
      >
        <template v-slot:title>
          <div class="bg-primary text-white">{{ drawerTitle }}</div>
        </template>
        <div class="p-6">
          <exchange-sell
            v-if="isBuySide"
            :payment-methods="acceptPayment"
            @cancel="toogleExpand"
          ></exchange-sell>
          <exchange-buy
            v-else
            :payment-methods="acceptPayment"
            @cancel="toogleExpand"
          ></exchange-buy>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import { payments } from '@/utils/binance'

import { mapGetters, mapActions } from 'vuex'

import MarketTrendingItem from '@/components/pages/home/market-trending-item'
import TableContentLoader from '@/components/common/table-content-loader'

import ExchangeBuy from '@/components/pages/binance/home/exchange/exchange-buy'
import ExchangeSell from '@/components/pages/binance/home/exchange/exchange-sell'
import { sides } from '~/utils/binance'

const START_MARKET_SELECTED = 0
const MAX_LENGTH_MARKET_SELECTED = 8

export default {
  name: 'MarketTrending',
  components: {
    MarketTrendingItem,
    TableContentLoader,
    ExchangeBuy,
    ExchangeSell,
  },
  async fetch() {
    this.loading = true
    this.marketTrendingList = await this.getListingLatest()
    await this.loadAllOrders()
    this.loading = false
  },
  data() {
    return {
      type: 'grid',
      marketTrendingList: [],
      loading: false,
      drawer: false,
      isBuySide: false,
      orders: [],
      payments: Object.values(payments),
      options: {
        payment_method: '',
        amount: '',
        user_id: '',
        currency: '',
        fiat: '',
        page: 1,
        type: '',
        totalPage: 1,
        perPage: 150,
      },
    }
  },
  computed: {
    ...mapGetters({ selectedOrder: 'binance/selectedOrder' }),
    marketTrendingSelected() {
      const enableIds = [1, 1027, 1321, 52, 825, 3]

      return this.marketTrendingList.filter(item => enableIds.includes(item.id))
    },
    vnds() {
      return {
        id: 1321,
        name: 'VNDS',
        symbol: 'VNDS',
        slug: 'ethereum-classic',
        num_market_pairs: 284,
        date_added: '2016-07-24T00:00:00.000Z',
        tags: ['mineable', 'pow', 'ethash', 'platform', 'smart-contracts'],
        max_supply: 210700000,
        circulating_supply: 116313299,
        total_supply: 116313299,
        platform: null,
        cmc_rank: 40,
        last_updated: '2021-01-06T17:17:04.000Z',
        quote: {
          USD: {
            price: 23092.5,
            volume_24h: 250292,
            percent_change_1h: 0.0426065,
            percent_change_24h: 0.4446165,
            percent_change_7d: 0.30965054,
            market_cap: 198000000,
            last_updated: '2021-01-06T17:17:04.000Z',
          },
        },
      }
    },
    isPending() {
      return this.$fetchState.pending
    },
    drawerTitle() {
      return this.$t(this.isBuySide ? 'sellCoinTo' : 'buyCoinFrom', {
        coin: this.selectedOrder?.source_symbol || '',
        partner: this.selectedOrder?.user?.name || '',
      })
    },
    acceptPayment() {
      return this.payments.filter(item => {
        if (this.selectedOrder?.source_symbol === 'VNDS') {
          return (
            item.value !== 'VNDS' &&
            item?.accept.includes(this.selectedOrder?.side)
          )
        }

        return item?.accept.includes(this.selectedOrder?.side)
      })
    },
    bestSellOrders() {
      const sellOrder = {}

      if (!this.orders?.length > 0) {
        return sellOrder
      }

      this.orders
        .filter(order => order.type === sides.SELL?.value)
        .map(item => {
          const coinId = item?.source_symbol

          if (!(coinId in sellOrder)) {
            sellOrder[coinId] = item
          }

          return (sellOrder[coinId] =
            sellOrder[coinId].price <= item.price ? sellOrder[coinId] : item)
        })

      return sellOrder
    },
    bestBuyOrders() {
      const buyOrder = {}

      if (!this.orders?.length > 0) {
        return buyOrder
      }

      this.orders
        .filter(order => order.type === sides.BUY?.value)
        .map(item => {
          const coinId = item?.source_symbol

          if (!(coinId in buyOrder)) {
            buyOrder[coinId] = item
          }

          return (buyOrder[coinId] =
            buyOrder[coinId].price >= item.price ? buyOrder[coinId] : item)
        })

      return buyOrder
    },
  },
  methods: {
    ...mapActions({
      getListingLatest: 'market/getListingLatest',
      getAllOrders: 'market/getAllOrders',
      setSelectedOrder: 'binance/setSelectedOrder',
      getDetailOrder: 'binance/getDetailOrder',
    }),
    async loadAllOrders(options) {
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

      this.orders = data
      this.options.totalPage = total || 1
      this.options.perPage = per_page || 1000
    },
    async selectSellOrder(id) {
      const order = this.bestSellOrders[id]

      if (order) {
        const data = await this.getDetailOrder(order.id)

        this.setSelectedOrder(data || order)

        this.isBuySide = false
        this.drawer = true
      }
    },
    async selectBuyOrder(id) {
      const order = this.bestBuyOrders[id]

      if (order) {
        const data = await this.getDetailOrder(order.id)

        this.setSelectedOrder(data || order)
        this.isBuySide = true
        this.drawer = true
      }
    },
    toogleExpand() {
      this.drawer = !this.drawer
    },
  },
}
</script>
<style>
.exchange-drawer .el-drawer__header {
  @apply bg-primary p-6;
}
.exchange-drawer .el-dialog__close.el-icon {
  @apply text-white !important;
}
</style>
