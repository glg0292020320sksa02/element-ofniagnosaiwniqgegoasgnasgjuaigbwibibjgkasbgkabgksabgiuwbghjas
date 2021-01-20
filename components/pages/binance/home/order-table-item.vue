<template>
  <div
    class="order-table-item bg-white p-6 border-b border-gray-200 text-xs"
    :class="{ 'shadow-lg rounded-xl border border-gray-400 dialogxx': expand }"
  >
    <div v-if="expand" :class="{ dialogbg: expand }" @click="selectItem"></div>
    <div v-if="!expand" class="flex justify-between items-start">
      <div class="order-column w-3/12 flex flex-col justify-start">
        <div class="flex flex-row justify-start items-center">
          <span
            class="p-1 mr-2 w-4 h-4 rounded-full bg-primary text-white flex justify-center items-center text-xxs"
          >
            {{ firstName }}
          </span>
          <span class="text-primary text-sm">{{ item.user.name }}</span>
        </div>
        <div class="pl-5">
          <span class="text-subtitle">
            {{ $t('partnerRate', { order: 62, rate: 96.85 }) }}
          </span>
        </div>
      </div>
      <div class="order-column w-3/12">
        <div class="flex flex-row justify-start items-baseline">
          <strong class="text-lg font-bold">
            {{ item.price | filterPriceMoney }}
          </strong>
          <span class="text-xs ml-1">VND / 1 {{ item.source_symbol }}</span>
        </div>
      </div>
      <div class="order-column w-3/12">
        <div
          class="flex flex-col justify-start items-stretch whitespace-nowrap"
        >
          <span class="text-xs">
            <span class="text-subtitle w-16 inline-block">
              {{ $t('available') }}
            </span>
            {{ item.remaining_amount | filterPrice }} {{ item.source_symbol }}
          </span>
          <span class="text-xs">
            <span class="text-subtitle w-16 inline-block">
              {{ $t('limit') }}
            </span>
            {{ 50000 | filterPriceMoney }} {{ item.target_symbol }} -
            {{ item.remaining_total | filterPriceMoney }}
            {{ item.target_symbol }}
          </span>
        </div>
      </div>
      <div class="order-column w-1/12">
        <div class="flex flex-col justify-center items-stretch">
          <div
            v-for="(pay, j) in acceptPayment"
            :key="j + '_pay'"
            class="text-xs flex flex-row justify-start items-center mb-2"
          >
            <components :is="pay.component" class="mr-1"></components>
            <p class="whitespace-normal">{{ pay.name }}</p>
          </div>
        </div>
      </div>
      <div class="order-column w-2/12 flex justify-end">
        <button
          v-if="isBuy"
          class="w-3/5 py-1 rounded font-medium text-sm"
          :class="
            isMyOrder
              ? 'bg-white text-subtitle cursor-not-allowed border'
              : 'bg-success text-white'
          "
          @click="selectItem"
        >
          {{
            $t(`buyCoin`, {
              symbol: item.source_symbol,
            })
          }}
        </button>
        <button
          v-else
          class="w-3/5 py-1 rounded font-medium text-sm"
          :class="
            isMyOrder
              ? 'bg-white text-subtitle cursor-not-allowed border'
              : 'bg-error text-white'
          "
          @click="selectItem"
        >
          {{
            $t(`sellCoin`, {
              symbol: item.source_symbol,
            })
          }}
        </button>
      </div>
    </div>
    <div v-else class="flex flex-row justify-between items-stretch expandxx">
      <div class="flex flex-col justify-start items-stretch w-3/5 border-r">
        <div class="flex flex-row justify-start items-center">
          <div class="flex flex-row justify-start items-center">
            <span
              class="p-1 mr-2 w-4 h-4 rounded-full bg-primary text-white flex justify-center items-center text-xxs"
            >
              {{ firstName }}
            </span>
            <span class="text-primary text-sm">{{ item.user.name }}</span>
          </div>
          <div class="pl-2">
            <span class="text-subtitle">
              {{ $t('partnerRate', { order: 62, rate: 96.85 }) }}
            </span>
          </div>
        </div>
        <div class="flex flex-row justify-start items-center px-6 py-2">
          <div class="w-1/2 flex flex-col justify-start items-start">
            <span class="text-xs text-subtitle whitespace-nowrap mb-2">
              {{ $t('price') }}
              <span class="text-success text-sm">
                {{ item.price | filterPriceMoney }}VND
              </span>
            </span>
            <span class="text-xs text-subtitle whitespace-nowrap">
              {{ $t('limitPayment') }}
              <span class="text-body text-sm">15 {{ $t('minute') }}</span>
            </span>
          </div>
          <div class="w-1/2 flex flex-col justify-start items-start">
            <span class="text-xs text-subtitle whitespace-nowrap mb-2">
              {{ $t('available') }}
              <span class="text-body text-sm">
                {{ item.remaining_amount | filterPrice }}
                {{ item.source_symbol }}
              </span>
            </span>
            <span
              class="text-xs text-subtitle whitespace-nowrap flex flex-row justify-start"
            >
              {{ $t('paymentMethod') }}
              <div
                class="text-xs flex flex-row justify-start items-center mb-2"
              >
                <components
                  :is="pay.component"
                  v-for="(pay, j) in acceptPayment"
                  :key="j + '_pay'"
                  class="mr-1"
                ></components>
              </div>
            </span>
          </div>
        </div>
      </div>
      <div class="w-2/5 pl-6">
        <exchange-buy
          v-if="isBuy"
          :payment-methods="acceptPayment"
          @cancel="selectItem"
        ></exchange-buy>
        <exchange-sell
          v-else
          :payment-methods="acceptPayment"
          @cancel="selectItem"
        ></exchange-sell>
      </div>
    </div>
  </div>
</template>

<script>
import { payments } from '@/utils/binance'
import { filterPrice, filterPriceMoney } from '@/filters'

import { mapGetters, mapActions } from 'vuex'
import IconVnds from '@/components/ui/icon/icon-vnds'
import IconVcb from '@/components/ui/icon/icon-vcb'
import IconTcb from '@/components/ui/icon/icon-tcb'
import IconPm from '@/components/ui/icon/icon-pm'
import ExchangeBuy from '@/components/pages/binance/home/exchange/exchange-buy'
import ExchangeSell from '@/components/pages/binance/home/exchange/exchange-sell'

import { sides } from '~/utils/binance'

export default {
  name: 'OrderTableItem',
  filters: { filterPrice, filterPriceMoney },
  components: {
    IconVnds,
    IconVcb,
    IconTcb,
    IconPm,
    ExchangeBuy,
    ExchangeSell,
  },
  props: {
    item: {
      type: [Array, Object],
      required: true,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      expand: false,
      payments: Object.values(payments),
    }
  },
  computed: {
    ...mapGetters({
      activeSide: 'binance/activeSide',
    }),
    acceptPayment() {
      return this.payments.filter(item => {
        if (this.item.source_symbol === 'VNDS') {
          return item.value !== 'VNDS' && item.accept.includes(this.item.side)
        }

        return item.accept.includes(this.item.side)
      })
    },
    currentUser() {
      return this.$auth.user
    },
    isMyOrder() {
      return this.currentUser?.id === this.item?.user_id
    },
    isBuy() {
      return this.activeSide.value === sides.BUY.value
    },
    firstName() {
      return this.item?.user?.name.charAt(0) || 'M'
    },
  },
  methods: {
    ...mapActions({ setSelectedOrder: 'binance/setSelectedOrder' }),
    selectItem() {
      if (this.isMyOrder) {
        return
      }

      this.setSelectedOrder(this.item)
      this.expand = !this.expand
    },
  },
}
</script>

<style>
.dialogxx {
  position: relative;
  z-index: 110;
}
.dialogbg {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  opacity: 0.6;
}
.expandxx {
  position: relative;
  z-index: 110;
}
</style>
