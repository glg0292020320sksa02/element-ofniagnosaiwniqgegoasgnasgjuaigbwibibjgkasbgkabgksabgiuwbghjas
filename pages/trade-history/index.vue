<template>
  <div class="page-trade-history container py-8 space-y-8">
    <div class="bg-white rounded">
      <div class="border-b p-5 flex justify-between items-center">
        <div class="text-xl font-bold">{{ $t('tradeHistory') }}</div>
      </div>
      <div class="p-5">
        <div>
          <div class="font-bold text-primary">
            {{ $t('tradeHistoryTitle') }}
          </div>
          <div class="text-subtitle text-sm">
            {{ $t('tradeHistorySubTitle') }}
          </div>
        </div>

        <div class="flex justify-between mt-4">
          <div>
            <el-tabs v-model="activeTab" class="text-base">
              <el-tab-pane
                label="My transaction"
                name="myTransaction"
              ></el-tab-pane>
              <el-tab-pane label="Market" name="allTransaction"></el-tab-pane>
            </el-tabs>
          </div>

          <div>
            <filter-date
              :start-date.sync="options.from_date"
              :end-date.sync="options.to_date"
            ></filter-date>
            <filter-pair v-model="options.pair"></filter-pair>
            <filter-side v-model="options.side"></filter-side>
          </div>
        </div>

        <div
          v-if="activeTab === 'allTransaction'"
          class="market-cap flex justify-end items-center"
        >
          <el-tag size="medium" type="info" class="bg-gray-200 border-0">
            <span class="mr-4">
              Market Cap:
              <strong>{{ marketCap.market_cap | filterPrice }} BTC</strong>
            </span>
            <span>
              Volume:
              <strong>{{ marketCap.volume | filterPrice }} VNDS</strong>
            </span>
          </el-tag>
        </div>
        <table-content-loader v-if="$fetchState.pending"></table-content-loader>

        <div
          v-else
          v-infinite-scroll="loadMoreTransactions"
          :infinite-scroll-disabled="disabledInfinitiScroll"
          class="overflow-x-auto mt-6"
          style="height: 500px"
        >
          <div class="table table-hover text-sm relative">
            <trade-history :data="listTransactions"></trade-history>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { filterPrice } from '@/filters'

import TableContentLoader from '@/components/common/table-content-loader'
import FilterDate from '@/components/common/setting/filter-date'
import FilterPair from '@/components/common/setting/filter-pair'
import FilterSide from '@/components/common/setting/filter-side'
import TradeHistory from '@/components/pages/trade-history/'

export default {
  name: 'SettingTradeHistory',
  filters: { filterPrice },
  components: {
    TableContentLoader,
    FilterDate,
    FilterSide,
    FilterPair,
    TradeHistory,
  },
  fetch() {
    this.loadTransactions()
    this.loadMarketCap()
  },
  data() {
    return {
      listTransactions: [],
      activeTab: 'myTransaction',
      total: 0,
      options: {
        from_date: '',
        to_date: '',
        side: '',
        pair: '',
        page: 1,
      },
      loading: false,
      marketCap: {},
    }
  },
  computed: {
    optionsToString() {
      return (
        this.options.from_date +
        this.options.to_date +
        this.options.side +
        this.options.pair +
        this.activeTab
      )
    },
    disabledInfinitiScroll() {
      return this.listTransactions.length === this.total
    },
    methodGetTransition() {
      return this.activeTab === 'myTransaction'
        ? this.getTransactions
        : this.getAllTransactions
    },
  },
  watch: {
    optionsToString() {
      this.options.page = 1
      this.loadTransactions()
    },
  },
  methods: {
    ...mapActions({
      getTransactions: 'setting/getTransactions',
      getAllTransactions: 'setting/getAllTransactions',
      getMarketCap: 'market/getMarketCap',
    }),

    async loadMoreTransactions() {
      if (this.loading) return

      try {
        this.loading = true
        this.options.page += 1
        const { data } = await this.methodGetTransition(this.options)

        this.listTransactions = [...this.listTransactions, ...data]
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    async loadTransactions() {
      const { data, total } = await this.methodGetTransition(this.options)

      this.listTransactions = data
      this.total = total
    },
    async loadMarketCap() {
      const data = await this.getMarketCap()

      this.marketCap = data || {}
    },
  },
}
</script>

<style scope>
.trade-history .el-tabs .el-tabs__item {
  @apply text-base;
}
</style>
