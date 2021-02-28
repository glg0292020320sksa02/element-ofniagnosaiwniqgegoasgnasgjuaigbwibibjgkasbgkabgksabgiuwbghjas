<template>
  <div
    class="order-item border-b bg-white border-b-gray-200 transform transition-all duration-75 ease-in-out"
    :class="{ 'my-4 shadow-xl overflow-hidden border': isExpand }"
  >
    <div
      class="flex flex-row justify-between items-stretch p-6 cursor-pointer"
      @click.stop="selectWallets(item)"
    >
      <div class="order-column w-2/12 flex items-center">
        <div class="flex flex-row justify-start items-center">
          <img
            :src="`https://s2.coinmarketcap.com/static/img/coins/32x32/${
              coinImages[item.currency.id]
            }.png`"
            alt=""
            class="text-xs w-4 h-4 rounded-full mr-1"
          />
          <span class="text-sm text-primary">{{ item.currency.name }}</span>
        </div>
      </div>
      <div class="order-column w-2/12 flex items-center">
        <div class="flex flex-row justify-start items-start">
          <span class="text-sm text-bold mr-1">
            {{ item.currency.created_at }}
          </span>
        </div>
      </div>
      <div class="order-column w-3/12 flex justify-end items-center">
        <div class="flex flex-row justify-end items-baseline">
          <strong class="text-sm text-bold">
            {{ item.real_balance | filterPriceFloatDecimal }}
          </strong>
        </div>
      </div>
      <div class="order-column w-2/12 flex justify-end items-center">
        <div class="flex flex-row justify-end items-baseline">
          <strong class="text-sm text-bold" @click.stop="showOrder(item)">
            {{ item.in_order_balance | filterPriceFloatDecimal }}
          </strong>
        </div>
      </div>
      <div class="order-column w-3/12 flex flex-row justify-end items-center">
        <div class="flex flex-row justify-end items-center">
          <button
            class="rounded px-4 py-2 text-primary font-bold text-xs bg-primary-50 hover:bg-primary-100 uppercase mr-1"
            @click.self.stop="depositCoin(item)"
          >
            {{ $t('deposit') }}
          </button>
          <button
            class="rounded px-4 py-2 text-primary font-bold text-xs bg-primary-50 hover:bg-primary-100 uppercase"
            @click.self.stop="withdrawCoin(item)"
          >
            {{ $t('withdraw') }}
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="isExpand"
      class="expand border-t bg-gray-100 p-6 flex justify-end"
    >
      <holding-deposit v-if="actionType === 'DEPOSIT'"></holding-deposit>
      <holding-withdraw v-if="actionType === 'WITHDRAW'"></holding-withdraw>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  filterPrice,
  filterPriceMoney,
  filterPriceFloat,
  filterPriceFloatDecimal,
} from '@/filters'

import HoldingDeposit from '@/components/pages/holding/holding-deposit'
import HoldingWithdraw from '@/components/pages/holding/holding-withdraw'

export default {
  name: 'WalletsTableItem',
  filters: {
    filterPrice,
    filterPriceMoney,
    filterPriceFloat,
    filterPriceFloatDecimal,
  },
  components: {
    HoldingDeposit,
    HoldingWithdraw,
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      actionType: 'DEPOSIT',
      coinImages: { 1: 1, 2: 1027, 3: 1321, 4: 52, 5: 825, 6: 3 },
    }
  },
  computed: {
    ...mapGetters({
      selectedWallets: 'wallet/selectedWallets',
    }),
    isExpand() {
      return this.selectedWallets?.id === this.item?.id
    },
  },
  methods: {
    ...mapActions({
      setSelectedWallets: 'wallet/setSelectedWallets',
    }),
    selectWallets(payload) {
      if (this.isExpand) {
        this.setSelectedWallets(null)

        return
      }

      this.setSelectedWallets(payload)
    },
    depositCoin(payload) {
      this.actionType = 'DEPOSIT'
      this.setSelectedWallets(payload)
    },
    withdrawCoin(payload) {
      this.actionType = 'WITHDRAW'
      this.setSelectedWallets(payload)
    },
    showOrder(payload) {
      this.actionType = 'SHOWORDER'
      this.setSelectedWallets(payload)
    },
  },
}
</script>

<style></style>
