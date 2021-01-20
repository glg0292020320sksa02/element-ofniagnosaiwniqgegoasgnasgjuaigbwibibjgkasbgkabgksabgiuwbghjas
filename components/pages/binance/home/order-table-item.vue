<template>
  <div
    class="order-table-item bg-white p-6 border-b border-gray-200 text-xs"
    :class="{ 'shadow-lg border dialogxx': expand }"
  >
    <div v-if="expand" :class="{ dialogbg: expand }" @click="selectItem"></div>
    <div v-if="!expand" class="flex justify-between items-start">
      <div class="order-column w-3/12 flex flex-col justify-start">
        <div class="flex flex-row justify-start items-center">
          <span
            class="p-1 mr-2 w-4 h-4 rounded-full bg-primary text-white flex justify-center items-center text-xxs"
          >
            M
          </span>
          <span class="text-primary text-sm">Mua ban uy tin</span>
        </div>
        <div class="pl-5">
          <span class="text-subtitle">173 lệnh | 90% hoàn tất</span>
        </div>
      </div>
      <div class="order-column w-3/12">
        <div class="flex flex-row justify-start items-baseline">
          <strong class="text-lg font-bold">23,553.89</strong>
          <span class="text-xs ml-1">VND</span>
        </div>
      </div>
      <div class="order-column w-3/12">
        <div
          class="flex flex-col justify-start items-stretch whitespace-nowrap"
        >
          <span class="text-xs">
            <span class="text-subtitle w-16 inline-block">Kha dung</span>
            2,235.86 USDT
          </span>
          <span class="text-xs">
            <span class="text-subtitle w-16 inline-block">Gioi han</span>
            d 10,000,000.00 - d 52,658,029.02
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
            <p class="w-full whitespace-normal">{{ pay.name }}</p>
          </div>
        </div>
      </div>
      <div class="order-column w-2/12 flex justify-end">
        <button
          v-if="isBuy"
          class="w-3/5 py-1 rounded bg-success text-white font-medium text-sm"
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
          class="w-3/5 py-1 rounded bg-error text-white font-medium text-sm"
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
              M
            </span>
            <span class="text-primary text-sm">Mua ban uy tin</span>
          </div>
          <div class="pl-2">
            <span class="text-subtitle">173 lệnh | 90% hoàn tất</span>
          </div>
        </div>
        <div class="flex flex-row justify-start items-center px-6 py-2">
          <div class="w-1/2 flex flex-col justify-start items-start">
            <span class="text-xs text-subtitle whitespace-nowrap mb-2">
              {{ $t('price') }}
              <span class="text-success text-sm">23,0100 VND</span>
            </span>
            <span class="text-xs text-subtitle whitespace-nowrap">
              {{ $t('limitPayment') }}
              <span class="text-body text-sm">15 phut</span>
            </span>
          </div>
          <div class="w-1/2 flex flex-col justify-start items-start">
            <span class="text-xs text-subtitle whitespace-nowrap mb-2">
              {{ $t('available') }}
              <span class="text-body text-sm">1,920 BTC</span>
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
        <exchange-buy @cancel="selectItem"></exchange-buy>
      </div>
    </div>
  </div>
</template>

<script>
import { paymentMethods } from '@/utils/constant'
import { mapGetters } from 'vuex'
import IconVnds from '@/components/ui/icon/icon-vnds'
import IconVcb from '@/components/ui/icon/icon-vcb'
import IconTcb from '@/components/ui/icon/icon-tcb'
import IconPm from '@/components/ui/icon/icon-pm'
import ExchangeBuy from '@/components/pages/binance/home/exchange/exchange-buy'
import ExchangeSell from '@/components/pages/binance/home/exchange/exchange-sell'

import { sides } from '~/utils/binance'

export default {
  name: 'OrderTableItem',
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
  },
  data() {
    return {
      expand: false,
    }
  },
  computed: {
    ...mapGetters({
      activeSide: 'binance/activeSide',
    }),
    acceptPayment() {
      return paymentMethods
    },

    isBuy() {
      return this.activeSide.value === sides.BUY.value
    },
  },
  methods: {
    selectItem() {
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
