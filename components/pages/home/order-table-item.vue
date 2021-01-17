<template>
  <div
    class="order-item border-b bg-white border-b-gray-200 transform transition-all duration-75 ease-in-out"
  >
    <div
      class="flex flex-row justify-between items-stretch p-6"
      :class="{ 'cursor-not-allowed': isMyOrder, 'cursor-pointer': !isMyOrder }"
    >
      <div class="order-column w-2/12">
        <div class="flex flex-row justify-start items-center">
          <span
            class="text-xs w-4 h-4 mr-1 text-white rounded-full bg-primary text-center flex justify-center items-center"
          >
            {{ index > 9 ? 'M' : index }}
          </span>
          <span class="text-sm text-primary">{{ item.user.name }}</span>
        </div>
        <div class="text-subtitle text-xs pl-5 mt-2">
          <span>{{ $t('partnerRate', { order: 62, rate: 96.85 }) }}</span>
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
            <span class="text-subtitle mr-1">{{ $t('available') }}:</span>
            <span>
              {{ item.remaining_amount | filterPrice }}
              <span class="text-subtitle">{{ item.source_symbol }}</span>
            </span>
          </div>
          <div class="flex flex-row justify-start items-baseline text-xs mt-2">
            <span class="text-subtitle mr-1">{{ $t('limit') }}:</span>
            <span>
              {{ 50000 | filterPriceMoney }}
              <span class="text-subtitle">{{ item.target_symbol }}</span>
              -
              {{ item.remaining_total | filterPriceMoney }}
              <span class="text-subtitle">{{ item.target_symbol }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="order-column w-1/12 flex items-center">
        <div class="flex flex-col justify-center items-stretch">
          <div
            v-for="(pay, j) in acceptPayment"
            :key="j + '_pay'"
            class="text-xs flex flex-row justify-start items-center mb-2"
          >
            <components :is="pay.component" class="mr-1"></components>
            <p class="w-full truncate whitespace-normal">{{ pay.name }}</p>
          </div>
        </div>
      </div>
      <div class="order-column w-2/12 flex flex-row justify-end items-center">
        <div class="flex flex-row justify-end items-center">
          <el-button
            :type="!isBuy ? 'success' : 'danger'"
            :disabled="isMyOrder"
            class="font-bold uppercase"
            size="small"
            @click="selectOrder(item)"
          >
            {{
              isBuy
                ? $t(`sellCoin`, {
                    symbol: item.source_symbol,
                  })
                : $t(`buyCoin`, {
                    symbol: item.source_symbol,
                  })
            }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { paymentMethods } from '@/utils/constant'
import { mapActions, mapGetters } from 'vuex'
import { filterPrice, filterPriceMoney } from '@/filters'

import ExchangeSell from '@/components/pages/home/exchange-sell'
import ExchangeBuy from '@/components/pages/home/exchange-buy'

import IconVnds from '@/components/ui/icon/icon-vnds'
import IconVcb from '@/components/ui/icon/icon-vcb'
import IconTcb from '@/components/ui/icon/icon-tcb'
import IconPm from '@/components/ui/icon/icon-pm'
export default {
  name: 'OrderTableItem',
  filters: { filterPrice, filterPriceMoney },
  components: {
    IconVnds,
    IconVcb,
    IconTcb,
    IconPm,
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
    index: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    acceptPayment() {
      return paymentMethods.filter(item => {
        if (this.item.source_symbol === 'VNDS') {
          return (
            item.value !== 'VNDS' &&
            (item.accept === 'ALL' || item.accept === this.item.side)
          )
        }

        return item.accept === 'ALL' || item.accept === this.item.side
      })
    },
    currentUser() {
      return this.$auth.user
    },
    isMyOrder() {
      return this.currentUser?.id === this.item?.user_id
    },
  },
  methods: {
    ...mapActions({
      setSelectedOrder: 'market/setSelectedOrder',
    }),
    selectOrder(payload) {
      if (this.isMyOrder) {
        this.setSelectedOrder(null)

        return
      }

      this.setSelectedOrder(payload)
      this.$emit('click')
    },
  },
}
</script>

<style></style>
