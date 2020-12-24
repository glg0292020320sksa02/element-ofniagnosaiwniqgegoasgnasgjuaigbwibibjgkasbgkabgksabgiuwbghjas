<template>
  <div class="buy-page container py-8 space-y-8">
    <div class="flex flex-row justify-start items-stretch flex-wrap w-full">
      <market-buy-list
        :orders="orderList"
        :loading="loading"
        class="mx-auto w-full"
      ></market-buy-list>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

import MarketBuyList from '@/components/pages/home/market-list/market-buy-list'

const CRYPTO_LIST = ['BTC', 'ETH', 'ETC', 'XRP', 'USDT']
const DEFAULT_TYPE = 'BUY'

export default {
  name: 'BuyPage',
  components: {
    // BuyItem,
    MarketBuyList,
  },
  fetch() {
    this.loadAllOrders()
  },
  data() {
    return {
      loading: false,
      orderList: [],
    }
  },
  computed: {
    minPrice() {
      const data = this.orderList.filter(order => order.type === DEFAULT_TYPE)

      if (!data) {
        return []
      }

      const final = data.reduce((op, el) => {
        const symbol = el.source_symbol || 'BTC'

        op[symbol] = op[symbol] || {
          min: { price: Infinity },
        }
        op[symbol].min = op[symbol].min.price > el.price ? el : op[symbol].min

        return op
      }, {})

      return Object.values(final)
    },
    maxPrice() {
      const data = this.orderList.filter(order => order.type === DEFAULT_TYPE)

      if (!data) {
        return []
      }

      const final = data.reduce((op, el) => {
        const symbol = el.source_symbol || 'BTC'

        op[symbol] = op[symbol] || {
          max: { price: -Infinity },
        }
        op[symbol].max = op[symbol].max.price < el.price ? el : op[symbol].max

        return op
      }, {})

      return Object.values(final)
    },
  },
  methods: {
    ...mapActions({
      getAllOrders: 'market/getAllOrders',
    }),
    async loadAllOrders() {
      this.loading = true
      const { data } = await this.getAllOrders()

      this.loading = false
      this.orderList = data
    },
  },
}
</script>
