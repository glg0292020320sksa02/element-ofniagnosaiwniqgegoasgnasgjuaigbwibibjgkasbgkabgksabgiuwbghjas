<template>
  <div class="market-list bg-gray-200">
    <div class="top-tabs bg-white shadow">
      <div class="container flex flex-row justify-between items-center">
        <div class="flex flex-row justify-start items-center">
          <side-tab></side-tab>
          <coin-tab class="ml-3"></coin-tab>
        </div>
        <button
          class="bg-primary-50 text-primary px-6 py-2 rounded text-xs font-bold"
        >
          {{ newOrderLabel }}
        </button>
      </div>
    </div>
    <div class="mid-tab shadow">
      <div class="container py-2 flex flex-row justify-between items-end">
        <filter-order></filter-order>
        <button
          class="bg-transparent text-gray-800 border border-gray-300 px-4 py-1 rounded text-xs font-bold flex flex-row flex-nowrap items-center"
        >
          <icon-refresh class="w-3 h-3 mr-1"></icon-refresh>
          {{ $t('Refresh') }}
        </button>
      </div>
    </div>
    <div class="bottom-tab container">
      <order-table :items="items"></order-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import SideTab from '@/components/pages/binance/home/side-tab'
import CoinTab from '@/components/pages/binance/home/coin-tab'
import FilterOrder from '@/components/pages/binance/home/filter-order'
import IconRefresh from '@/components/ui/icon/icon-refresh'
import OrderTable from '@/components/pages/binance/home/order-table'
import { sides } from '~/utils/binance'

export default {
  name: 'MarketList',
  components: {
    OrderTable,
    SideTab,
    CoinTab,
    FilterOrder,
    IconRefresh,
  },
  data() {
    return {
      items: 5,
    }
  },
  computed: {
    ...mapGetters({ activeSide: 'binance/activeSide' }),
    isBuy() {
      return this.activeSide.value === sides.BUY.value
    },
    newOrderLabel() {
      return this.isBuy
        ? this.$t('create-a-new-buy-order')
        : this.$t('create-a-new-sell-order')
    },
  },
}
</script>
