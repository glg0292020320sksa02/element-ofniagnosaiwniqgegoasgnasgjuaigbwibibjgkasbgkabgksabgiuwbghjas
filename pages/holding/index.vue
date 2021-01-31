<template>
  <div class="page-holding container py-8 space-y-8">
    <div class="bg-gray-100 rounded-lg shadow-lg">
      <div class="border-b p-8 pb-0 flex flex-col justify-start items-start">
        <div class="text-xl font-bold">{{ $t('yourWallet') }}</div>
        <div>
          <el-tabs
            v-model="activeTab"
            class="text-base"
            @tab-click="changeActiveTab"
          >
            <el-tab-pane :label="$t('balance')" name="balance"></el-tab-pane>
            <el-tab-pane
              :label="$t('depositHistory')"
              name="deposit"
            ></el-tab-pane>
            <el-tab-pane
              :label="$t('withdrawHistory')"
              name="withdraw"
            ></el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="px-8 pb-12">
        <div
          v-if="activeTab !== 'balance'"
          class="flex justify-between w-2/5 mt-4 ml-auto mr-0"
        >
          <filter-date
            :start-date.sync="options.from_date"
            :end-date.sync="options.to_date"
            class="mx-1"
          ></filter-date>
          <filter-status v-model="options.status" class="mx-1"></filter-status>
          <filter-currency
            v-model="options.currency"
            class="mx-1"
          ></filter-currency>
        </div>
        <div v-if="activeTab === 'balance'">
          <table-content-loader
            v-if="$fetchState.pending || loading"
          ></table-content-loader>

          <div v-else>
            <wallet-table></wallet-table>
          </div>
        </div>
        <div v-else-if="activeTab === 'deposit'">
          <table-content-loader
            v-if="$fetchState.pending || loading"
          ></table-content-loader>

          <div
            v-else
            v-infinite-scroll="loadMoreTransactions"
            :infinite-scroll-disabled="disabledInfinitiScroll"
            class="overflow-x-auto mt-6"
            style="height: 500px"
          >
            <history-table :items="listTransactions"></history-table>
          </div>
        </div>
        <div v-else>
          <table-content-loader
            v-if="$fetchState.pending || loading"
          ></table-content-loader>

          <div
            v-else
            v-infinite-scroll="loadMoreTransactions"
            :infinite-scroll-disabled="disabledInfinitiScroll"
            class="overflow-x-auto mt-6"
            style="height: 500px"
          >
            <history-table :items="listTransactions"></history-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import WalletTable from '@/components/pages/holding/wallet-table'
import FilterDate from '@/components/common/setting/filter-date'
import FilterStatus from '@/components/common/setting/filter-status'
import FilterCurrency from '@/components/common/setting/filter-currency'
import TableContentLoader from '@/components/common/table-content-loader'
import HistoryTable from '@/components/pages/holding/history-table'

export default {
  name: 'SettingHoldingPage',
  components: {
    WalletTable,
    TableContentLoader,
    FilterDate,
    FilterStatus,
    FilterCurrency,
    HistoryTable,
  },
  fetch() {
    this.loadTransactions()
  },
  data() {
    return {
      listTransactions: [],
      activeTab: 'balance',
      total: 0,
      options: {
        from_date: '',
        to_date: '',
        page: 1,
        type: 'DEPOSIT',
        status: '',
        currency: '',
      },
      loading: false,
    }
  },
  computed: {
    optionsToString() {
      return (
        this.options.from_date +
        this.options.to_date +
        this.options.status +
        this.options.currency +
        this.options.type +
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
    currentQuery() {
      return this.$route.query.tab
    },
  },
  watch: {
    optionsToString() {
      this.options.page = 1
      this.loadTransactions()
    },
    currentQuery(val) {
      this.activeTab = this.$route.query.tab || 'balance'

      if (this.activeTab === 'deposit') {
        this.options.type = 'DEPOSIT'
      }

      if (this.activeTab === 'withdraw') {
        this.options.type = 'WITHDRAWAL'
      }
    },
  },
  mounted() {
    this.activeTab = this.$route.query.tab || 'balance'

    if (this.activeTab === 'deposit') {
      this.options.type = 'DEPOSIT'
    }

    if (this.activeTab === 'withdraw') {
      this.options.type = 'WITHDRAWAL'
    }
  },
  methods: {
    ...mapActions({
      getTransactions: 'setting/getTransactions',
      getAllTransactions: 'setting/getAllTransactions',
    }),

    async loadMoreTransactions() {
      if (this.loading) return

      try {
        this.loading = true
        this.options.page += 1
        const { data } = await this.methodGetTransition(this.options)

        this.listTransactions = [...this.listTransactions, ...data]
      } catch (e) {
      } finally {
        this.loading = false
      }
    },

    async loadTransactions() {
      this.loading = true
      const { data, total } = await this.methodGetTransition(this.options)

      this.listTransactions = data
      this.total = total
      this.loading = false
    },
    changeActiveTab() {
      if (this.activeTab === 'deposit') {
        this.options.type = 'DEPOSIT'
      }

      if (this.activeTab === 'withdraw') {
        this.options.type = 'WITHDRAWAL'
      }
    },
  },
}
</script>

<style scope>
.trade-history .el-tabs .el-tabs__item {
  @apply text-base;
}
</style>
