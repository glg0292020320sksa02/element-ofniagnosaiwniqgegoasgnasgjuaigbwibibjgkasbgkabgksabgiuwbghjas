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
      <div class="w-64 m-1 flex-grow">
        <market-trending-item :item="vnds"></market-trending-item>
      </div>
      <div class="w-64 m-1 flex-grow"></div>
      <div class="w-64 m-1 flex-grow"></div>
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
      const enableIds = [1, 1027, 1321, 52, 825, 3]

      return this.marketTrendingList.filter(item => enableIds.includes(item.id))
    },
    vnds() {
      return {
        id: 1321,
        name: 'VNDS',
        symbol: 'VNDS',
        slug: 'ethereum-classic',
        num_market_pairs: 284,
        date_added: '2016-07-24T00:00:00.000Z',
        tags: ['mineable', 'pow', 'ethash', 'platform', 'smart-contracts'],
        max_supply: 210700000,
        circulating_supply: 116313299,
        total_supply: 116313299,
        platform: null,
        cmc_rank: 40,
        last_updated: '2021-01-06T17:17:04.000Z',
        quote: {
          USD: {
            price: 23092.5,
            volume_24h: 250292,
            percent_change_1h: 0.0426065,
            percent_change_24h: 0.4446165,
            percent_change_7d: 0.30965054,
            market_cap: 198000000,
            last_updated: '2021-01-06T17:17:04.000Z',
          },
        },
      }
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
