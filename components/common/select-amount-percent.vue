<template>
  <div class="select-amount-percent flex justify-start">
    <el-button
      v-for="percent in amountPercentList"
      :key="percent"
      round
      :type="getTypePercent(percent)"
      @click="selectAmountPercent(percent)"
    >
      {{ percent }}%
    </el-button>
  </div>
</template>

<script>
import Big from 'big.js'

export default {
  name: 'SelectAmountPercent',
  props: {
    value: {
      type: [Number, String],
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      amountPercentList: [25, 50, 75, 100],
    }
  },
  methods: {
    selectAmountPercent(percent) {
      const total = Big(this.total)

      // Big decimal: amount = (this.total * percent) / 100
      const amount = total.times(percent).div(100)

      this.$emit('input', amount.toNumber())
    },
    getTypePercent(percent) {
      const value = Big(this.value || 0)

      // Big decimal: currentPercent = (this.value / this.total) * 100
      const currentPercent = this.total
        ? value.div(this.total).times(100).toNumber()
        : 0

      return currentPercent === percent ? 'primary' : 'none'
    },
  },
}
</script>

<style lang="scss" scoped>
.select-amount-percent .el-button {
  padding: 2px 4px !important;
}
</style>
