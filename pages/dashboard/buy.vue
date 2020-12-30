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
const DEFAULT_TYPE = 'SELL'

export default {
  name: 'BuyPage',
  components: {
    MarketBuyList,
  },
}
</script>
