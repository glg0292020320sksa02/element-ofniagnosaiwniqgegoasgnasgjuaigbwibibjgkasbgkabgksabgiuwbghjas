<template>
  <div class="order-table text-sm">
    <div
      class="order-header flex justify-between items-start text-xs p-6 py-2 whitespace-nowrap"
    >
      <div class="header-column w-2/12">
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
      </div>
    </div>
    <div class="order-list rounded">
      <div v-if="orders && orders.length > 0">
        <order-table-item
          v-for="(item, i) in orders"
          :key="i"
          :item="item"
          :index="i + 1"
          :is-buy="isBuySide"
          @click="drawer = true"
        ></order-table-item>
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
    <div class="drawer">
      <el-drawer
        :visible.sync="drawer"
        :append-to-body="true"
        size="25%"
        class="exchange-drawer"
      >
        <template v-slot:title>
          <div class="bg-primary text-white">{{ drawerTitle }}</div>
        </template>
        <exchange-drawer-sell v-if="isBuySide"></exchange-drawer-sell>
        <exchange-drawer-buy v-else></exchange-drawer-buy>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import { side } from '@/utils/constant'
import { mapActions, mapGetters } from 'vuex'

import OrderTableItem from '@/components/pages/home/order-table-item'
import IconEmpty from '@/components/ui/icon/icon-empty'
import ExchangeDrawerBuy from '@/components/pages/home/exchange-drawer-buy'
import ExchangeDrawerSell from '@/components/pages/home/exchange-drawer-sell'

export default {
  name: 'OrderTable',
  components: {
    OrderTableItem,
    IconEmpty,
    ExchangeDrawerBuy,
    ExchangeDrawerSell,
  },
  props: {
    orders: {
      type: [Object, Array],
      default() {
        return []
      },
    },
    side: {
      type: String,
      default: side.BUY,
    },
  },
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    ...mapGetters({ selectedOrder: 'market/selectedOrder' }),
    isBuySide() {
      return this.side === side.BUY
    },
    drawerTitle() {
      return this.$t(this.isBuySide ? 'sellCoinTo' : 'buyCoinFrom', {
        coin: this.selectedOrder?.source_symbol || '',
        partner: this.selectedOrder?.user?.name || '',
      })
    },
  },
}
</script>
<style>
.exchange-drawer .el-drawer__header {
  @apply bg-primary p-6;
}
.exchange-drawer .el-dialog__close.el-icon {
  @apply text-white !important;
}
</style>
