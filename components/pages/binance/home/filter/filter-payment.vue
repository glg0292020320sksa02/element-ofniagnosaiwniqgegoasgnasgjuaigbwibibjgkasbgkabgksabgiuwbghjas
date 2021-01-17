<template>
  <div class="filter-amount">
    <label for="amountfilter" class="text-xs text-subtitle">
      {{ $t('Payment') }}
    </label>
    <div class="filter-box flex flex-row justify-start">
      <div class="relative inline-block z-10 hover:z-10">
        <button
          type="text"
          class="border bg-transparent border-gray-300 rounded px-3 py-1 text-sm flex flex-row justify-between items-center hover:border-yellow-600"
          :placeholder="$t('EnterAmount')"
          @click="tooglePayments"
        >
          <component :is="filterOrder.payment.component"></component>
          <span class="text-sm ml-2 mr-4">{{ filterOrder.payment.name }}</span>
          <icon-chevron-down
            class="w-3 h-3 font-bold text-subtitle"
          ></icon-chevron-down>
        </button>
        <div v-if="dialog" class="select-list absolute bg-white rounded w-full">
          <div
            v-for="(payment, index) in payments"
            :key="index + '_payment'"
            class="flex flex-row justify-start text-xs px-3 p-2 rounded cursor-pointer hover:bg-gray-100"
            @click="selectFiat(payment)"
          >
            <component :is="payment.component"></component>
            <span class="ml-1">{{ payment.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import IconChevronDown from '@/components/ui/icon/icon-chevron-down'
import IconVcb from '@/components/ui/icon/icon-vcb'
import IconTcb from '@/components/ui/icon/icon-tcb'
import IconVnds from '@/components/ui/icon/icon-vnds'
import IconPm from '@/components/ui/icon/icon-pm'

import { payments } from '~/utils/binance'

export default {
  name: 'FilterAmount',
  components: {
    IconChevronDown,
    IconVnds,
    IconVcb,
    IconTcb,
    IconPm,
  },
  data() {
    return {
      model: {
        amount: null,
      },
      payments: Object.values(payments),
      dialog: false,
    }
  },
  computed: {
    ...mapGetters({ filterOrder: 'binance/filterOrder' }),
  },
  methods: {
    ...mapActions({ setFilterOrderItem: 'binance/setFilterOrderItem' }),
    tooglePayments() {
      this.dialog = !this.dialog
    },
    selectFiat(payment) {
      this.setFilterOrderItem({ item: 'payment', payload: payment })
      this.tooglePayments()
    },
  },
}
</script>

<style>
.unit-filter {
  bottom: 50%;
  right: 8px;
  transform: translateY(50%);
}
.search-filter {
  left: -1px;
}
.search-filter:hover {
  z-index: 20;
}
</style>
