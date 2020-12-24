<template>
  <div class="page-holding container py-8 space-y-8">
    <div class="bg-white rounded">
      <div class="border-b p-5 flex justify-between items-center">
        <div class="text-xl font-bold">{{ $t('navHolding') }}</div>
      </div>
      <div class="p-5">
        <div class="flex justify-between mt-4">
          <div>
            <el-tabs
              v-model="activeTab"
              class="text-base"
              @tab-click="changeActiveTab"
            >
              <el-tab-pane :label="$t('balance')" name="holding"></el-tab-pane>
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

          <div>
            <filter-date
              :start-date.sync="options.from_date"
              :end-date.sync="options.to_date"
            ></filter-date>
            <filter-status v-model="options.status"></filter-status>
            <filter-currency v-model="options.currency"></filter-currency>
          </div>
        </div>
        <div v-if="activeTab === 'holding'">
          <div class="mt-10">
            <div class="font-bold text-primary">{{ $t('yourWallet') }}</div>
            <div class="text-subtitle text-sm">
              <div>
                {{ $t('these-wallets-created-c2a') }}
              </div>
              <div class="mt-2">
                {{ $t('note-only-send-and-receive-cryptocurrencies') }}
              </div>
            </div>
          </div>
          <table-content-loader
            v-if="$fetchState.pending"
          ></table-content-loader>

          <div
            v-else
            v-infinite-scroll="loadMoreTransactions"
            :infinite-scroll-disabled="disabledInfinitiScroll"
            class="overflow-x-auto mt-6"
            style="height: 500px"
          >
            <my-wallet></my-wallet>
          </div>
        </div>
        <div v-else-if="activeTab === 'deposit'">
          <table-content-loader
            v-if="$fetchState.pending"
          ></table-content-loader>

          <div
            v-else
            v-infinite-scroll="loadMoreTransactions"
            :infinite-scroll-disabled="disabledInfinitiScroll"
            class="overflow-x-auto mt-6"
            style="height: 500px"
          >
            <deposit-history :data="listTransactions"></deposit-history>
          </div>
        </div>
        <div v-else>
          <table-content-loader
            v-if="$fetchState.pending"
          ></table-content-loader>

          <div
            v-else
            v-infinite-scroll="loadMoreTransactions"
            :infinite-scroll-disabled="disabledInfinitiScroll"
            class="overflow-x-auto mt-6"
            style="height: 500px"
          >
            <withdraw-history :data="listTransactions"></withdraw-history>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import MyWallet from '@/components/pages/holding/my-wallet'
import FilterDate from '@/components/common/setting/filter-date'
import FilterStatus from '@/components/common/setting/filter-status'
import FilterCurrency from '@/components/common/setting/filter-currency'
import TableContentLoader from '@/components/common/table-content-loader'
import DepositHistory from '@/components/pages/holding/deposit-history'
import WithdrawHistory from '@/components/pages/holding/withdraw-history'

export default {
  name: 'SettingHoldingPage',
  components: {
    MyWallet,
    TableContentLoader,
    FilterDate,
    FilterStatus,
    FilterCurrency,
    WithdrawHistory,
    DepositHistory,
  },
  fetch() {
    this.loadTransactions()
  },
  data() {
    return {
      listTransactions: [],
      activeTab: 'holding',
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
