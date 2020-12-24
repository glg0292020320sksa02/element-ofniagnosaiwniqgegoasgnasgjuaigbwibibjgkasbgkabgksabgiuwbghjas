<template>
  <el-date-picker
    v-model="date"
    size="small"
    type="daterange"
    range-separator="To"
    start-placeholder="Start date"
    end-placeholder="End date"
    value-format="yyyy-MM-dd"
    class="filter-date"
  ></el-date-picker>
</template>

<script>
export default {
  name: 'FilterDate',
  props: {
    startDate: {
      type: String,
      default: '',
    },
    endDate: {
      type: String,
      default: '',
    },
  },
  computed: {
    date: {
      get() {
        return [this.startDate, this.endDate]
      },
      set(value) {
        const [startDate, endDate] = value || ['', '']

        this.$emit('update:start-date', startDate)
        this.$emit('update:end-date', endDate)
      },
    },
  },
}
</script>

<style scope>
.filter-date.el-date-editor--daterange .el-range-separator {
  width: auto;
}
</style>
