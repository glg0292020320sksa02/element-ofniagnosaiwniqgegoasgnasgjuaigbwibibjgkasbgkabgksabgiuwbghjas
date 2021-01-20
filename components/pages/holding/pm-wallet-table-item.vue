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
          <icon-pm class="mr-1"></icon-pm>
          <span class="text-sm text-primary">{{ item.currency.name }}</span>
        </div>
      </div>
      <div class="order-column w-2/12 flex items-center">
        <div class="flex flex-row justify-start items-start">
          <span class="text-sm text-bold">
            {{ item.currency.created_at }}
          </span>
        </div>
      </div>
      <div class="order-column w-3/12 flex justify-end items-center">
        <div class="flex flex-row justify-end items-baseline">
          <strong class="text-sm text-bold">
            {{ item.real_balance | filterPriceFloat }}
          </strong>
        </div>
      </div>
      <div class="order-column w-2/12 flex justify-end items-center">
        <div class="flex flex-row justify-end items-baseline">
          <strong class="text-sm text-bold mr-1" @click.stop="showOrder(item)">
            {{ item.in_order_balance | filterPriceFloat }}
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
      <holding-deposit-pm v-if="actionType === 'DEPOSIT'"></holding-deposit-pm>
      <holding-withdraw-pm
        v-if="actionType === 'WITHDRAW'"
      ></holding-withdraw-pm>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { filterPrice, filterPriceMoney, filterPriceFloat } from '@/filters'

import HoldingDepositPm from '@/components/pages/holding/holding-deposit-pm'
import HoldingWithdrawPm from '@/components/pages/holding/holding-withdraw-pm'
import IconPm from '@/components/ui/icon/icon-pm'
export default {
  name: 'WalletsTableItem',
  filters: { filterPrice, filterPriceMoney, filterPriceFloat },
  components: {
    HoldingDepositPm,
    HoldingWithdrawPm,
    IconPm,
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
