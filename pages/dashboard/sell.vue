<template>
  <div class="buy-page py-8 space-y-8">
    <market-sell-list class="mx-auto w-full"></market-sell-list>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import MarketSellList from '@/components/pages/binance/home/market-list/market-sell-list'
import { sides } from '~/utils/binance'

export default {
  name: 'SellPage',
  components: {
    MarketSellList,
  },
  mounted() {
    this.setActiveSide(sides.SELL)
  },
  methods: {
    ...mapActions({ setActiveSide: 'binance/setActiveSide' }),
  },
}
</script>
