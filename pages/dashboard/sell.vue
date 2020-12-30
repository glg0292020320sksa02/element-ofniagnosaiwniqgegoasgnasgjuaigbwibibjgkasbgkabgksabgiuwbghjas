<template>
  <div class="buy-page container py-8 space-y-8">
    <div class="flex flex-row justify-start items-stretch flex-wrap w-full">
      <market-sell-list
        :orders="orderList"
        :loading="loading"
        class="mx-auto w-full"
      ></market-sell-list>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

import MarketSellList from '@/components/pages/home/market-list/market-sell-list'

const CRYPTO_LIST = ['BTC', 'ETH', 'ETC', 'XRP', 'USDT']
const DEFAULT_TYPE = 'BUY'

export default {
  name: 'BuyPage',
  components: {
    MarketSellList,
  },
}
</script>
