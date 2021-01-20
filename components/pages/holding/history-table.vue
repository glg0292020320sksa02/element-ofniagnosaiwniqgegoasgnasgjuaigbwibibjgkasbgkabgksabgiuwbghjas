<template>
  <div class="wallet-table text-sm">
    <div
      class="wallet-header flex justify-between items-start text-xs p-6 py-2 whitespace-nowrap"
    >
      <div class="header-column w-2/12">
        <span class="text-subtitle">{{ $t('date') }}</span>
      </div>
      <div class="header-column w-2/12">
        <span class="text-subtitle">{{ $t('coin') }}</span>
      </div>
      <div class="header-column w-2/12 text-right">
        <span class="text-subtitle">{{ $t('coinAmount') }}</span>
      </div>
      <div class="header-column w-2/12 text-right">
        <span class="text-subtitle">{{ $t('status') }}</span>
      </div>
      <div class="header-column w-4/12 flex justify-end">
        <span class="text-subtitle">{{ $t('fee') }}</span>
      </div>
    </div>
    <div v-if="items && items.length > 0" class="wallet-list rounded-lg">
      <history-table-item
        v-for="(item, i) in items"
        :key="i + '_vother'"
        :item="item"
      ></history-table-item>
    </div>
    <div
      v-else
      class="flex flex-col justify-center items-center p-8 text-gray-300"
    >
      <div class="p-2 rounded-full bg-primary-50 mb-1">
        <icon-empty class="w-6 h-6 text-gray-300"></icon-empty>
      </div>
      <span class="text-xs">{{ $t('orderNotFound') }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { filterPrice } from '@/filters'
import HistoryTableItem from '@/components/pages/holding/history-table-item'
import IconEmpty from '@/components/ui/icon/icon-empty'

export default {
  name: 'DepositHistory',
  filters: { filterPrice },
  components: {
    HistoryTableItem,
    IconEmpty,
  },
  props: {
    items: {
      type: [Object, Array],
      required: true,
    },
  },
  data() {
    return {
      listTransactions: [],
      transTotal: 0,
    }
  },
  methods: {
    ...mapActions({
      getAllOrderTransactions: 'market/getAllOrderTransactions',
    }),

    getColorSide(side) {
      return side.toLowerCase() === 'buy' ? 'text-success' : 'text-error'
    },
    sourceSymbol(source_symbol) {
      return source_symbol || ''
    },
    targetSymbol(target_symbol) {
      return target_symbol || ''
    },
    getColorTotal(total) {
      return Number(total) > 0 ? 'text-success' : 'text-error'
    },
    amountAbsolute(amount) {
      const amountCal = Number(amount) || 0

      return Math.abs(amountCal)
    },
    selectRow(row) {
      this.$refs.openOrder.toggleRowExpansion(row, true)
    },
  },
}
</script>
