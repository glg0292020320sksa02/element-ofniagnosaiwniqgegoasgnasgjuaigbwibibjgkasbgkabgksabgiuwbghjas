<template>
  <div
    class="market-trending-item rounded-lg shadow-sm text-xs p-4 flex flex-row justify-between items-stretch h-32 bg-white"
  >
    <div class="coin-info flex flex-col justify-between items-start">
      <span class="flex justify-start">
        <svg-icon
          prefix="crypto"
          :name="item.symbol"
          :size="16"
          class="mr-2"
        ></svg-icon>
        {{ item.symbol }}/{{ item.name }}
      </span>
      <div class="flex flex-col justify-end items-start">
        <strong class="text-base">
          1{{ item.symbol }} = {{ getMarketUSD.price | filterPriceMoney }}$
        </strong>
        <span class="text-subtitle">
          24h Vol {{ getMarketUSD.market_cap | filterMarketCap }}
        </span>
      </div>
    </div>
    <div class="coin-chart flex flex-col justify-between items-end">
      <div class="flex flex-col justify-start items-end flex-grow">
        <strong :class="isPercentUp ? 'text-success' : 'text-error'">
          {{ getMarketUSD.percent_change_7d | filterPercent }}
        </strong>
        <img
          :src="vector"
          alt=""
          :class="isPercentUp ? 'graph-up' : 'graph-down'"
          class="h-8"
        />
      </div>
      <a
        :href="`https://coinmarketcap.com/currencies/${item.slug}`"
        target="_blank"
      >
        <icon-link class="w-4 h-4 text-gray-600 hover:text-primary"></icon-link>
      </a>
    </div>
  </div>
</template>
<script>
import { filterPercent, filterMarketCap, filterPriceMoney } from '@/filters'

import IconLink from '@/components/ui/icon/icon-link'
const BASE_URL_SPARKLINES =
  'https://s3.coinmarketcap.com/generated/sparklines/web/7d/usd'

export default {
  name: 'MarketTrendingItem',
  filters: { filterPercent, filterMarketCap, filterPriceMoney },
  components: {
    IconLink,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getMarketUSD() {
      return this.item?.quote?.USD || {}
    },
    isPercentUp() {
      return this.getMarketUSD.percent_change_7d > 0
    },
    vector() {
      return `${BASE_URL_SPARKLINES}/${this.item.id}.png`
    },
  },
}
</script>
<style scoped>
.graph-up {
  filter: hue-rotate(85deg) saturate(80%) brightness(0.85);
}
.graph-down {
  filter: hue-rotate(300deg) saturate(210%) brightness(0.7) contrast(170%);
}
</style>
