<template>
  <div class="order-table">
    <div class="top-tabs bg-white shadow">
      <div class="container flex flex-row justify-between items-center">
        <div class="flex flex-row justify-start items-center">
          <side-tab></side-tab>
          <coin-tab class="ml-3"></coin-tab>
        </div>
        <button
          class="bg-primary-50 text-primary px-6 py-2 rounded text-xs font-bold"
        >
          Create new buy order
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
          Refresh
        </button>
      </div>
    </div>
    <div class="bottom-tab container">
      <div
        class="order-header flex justify-between items-start text-xs p-6 py-2 whitespace-nowrap"
      >
        <div class="header-column w-2/12 flex justify-start">
          <span class="text-subtitle">{{ $t('advertisers') }}</span>
        </div>
        <div class="header-column w-3/12">
          <span class="text-subtitle">{{ $t('price') }}</span>
        </div>
        <div class="header-column w-4/12">
          <span class="text-subtitle">{{ $t('limitAvailable') }}</span>
        </div>
        <div class="header-column w-1/12">
          <span class="text-subtitle">{{ $t('payment') }}</span>
        </div>
        <div class="header-column w-2/12 flex justify-end">
          <span class="text-subtitle">{{ $t('trade') }}</span>
          <span
            class="bg-green-200 text-success text-xs ml-2 rounded inline-block fee-tag"
          >
            0 PHÍ
          </span>
        </div>
      </div>
      <div class="orders">
        <order-table-item
          v-for="(item, index) in 5"
          :key="index + '_ordertableitem'"
        ></order-table-item>
      </div>
    </div>
  </div>
</template>

<script>
import SideTab from '@/components/pages/binance/home/side-tab'
import CoinTab from '@/components/pages/binance/home/coin-tab'
import FilterOrder from '@/components/pages/binance/home/filter-order'
import IconRefresh from '@/components/ui/icon/icon-refresh'
import OrderTableItem from '@/components/pages/binance/home/order-table-item'
export default {
  components: {
    SideTab,
    CoinTab,
    FilterOrder,
    IconRefresh,
    OrderTableItem,
  },
}
</script>

<style>
.fee-tag {
  padding: 1px 4px;
}
</style>
