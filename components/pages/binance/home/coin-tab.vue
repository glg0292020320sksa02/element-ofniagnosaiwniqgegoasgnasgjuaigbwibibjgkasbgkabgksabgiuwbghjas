<template>
  <div class="coin-tab">
    <button
      v-for="(coin, index) in coinsBySide"
      :key="index + '_coins'"
      class="text-xs mx-3 py-4 border-b-2"
      :class="
        activeCoin.symbol === coin.symbol
          ? 'text-warning border-warning'
          : 'border-white'
      "
      @click="changeCoin(coin)"
    >
      {{ coin.name }}
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { coins } from '~/utils/binance'
export default {
  name: 'CoinTab',
  data() {
    return {
      coins: Object.values(coins),
    }
  },
  computed: {
    ...mapGetters({
      activeCoin: 'binance/activeCoin',
      activeSide: 'binance/activeSide',
    }),
    coinsBySide() {
      return this.coins.filter(item =>
        item.side.includes(this.activeSide.value)
      )
    },
  },
  methods: {
    ...mapActions({ setActiveCoin: 'binance/setActiveCoin' }),
    changeCoin(item) {
      this.setActiveCoin(item)
    },
  },
}
</script>

<style></style>
