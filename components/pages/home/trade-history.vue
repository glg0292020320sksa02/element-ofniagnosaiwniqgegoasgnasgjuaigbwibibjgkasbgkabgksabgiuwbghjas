<template>
  <div
    class="relative bg-gray-100 p-6 rounded-lg flex flex-col justify-start items-stretch"
  >
    <div class="py-2 border-b font-bold text-primary">
      <span class="px-4 py-1 bg-primary-50 rounded-full">Transaction</span>
    </div>
    <div class="wallet-table text-sm">
      <div
        class="wallet-header flex justify-between items-start text-xs p-6 py-2"
      >
        <div class="header-column w-1/12">
          <span class="text-subtitle">{{ $t('ID') }}</span>
        </div>
        <div class="header-column w-2/12">
          <span class="text-subtitle">{{ $t('date') }}</span>
        </div>
        <div class="header-column w-1/12">
          <span class="text-subtitle">{{ $t('pair') }}</span>
        </div>
        <div class="header-column w-1/12">
          <span class="text-subtitle">{{ $t('partner') }}</span>
        </div>
        <div class="header-column w-2/12 flex justify-center">
          <span class="text-subtitle">{{ $t('side') }}</span>
        </div>
        <div class="header-column w-2/12 text-right">
          <span class="text-subtitle">
            {{ `${$t('amountCoin')} & ${$t('price')}` }}
          </span>
        </div>
        <div class="header-column w-2/12 text-right">
          <span class="text-subtitle">{{ $t('total') }}</span>
        </div>
      </div>
      <div class="wallet-list rounded-lg">
        <div v-if="listTransactions && listTransactions.length > 0">
          <trade-history-table-item
            v-for="(item, i) in listTransactions"
            :key="i + '_vorder'"
            :item="item"
            @reload="$emit('reload')"
          ></trade-history-table-item>
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
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { format as formatTimeago } from 'timeago.js'

import TradeHistoryTableItem from '@/components/pages/home/trade-history-table-item'
import IconEmpty from '@/components/ui/icon/icon-empty'

import { filterPrice } from '@/filters'

export default {
  name: 'TradeHistory',
  filters: { filterPrice },
  components: {
    TradeHistoryTableItem,
    IconEmpty,
  },
  async fetch() {
    await this.loadHistory()
  },
  data() {
    return {
      options: {
        from_date: '',
        to_date: '',
        side: '',
        pair: '',
        page: 1,
        type: 'EXCHANGE',
      },
      loading: false,
      listTransactions: [],
    }
  },
  methods: {
    ...mapActions({ getAllTransactions: 'setting/getAllTransactions' }),
    async loadHistory() {
      if (this.loading) return

      try {
        this.loading = true
        const { data } = await this.getAllTransactions(this.options)

        this.listTransactions = [...this.listTransactions, ...data]
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
