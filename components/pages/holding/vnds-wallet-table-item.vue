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
          <icon-vnds class="mr-1"></icon-vnds>
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
            {{ item.real_balance | filterPriceMoney }}
          </strong>
        </div>
      </div>
      <div class="order-column w-2/12 flex justify-end items-center">
        <div class="flex flex-row justify-end items-baseline">
          <strong class="text-sm text-bold mr-1" @click.stop="showOrder(item)">
            {{ item.in_order_balance | filterPriceMoney }}
          </strong>
        </div>
      </div>
      <div class="order-column w-3/12 flex flex-row justify-end items-center">
        <div class="flex flex-row justify-end items-center">
          <button
            class="rounded px-4 py-2 text-primary font-bold text-xs bg-primary-50 hover:bg-primary-100 uppercase mr-1"
            @click.self.stop="buyCoin(item)"
          >
            {{ $t('buy') }}
          </button>
          <button
            class="rounded px-4 py-2 text-primary font-bold text-xs bg-primary-50 hover:bg-primary-100 uppercase"
            @click.self.stop="sellCoin(item)"
          >
            {{ $t('sell') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { filterPrice, filterPriceMoney } from '@/filters'
import IconVnds from '@/components/ui/icon/icon-vnds'
import { sides, coins } from '@/utils/binance'

export default {
  name: 'WalletsTableItem',
  filters: { filterPrice, filterPriceMoney },
  components: {
    IconVnds,
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
      setActiveCoin: 'binance/setActiveCoin',
      setActiveSide: 'binance/setActiveSide',
    }),
    selectWallets(payload) {
      if (this.isExpand) {
        this.setSelectedWallets(null)

        return
      }

      this.setSelectedWallets(payload)
    },
    buyCoin() {
      // this.actionType = 'DEPOSIT'
      // this.$router.push('/wallet/buy?coin=VNDS')
      const side = sides.BUY
      const coin = coins.VNDS

      this.setActiveCoin(coin)
      this.setActiveSide(side)
      this.$router.push('/')
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
