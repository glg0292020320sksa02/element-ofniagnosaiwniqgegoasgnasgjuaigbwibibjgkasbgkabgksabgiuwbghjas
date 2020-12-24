<template>
  <div class="market-trending bg-gray-100 rounded-lg p-6 py-8">
    <table-content-loader
      v-if="$fetchState.pending || loading"
    ></table-content-loader>
    <div v-else class="flex flex-row justify-start items-stretch flex-wrap">
      <div
        v-for="market in marketTrendingSelected"
        :key="market.id"
        class="w-64 m-1 flex-grow"
      >
        <market-trending-item :item="market"></market-trending-item>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

import MarketTrendingItem from '@/components/pages/home/market-trending/market-trending-item'
import TableContentLoader from '@/components/common/table-content-loader'

const START_MARKET_SELECTED = 0
const MAX_LENGTH_MARKET_SELECTED = 8

export default {
  name: 'MarketTrending',
  components: {
    MarketTrendingItem,
    TableContentLoader,
  },
  async fetch() {
    this.loading = true
    this.marketTrendingList = await this.getListingLatest()
    this.loading = false
  },
  data() {
    return {
      type: 'grid',
      marketTrendingList: [],
      loading: false,
    }
  },
  computed: {
    marketTrendingSelected() {
      return this.marketTrendingList.slice(
        START_MARKET_SELECTED,
        MAX_LENGTH_MARKET_SELECTED
      )
    },
    isPending() {
      return this.$fetchState.pending
    },
  },
  methods: {
    ...mapActions({
      getListingLatest: 'market/getListingLatest',
    }),
  },
}
</script>
