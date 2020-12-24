<template>
  <div
    :class="{ 'py-6 border-r border-b': isGrid, 'py-2': isList }"
    class="px-6"
    style="max-height: 170px"
  >
    <div
      :class="{ 'grid-container': isGrid, 'list-container': isList }"
      class="w-full"
    >
      <div class="image">
        <svg-icon
          prefix="crypto"
          :name="market.symbol"
          :size="isGrid ? 20 : 32"
        ></svg-icon>
      </div>
      <div class="coin">
        <div :class="{ 'font-bold text-sm': isGrid }">
          <span>{{ market.name }}</span>
          <span class="text-xs text-subtitle">({{ market.symbol }})</span>
        </div>
      </div>
      <div class="price">
        <div :class="{ 'text-xl font-bold': isGrid, 'w-32': isList }">
          {{ getMarketUSD.price | filterPrice }}
        </div>
      </div>
      <div v-if="isGrid" class="time">
        <div class="text-sm text-subtitle">7d</div>
      </div>
      <div class="change">
        <div :class="{ 'text-sm': isGrid, 'w-32': isList }" class="font-bold">
          <span :class="isPercentUp ? 'text-success' : 'text-error'">
            {{ getMarketUSD.percent_change_7d | filterPercent }}
          </span>
        </div>
      </div>
      <div v-if="isList" class="marketCap">
        <div>${{ getMarketUSD.market_cap | filterMarketCap }}</div>
      </div>
      <div class="trending mx-auto">
        <img
          :src="vector"
          alt=""
          :class="isPercentUp ? 'graph-up' : 'graph-down'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { filterPercent, filterPrice, filterMarketCap } from '@/filters'

const BASE_URL_SPARKLINES =
  'https://s3.coinmarketcap.com/generated/sparklines/web/7d/usd'

export default {
  name: 'MarketTrendingItem',
  filters: { filterPercent, filterPrice, filterMarketCap },

  props: {
    market: {
      type: Object,
      default: () => ({}),
    },
    isGrid: {
      type: Boolean,
      default: true,
    },
    isList: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getMarketUSD() {
      return this.market?.quote?.USD || {}
    },
    isPercentUp() {
      return this.getMarketUSD.percent_change_7d > 0
    },
    vector() {
      return `${BASE_URL_SPARKLINES}/${this.market.id}.png`
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
