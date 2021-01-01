<template>
  <div class="order-table text-sm">
    <div
      class="order-header flex justify-between items-start text-xs p-6 whitespace-nowrap"
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
  </div>
</template>
<script>
import { side } from '@/utils/constant'
import OrderTableItem from '@/components/pages/home/order-table-item'
import IconEmpty from '@/components/ui/icon/icon-empty'
export default {
  name: 'OrderTable',
  components: {
    OrderTableItem,
    IconEmpty,
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
  computed: {
    isBuySide() {
      return this.side === side.BUY
    },
  },
}
</script>
