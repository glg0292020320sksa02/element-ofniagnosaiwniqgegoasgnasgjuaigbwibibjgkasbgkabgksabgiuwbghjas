<template>
  <div class="buy-page py-8 space-y-8">
    <market-buy-list class="mx-auto w-full"></market-buy-list>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import MarketBuyList from '@/components/pages/binance/home/market-list/market-buy-list'
import { sides } from '~/utils/binance'

export default {
  name: 'BuyPage',
  components: {
    MarketBuyList,
  },
  mounted() {
    this.setActiveSide(sides.BUY)
  },
  methods: {
    ...mapActions({ setActiveSide: 'binance/setActiveSide' }),
  },
}
</script>
