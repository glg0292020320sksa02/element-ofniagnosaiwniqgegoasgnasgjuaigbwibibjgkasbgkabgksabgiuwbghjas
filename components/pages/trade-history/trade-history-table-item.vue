<template>
  <div
    class="order-item border-b bg-white border-b-gray-200 cursor-pointer"
    :class="{ 'my-4 shadow-xl overflow-hidden border': isExpand }"
  >
    <div
      class="flex flex-row justify-between items-stretch p-6"
      @click="selectTradeHistory(item)"
    >
      <div class="order-column w-1/12 flex items-center">
        <strong class="text-sm">
          <nuxt-link
            class="text-primary underline cursor-pointer font-bold"
            :to="`trade-history/${item.id}`"
          >
            #{{ item.id }}
          </nuxt-link>
        </strong>
      </div>
      <div class="order-column w-2/12 flex items-center">
        {{ item.created_at }}
      </div>
      <div class="order-column w-1/12 flex items-center">
        <strong class="text-sm">
          <span
            class="text-primary underline cursor-pointer font-bold"
            @click="redirectToHomePage(item.source_symbol, item.side)"
          >
            {{
              `${targetSymbol(item.target_symbol)}/${sourceSymbol(
                item.source_symbol
              )}`
            }}
          </span>
        </strong>
      </div>
      <div class="order-column w-1/12 flex items-center">
        <a
          class="text-primary underline cursor-pointer font-bold"
          @click="viewDetailUser(item)"
        >
          {{ partnerName(item) }}
        </a>
      </div>
      <div class="order-column w-2/12 flex items-center justify-center">
        <span
          class="px-4 rounded-full font-bold"
          :class="getColorSide(item.side)"
        >
          {{ item.side }}
        </span>
      </div>
      <div class="order-column w-2/12 flex items-end flex-col justify-center">
        <div class="flex justify-end items-center">
          <strong>{{ item.amount | filterPrice }}</strong>
          <span class="ml-1 text-xs text-subtitle">
            {{ sourceSymbol(item.source_symbol) }}
          </span>
        </div>
        <div class="flex justify-end items-center text-xs">
          <span>{{ item.price | filterPriceMoney }}</span>
          <span class="ml-1 text-xs text-subtitle">
            {{
              `${targetSymbol(item.target_symbol)}/${sourceSymbol(
                item.source_symbol
              )}`
            }}
          </span>
        </div>
      </div>
      <div class="order-column w-2/12 flex justify-end items-center">
        <div class="flex justify-end items-center">
          <strong :class="getColorTotal(item.side)">
            {{ item.total | filterPriceMoney }}
          </strong>
          <span class="ml-1 text-xs text-subtitle">
            {{ targetSymbol(item.target_symbol) }}
          </span>
        </div>
      </div>
    </div>
    <div
      v-if="isExpand"
      class="expand border-t bg-gray-100 p-6 flex justify-end"
    >
      <span class="px-4 rounded-full font-bold bg-primary-50 text-primary">
        {{ item.description }}
      </span>
    </div>
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
      loadTransaction: false,
      listTransactions: [],
      transTotal: 0,
    }
  },
  computed: {
    ...mapGetters({
      selectedTradeHistory: 'selectedTradeHistory',
    }),
    isExpand() {
      return this.selectedTradeHistory.id === this.item.id
    },
  },
  methods: {
    ...mapActions({
      setActiveTab: 'setActiveTab',
      setActiveSide: 'setActiveSide',
      setSelectedUserView: 'setSelectedUserView',
      setSelectedTradeHistory: 'setSelectedTradeHistory',
    }),
    selectTradeHistory(payload) {
      if (this.isExpand) {
        this.setSelectedTradeHistory(null)

        return
      }

      this.setSelectedTradeHistory(payload)
    },
    getColorSide(side) {
      return side.toLowerCase() === 'buy'
        ? 'text-success bg-success-100'
        : 'text-error bg-error-100'
    },
    sourceSymbol(source_symbol) {
      return source_symbol || ''
    },
    targetSymbol(target_symbol) {
      return target_symbol || ''
    },
    getColorTotal(side) {
      return side.toLowerCase() === 'buy' ? 'text-success' : 'text-error'
    },
    partner(transaction) {
      return transaction.side.toLowerCase() === 'buy'
        ? transaction?.seller
        : transaction?.buyer
    },
    partnerName(transaction) {
      return transaction.side.toLowerCase() === 'buy'
        ? transaction?.seller?.name
        : transaction?.buyer?.name
    },
    viewDetailUser(transaction) {
      const partner = this.partner(transaction)

      this.setSelectedUserView(partner)
      this.$router.push(`/user-detail/${partner.id}`)
    },
    redirectToHomePage(target, side) {
      this.setActiveTab(target)
      this.setActiveSide(side.toUpperCase())
      this.$router.push('/')
    },
  },
}
</script>

<style></style>
