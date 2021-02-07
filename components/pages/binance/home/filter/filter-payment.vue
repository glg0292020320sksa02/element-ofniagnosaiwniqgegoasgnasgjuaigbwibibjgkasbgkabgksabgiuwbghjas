<template>
  <div class="filter-payment">
    <label for="amountfilter" class="text-xs text-subtitle">
      {{ $t('Payment') }}
    </label>
    <div class="filter-box flex flex-row justify-start">
      <div
        v-if="dialog"
        class="fixed top-0 left-0 w-screen h-screen bg-transparent"
        @click="tooglePayments"
      ></div>
      <div class="relative inline-block z-10 hover:z-10">
        <button
          type="text"
          class="border bg-transparent border-gray-300 rounded px-3 py-1 text-sm flex flex-row justify-between items-center hover:border-yellow-600"
          :placeholder="$t('EnterAmount')"
          @click="tooglePayments"
        >
          <component :is="filterComponent"></component>
          <span class="text-sm ml-2 mr-4 h-4 mb-1">
            {{ $t(filterPaymentName) }}
          </span>
          <icon-chevron-down
            class="w-3 h-3 font-bold text-subtitle"
          ></icon-chevron-down>
        </button>
        <div
          v-if="dialog"
          class="select-list absolute shadow bg-white rounded w-full"
        >
          <div
            v-for="(payment, index) in payments"
            :key="index + '_payment'"
            class="flex flex-row justify-start text-xs px-3 p-2 rounded cursor-pointer hover:bg-gray-100"
            @click="selectFiat(payment)"
          >
            <component :is="payment.component"></component>
            <span class="ml-1">{{ $t(payment.name) }}</span>
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
import IconUsdt from '@/components/ui/icon/icon-usdt'
import IconAllPayment from '@/components/ui/icon/icon-all-payment'

import { payments } from '~/utils/binance'

export default {
  name: 'FilterPayment',
  components: {
    IconChevronDown,
    IconVnds,
    IconVcb,
    IconTcb,
    IconPm,
    IconUsdt,
    IconAllPayment,
  },
  data() {
    return {
      model: {
        amount: null,
      },
      dialog: false,
    }
  },
  computed: {
    ...mapGetters({ filterOrder: 'binance/filterOrder' }),
    filterFiat() {
      return this.filterOrder?.fiat?.value
    },
    payments() {
      const defaultPayment = Object.values(payments)

      defaultPayment.unshift({
        name: 'All payments',
        value: '',
        icon: 'all-payment.png',
        component: 'icon-all-payment',
        accept: ['SELL'],
        symbol: '',
        filterBy: ['VND', 'USD'],
      })

      return defaultPayment.filter(item =>
        item.filterBy.includes(this.filterFiat)
      )
    },
    filterComponent() {
      return this.filterOrder?.payment?.component
    },
    filterPaymentName() {
      return this.filterOrder?.payment?.name
    },
  },
  watch: {
    payments() {
      this.setFilterOrderItem({
        item: 'payment',
        payload: this.payments[0] || null,
      })
    },
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
