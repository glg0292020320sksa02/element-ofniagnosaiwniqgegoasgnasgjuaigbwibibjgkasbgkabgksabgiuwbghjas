<template>
  <div class="order-table text-sm">
    <div class="order-header flex justify-between items-start text-xs p-6">
      <div class="header-column w-2/12">
        <span class="text-subtitle">Người quảng cáo</span>
      </div>
      <div class="header-column w-3/12">
        <span class="text-subtitle">Giá</span>
      </div>
      <div class="header-column w-4/12">
        <span class="text-subtitle">Giới hạn/ Khả dụng</span>
      </div>
      <div class="header-column w-1/12">
        <span class="text-subtitle">Thanh toán</span>
      </div>
      <div class="header-column w-2/12 flex justify-end">
        <span class="text-subtitle">Giao dịch</span>
      </div>
    </div>
    <div class="order-list rounded">
      <order-table-item
        v-for="(item, i) in orders"
        :key="i"
        :item="item"
        :is-buy="isBuySide"
      ></order-table-item>
    </div>
  </div>
</template>
<script>
import { side } from '@/utils/constant'
import OrderTableItem from '@/components/pages/home/order-table-item'
export default {
  name: 'OrderTable',
  components: {
    OrderTableItem,
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
