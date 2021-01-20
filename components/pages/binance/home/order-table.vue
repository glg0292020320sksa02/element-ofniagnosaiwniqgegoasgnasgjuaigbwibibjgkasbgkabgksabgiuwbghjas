<template>
  <div class="order-table">
    <div
      class="order-header flex justify-between items-start text-xs p-6 py-2 whitespace-nowrap"
    >
      <div class="header-column w-3/12 flex justify-start">
        <span class="text-subtitle">{{ $t('advertisers') }}</span>
      </div>
      <div class="header-column w-3/12">
        <span class="text-subtitle">{{ $t('price') }}</span>
      </div>
      <div class="header-column w-3/12">
        <span class="text-subtitle">{{ $t('limitAvailable') }}</span>
      </div>
      <div class="header-column w-1/12">
        <span class="text-subtitle">{{ $t('payment') }}</span>
      </div>
      <div class="header-column w-2/12 flex-wrap flex justify-end">
        <span class="text-subtitle whitespace-nowrap">{{ $t('trade') }}</span>
        <span
          class="bg-green-200 text-success text-xs ml-2 rounded inline-block fee-tag"
        >
          0 Fee
        </span>
      </div>
    </div>
    <div class="orders rounded-lg">
      <div v-if="items && items.length > 0">
        <order-table-item
          v-for="(item, index) in items"
          :key="index + '_ordertableitem'"
          :item="item"
        ></order-table-item>
      </div>
      <div
        v-else
        class="flex flex-col justify-center items-center p-8 text-gray-300 bg-white rounded-lg"
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
import OrderTableItem from '@/components/pages/binance/home/order-table-item'
import IconEmpty from '@/components/ui/icon/icon-empty'

export default {
  components: {
    IconEmpty,
    OrderTableItem,
  },
  props: {
    items: {
      type: [Array, Object],
      required: true,
    },
  },
}
</script>

<style>
.fee-tag {
  padding: 1px 4px;
}
</style>
