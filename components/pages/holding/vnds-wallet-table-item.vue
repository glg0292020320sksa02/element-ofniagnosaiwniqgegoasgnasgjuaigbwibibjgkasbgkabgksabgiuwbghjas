<template>
  <div
    class="order-item border-b bg-white border-b-gray-200 transform transition-all duration-75 ease-in-out"
    :class="{ 'my-4 shadow-xl rounded-lg overflow-hidden border': isExpand }"
  >
    <div
      class="flex flex-row justify-between items-stretch p-6 cursor-pointer"
      @click.stop="selectWallets(item)"
    >
      <div class="order-column w-2/12 flex items-center">
        <div class="flex flex-row justify-start items-center">
          <span
            class="text-xs w-4 h-4 mr-1 text-white rounded-full bg-primary text-center flex justify-center items-center"
          >
            B
          </span>
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
      <div class="order-column w-3/12 flex items-center">
        <div class="flex flex-row justify-start items-baseline">
          <strong class="text-sm text-bold mr-1">
            {{ item.real_balance }}
          </strong>
          <span class="text-xs text-bold mr-1">
            {{ item.currency.symbol }}
          </span>
        </div>
      </div>
      <div class="order-column w-3/12 flex items-center">
        <div class="flex flex-row justify-start items-baseline">
          <strong class="text-sm text-bold mr-1" @click.stop="showOrder(item)">
            {{ item.in_order_balance }}
          </strong>
          <span class="text-xs text-bold mr-1">
            {{ item.currency.symbol }}
          </span>
        </div>
      </div>
      <div class="order-column w-2/12 flex flex-row justify-end items-center">
        <div class="flex flex-row justify-end items-center">
          <button
            class="rounded px-4 py-2 text-primary font-bold text-xs hover:bg-primary-100"
            @click.self.stop="buyCoin(item)"
          >
            MUA
          </button>
          <button
            class="rounded px-4 py-2 text-primary font-bold text-xs hover:bg-primary-100"
            @click.self.stop="sellCoin(item)"
          >
            BÁN
          </button>
        </div>
      </div>
    </div>
    <!-- <div
      v-if="isExpand"
      class="expand border-t bg-gray-100 p-6 flex justify-end"
    >
      <holding-deposit v-if="actionType === 'DEPOSIT'"></holding-deposit>
      <holding-withdraw v-if="actionType === 'WITHDRAW'"></holding-withdraw>
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { filterPrice, filterPriceMoney } from '@/filters'
export default {
  name: 'WalletsTableItem',
  filters: { filterPrice, filterPriceMoney },
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
      actionType: null,
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
    buyCoin(payload) {
      this.actionType = 'DEPOSIT'
      this.$router.push('/wallet/buy?coin=ETH')
    },
    sellCoin(payload) {
      this.actionType = 'WITHDRAW'
      this.$router.push('/wallet/sell?coin=VNDS')
    },
    showOrder(payload) {
      this.actionType = 'SHOWORDER'
      this.setSelectedWallets(payload)
    },
  },
}
</script>

<style></style>
