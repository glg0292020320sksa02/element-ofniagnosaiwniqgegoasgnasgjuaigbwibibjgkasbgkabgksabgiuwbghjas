<template>
  <el-select
    v-model="paymentMethod"
    placeholder=""
    class="select-payment-method w-full text-sm"
  >
    <el-option label="VCB_OR_TCB" value="VCB_OR_TCB"></el-option>
    <el-option label="VNDS" value="VNDS"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'SelectPaymentMethod',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
  computed: {
    paymentMethod: {
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
