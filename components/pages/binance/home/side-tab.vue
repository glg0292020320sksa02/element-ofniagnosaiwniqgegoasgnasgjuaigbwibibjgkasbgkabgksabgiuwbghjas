<template>
  <div class="side-tab bg-gray-100 rounded border border-gray-300 inline-block">
    <button
      v-for="(side, index) in sides"
      :key="index + '_side'"
      class="px-4 py-1 text-xs font-bold rounded"
      :class="side.value === activeSide.value ? activeStyle : 'text-gray-800'"
      @click="changeSide(side)"
    >
      {{ $t(side.name) }}
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { sides } from '~/utils/binance'
export default {
  name: 'SideTab',
  data() {
    return {
      sides: Object.values(sides),
    }
  },
  computed: {
    ...mapGetters({ activeSide: 'binance/activeSide' }),
    isBuy() {
      return this.activeSide.value === sides.BUY.value
    },
    activeStyle() {
      return this.isBuy
        ? 'bg-success text-white shadow'
        : 'bg-error text-white shadow'
    },
  },
  methods: {
    ...mapActions({ setActiveSide: 'binance/setActiveSide' }),
    changeSide(item) {
      this.setActiveSide(item)
    },
  },
}
</script>

<style>
.side-tab {
  padding: 2px;
}
</style>
