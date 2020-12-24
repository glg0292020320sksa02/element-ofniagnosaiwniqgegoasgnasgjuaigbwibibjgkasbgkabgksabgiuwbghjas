<template>
  <el-select
    v-model="sideSelected"
    size="small"
    :placeholder="$t('side')"
    clearable
  >
    <el-option label="BUY" value="BUY"></el-option>
    <el-option label="SELL" value="SELL"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'FilterSide',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    sideSelected: {
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
