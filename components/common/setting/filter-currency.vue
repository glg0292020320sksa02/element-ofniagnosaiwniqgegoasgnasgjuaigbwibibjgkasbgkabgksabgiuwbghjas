<template>
  <el-select
    v-model="pairSelected"
    size="small"
    :placeholder="$t('currency')"
    clearable
  >
    <el-option
      v-for="option in options"
      :key="option"
      :label="option"
      :value="option"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'FilterCurrency',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      options: ['BTC', 'BCH', 'ETH', 'USDT', 'XRP', 'VNDS'],
    }
  },
  computed: {
    pairSelected: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>
