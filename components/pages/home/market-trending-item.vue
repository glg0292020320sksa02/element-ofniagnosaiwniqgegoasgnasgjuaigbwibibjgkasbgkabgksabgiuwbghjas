<template>
  <div
    class="market-trending-item rounded-lg overflow-hidden shadow-sm text-xs p-4 flex flex-row justify-between items-stretch h-32 bg-white relative"
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
          ~{{ getMarketUSD.price | filterPrice }}$
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
    <div
      v-if="canExchange"
      class="action rounded-lg absolute flex-row justify-center items-center w-full h-full"
    >
      <button
        :disabled="!buy"
        class="px-3 py-1 text-white mr-1 rounded text-xs whitespace-nowrap flex-nowrap relative z-10"
        :class="
          !buy
            ? 'bg-gray-200 text-subtitle cursor-not-allowed border'
            : 'bg-success text-white'
        "
        @click="$emit('buy')"
      >
        {{ $t('buy') }}
      </button>
      <button
        :disabled="!sell"
        class="px-3 py-1 error-btn text-white ml-1 rounded text-xs whitespace-nowrap flex-nowrap relative z-10"
        :class="
          !sell
            ? 'bg-gray-200 text-subtitle cursor-not-allowed border'
            : 'bg-error text-white'
        "
        @click="$emit('sell')"
      >
        {{ $t('sell') }}
      </button>
    </div>
  </div>
</template>
<script>
import { filterPercent, filterPrice, filterMarketCap } from '@/filters'
import { coin } from '@/utils/constant'
import IconLink from '@/components/ui/icon/icon-link'
const BASE_URL_SPARKLINES =
  'https://s3.coinmarketcap.com/generated/sparklines/web/7d/usd'

export default {
  name: 'MarketTrendingItem',
  filters: { filterPercent, filterPrice, filterMarketCap },
  components: {
    IconLink,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    buy: {
      type: [Object, Number],
      default() {
        return null
      },
    },
    sell: {
      type: [Object, Number],
      default() {
        return null
      },
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
    canExchange() {
      return Object.keys(coin).includes(this.item.symbol)
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
.action {
  top: 0;
  left: 0;
  display: none;
}
.market-trending-item:hover .action {
  display: flex;
}
.action::before {
  content: '';
  background: black;
  opacity: 0.15;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
