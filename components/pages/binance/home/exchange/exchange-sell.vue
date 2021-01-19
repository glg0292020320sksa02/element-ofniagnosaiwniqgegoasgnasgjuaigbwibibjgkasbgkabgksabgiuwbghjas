<template>
  <div class="flex flex-col justify-between items-stretch">
    <div class="flex-grow mb-6">
      <input-form label="Toi muon tra" class="mb-4">
        <el-input></el-input>
      </input-form>
      <input-form label="Toi se nhan duoc" class="mb-4">
        <el-input></el-input>
      </input-form>
    </div>
    <div class="flex flex-row justify-between items-center">
      <button
        class="w-2/5 mr-2 px-3 py-3 rounded bg-white border text-body font-medium text-sm"
        @click="$emit('cancel')"
      >
        Cancel
      </button>
      <button
        class="w-3/5 py-3 flex-grow rounded bg-success border border-success text-white font-medium text-sm"
        @click="selectItem"
      >
        Mua USDT
      </button>
    </div>
  </div>
</template>

<script>
import InputForm from '@/components/pages/binance/home/input-form'

export default {
  name: 'ExchangeSell',
  components: {
    InputForm,
  },
}
</script>

<style></style>
