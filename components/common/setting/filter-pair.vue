<template>
  <el-select
    v-model="pairSelected"
    size="small"
    :placeholder="$t('pair')"
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
  name: 'FilterPair',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      options: [
        'BTC/VNDS',
        'BCH/VNDS',
        'ETH/VNDS',
        'USDT/VNDS',
        'XRP/VNDS',
        'VNDS/VND',
      ],
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
