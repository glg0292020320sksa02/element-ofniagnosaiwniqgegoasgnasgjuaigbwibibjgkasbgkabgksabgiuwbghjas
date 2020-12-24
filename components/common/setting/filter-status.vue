<template>
  <el-select
    v-model="statusSelected"
    size="small"
    :placeholder="$t('status')"
    clearable
  >
    <el-option label="COMPLETED" value="COMPLETED"></el-option>
    <el-option label="PROCESSING" value="PROCESSING"></el-option>
    <el-option label="PENDING" value="PENDING"></el-option>
    <el-option label="CANCELLED" value="CANCELLED"></el-option>
    <el-option label="FAILED" value="FAILED"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'FilterStatus',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    statusSelected: {
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

<style lang="scss" scoped></style>
