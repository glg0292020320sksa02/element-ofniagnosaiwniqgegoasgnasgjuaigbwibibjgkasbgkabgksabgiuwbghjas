<template>
  <div
    class="order-item border-b bg-white border-b-gray-200 transform transition-all duration-75 ease-in-out"
    :class="{ 'my-4 shadow-xl rounded-lg overflow-hidden border': isExpand }"
  >
    <div
      class="flex flex-row justify-between items-stretch p-6 cursor-pointer"
      @click="selectOrder(item)"
    >
      <div class="order-column w-2/12">
        <div class="flex flex-row justify-start items-center">
          <span
            class="text-xs w-4 h-4 mr-1 text-white rounded-full bg-primary text-center flex justify-center items-center"
          >
            B
          </span>
          <span class="text-sm text-primary">{{ item.user.name }}</span>
        </div>
        <div class="text-subtitle text-xs pl-5 mt-2">
          <span>62 lệnh 96.88% hoàn tất</span>
        </div>
      </div>
      <div class="order-column w-3/12">
        <div class="flex flex-row justify-start items-baseline">
          <strong class="text-lg text-bold mr-1">
            {{ item.price | filterPriceMoney }}
          </strong>
          <span class="text-subtitle text-xs">
            VND / 1 {{ item.source_symbol }}
          </span>
        </div>
      </div>
      <div class="order-column w-4/12">
        <div class="flex flex-col justify-center items-start">
          <div class="flex flex-row justify-start items-baseline text-xs">
            <span class="text-subtitle mr-1">Số lượng:</span>
            <span>
              {{ item.remaining_amount | filterPrice }}
              <span class="text-subtitle">{{ item.source_symbol }}</span>
            </span>
          </div>
          <div class="flex flex-row justify-start items-baseline text-xs mt-2">
            <span class="text-subtitle mr-1">Hạn mức:</span>
            <span>
              {{ 0 | filterPriceMoney }}
              <span class="text-subtitle">{{ item.target_symbol }}</span>
              -
              {{ item.remaining_total | filterPriceMoney }}
              <span class="text-subtitle">{{ item.target_symbol }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="order-column w-1/12 flex items-center">
        <div class="flex flex-col justify-center items-start">
          <div
            v-for="(pay, j) in acceptPayment"
            :key="j + '_pay'"
            class="text-xs flex flex-row justify-start items-center mb-2"
          >
            <span class="bg-warning text-xs rounded-sm p-1 mr-1">
              <icon-buy class="w-2 h-2 text-white"></icon-buy>
            </span>
            <p class="w-2/3 truncate whitespace-normal">{{ pay.name }}</p>
          </div>
        </div>
      </div>
      <div class="order-column w-2/12 flex flex-row justify-end items-center">
        <div class="flex flex-row justify-end items-center">
          <button
            v-if="!isExpand"
            class="rounded px-4 py-2 text-white font-bold text-xs"
            :class="{
              'error-btn': isBuy && !isMyOrder,
              'success-btn': !isBuy && !isMyOrder,
              'bg-gray-100 text-subtitle cursor-not-allowed': isMyOrder,
            }"
            :disabled="isMyOrder"
          >
            {{
              isBuy ? `Bán ${item.source_symbol}` : `Mua ${item.source_symbol}`
            }}
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="isExpand"
      class="expand border-t bg-gray-100 p-6 flex justify-end"
    >
      <exchange-sell v-if="isBuy"></exchange-sell>
      <exchange-buy v-else></exchange-buy>
    </div>
  </div>
</template>

<script>
import { paymentMethods } from '@/utils/constant'
import { mapActions, mapGetters } from 'vuex'
import { filterPrice, filterPriceMoney } from '@/filters'

import ExchangeSell from '@/components/pages/home/exchange-sell'
import ExchangeBuy from '@/components/pages/home/exchange-buy'

import IconBuy from '@/components/ui/icon/icon-buy'

export default {
  name: 'OrderTableItem',
  filters: { filterPrice, filterPriceMoney },
  components: {
    IconBuy,
    ExchangeSell,
    ExchangeBuy,
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
    isBuy: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      selectedOrder: 'market/selectedOrder',
    }),
    acceptPayment() {
      return paymentMethods.filter(
        item => item.accept === 'ALL' || item.accept === this.item.side
      )
    },
    isExpand() {
      return this.selectedOrder.id === this.item.id
    },
    currentUser() {
      return this.$auth.user
    },
    isMyOrder() {
      return this.currentUser.id === this.item.user_id
    },
  },
  methods: {
    ...mapActions({
      setSelectedOrder: 'market/setSelectedOrder',
    }),
    selectOrder(payload) {
      if (this.isExpand || this.isMyOrder) {
        this.setSelectedOrder(null)

        return
      }

      this.setSelectedOrder(payload)
    },
  },
}
</script>

<style></style>
