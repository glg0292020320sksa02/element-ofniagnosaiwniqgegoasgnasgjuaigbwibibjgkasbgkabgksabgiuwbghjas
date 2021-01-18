<template>
  <div
    class="order-table-item bg-white p-6 flex justify-between items-start border-b border-gray-200 text-xs"
  >
    <div class="order-column w-3/12 flex flex-col justify-start">
      <div class="flex flex-row justify-start items-center">
        <span
          class="p-1 mr-2 w-4 h-4 rounded-full bg-primary text-white flex justify-center items-center text-xxs"
        >
          M
        </span>
        <span class="text-primary text-sm">Mua ban uy tin</span>
      </div>
      <div class="pl-5">
        <span class="text-subtitle">173 lệnh | 90% hoàn tất</span>
      </div>
    </div>
    <div class="order-column w-3/12">
      <div class="flex flex-row justify-start items-baseline">
        <strong class="text-lg font-bold">23,553.89</strong>
        <span class="text-xs ml-1">VND</span>
      </div>
    </div>
    <div class="order-column w-3/12">
      <div class="flex flex-col justify-start items-stretch whitespace-nowrap">
        <span class="text-xs">
          <span class="text-subtitle w-16 inline-block">Kha dung</span>
          2,235.86 USDT
        </span>
        <span class="text-xs">
          <span class="text-subtitle w-16 inline-block">Gioi han</span>
          d 10,000,000.00 - d 52,658,029.02
        </span>
      </div>
    </div>
    <div class="order-column w-1/12">
      <div class="flex flex-col justify-center items-stretch">
        <div
          v-for="(pay, j) in acceptPayment"
          :key="j + '_pay'"
          class="text-xs flex flex-row justify-start items-center mb-2"
        >
          <components :is="pay.component" class="mr-1"></components>
          <p class="w-full whitespace-normal">{{ pay.name }}</p>
        </div>
      </div>
    </div>
    <div class="order-column w-2/12 flex justify-end">
      <button
        class="w-3/5 py-1 rounded bg-success text-white font-medium text-sm"
      >
        Mua USDT
      </button>
    </div>
  </div>
</template>

<script>
import { paymentMethods } from '@/utils/constant'

import IconVnds from '@/components/ui/icon/icon-vnds'
import IconVcb from '@/components/ui/icon/icon-vcb'
import IconTcb from '@/components/ui/icon/icon-tcb'
import IconPm from '@/components/ui/icon/icon-pm'
export default {
  name: 'OrderTableItem',
  components: {
    IconVnds,
    IconVcb,
    IconTcb,
    IconPm,
  },
  computed: {
    acceptPayment() {
      return paymentMethods
    },
  },
}
</script>

<style></style>
