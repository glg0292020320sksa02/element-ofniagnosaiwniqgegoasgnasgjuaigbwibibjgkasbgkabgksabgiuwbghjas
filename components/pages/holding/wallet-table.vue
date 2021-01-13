<template>
  <div class="wallet-table text-sm">
    <div
      class="wallet-header flex justify-between items-start text-xs p-6 whitespace-nowrap"
    >
      <div class="header-column w-2/12">
        <span class="text-subtitle">{{ $t('coin') }}</span>
      </div>
      <div class="header-column w-2/12">
        <span class="text-subtitle">{{ $t('created-at') }}</span>
      </div>
      <div class="header-column w-3/12 text-right">
        <span class="text-subtitle">{{ $t('balance') }}</span>
      </div>
      <div class="header-column w-2/12 text-right">
        <span class="text-subtitle">{{ $t('reserved') }}</span>
      </div>
      <div class="header-column w-3/12 flex justify-end">
        <span class="text-subtitle">{{ $t('action') }}</span>
      </div>
    </div>
    <table-content-loader
      v-if="$fetchState.pending || loading"
    ></table-content-loader>
    <div v-else class="wallet-list rounded-lg">
      <vnds-wallet-table-item
        v-for="(item, i) in VNDSSWallet"
        :key="i + '_vnds'"
        :item="item"
      ></vnds-wallet-table-item>
      <pm-wallet-table-item
        v-for="(item, i) in PMWallet"
        :key="i + '_pm'"
        :item="item"
      ></pm-wallet-table-item>
      <wallet-table-item
        v-for="(item, i) in otherWallet"
        :key="i + '_vother'"
        :item="item"
      ></wallet-table-item>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { clipboard } from 'vue-clipboards'
import { format as formatTimeago } from 'timeago.js'

import WalletTableItem from '@/components/pages/holding/wallet-table-item'
import VndsWalletTableItem from '@/components/pages/holding/vnds-wallet-table-item'
import PmWalletTableItem from '@/components/pages/holding/pm-wallet-table-item'

import TableContentLoader from '@/components/common/table-content-loader'

import clipboardSelection from '@/mixins/clipboard-selection'
import { filterPrice } from '@/filters'

export default {
  name: 'WalletTable',
  filters: { filterPrice },
  components: {
    TableContentLoader,
    VndsWalletTableItem,
    WalletTableItem,
    PmWalletTableItem,
  },
  directives: { clipboard },
  mixins: [clipboardSelection],
  fetch() {
    this.loadWallets()
  },
  computed: {
    ...mapGetters({
      walletList: 'wallet/walletList',
    }),
    VNDSSWallet() {
      return this.walletList.filter(item => item.currency.symbol === 'VNDS')
    },
    PMWallet() {
      return this.walletList.filter(item => item.currency.symbol === 'PM')
    },
    otherWallet() {
      return this.walletList.filter(
        item => item.currency.symbol !== 'VNDS' && item.currency.symbol !== 'PM'
      )
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    formatTimeago,

    ...mapActions({
      getWallets: 'wallet/getWallets',
      setDepositCoin: 'wallet/setDepositCoin',
      setWithdrawCoin: 'wallet/setWithdrawCoin',
    }),

    loadWallets() {
      const hasWalletList = this.walletList.length > 0

      return !hasWalletList ? this.getWallets() : null
    },
    isClipboardSelection({ address }) {
      return address === this.clipboardSelection
    },
    depositCoin(coin) {
      this.setDepositCoin(coin)
      this.$router.push({
        name: 'wallet-deposit',
        query: { coin: coin.currency.symbol },
      })
    },
    withdrawCoin(coin) {
      this.setWithdrawCoin(coin)
      this.$router.push({
        name: 'wallet-withdraw',
        query: { coin: coin.currency.symbol },
      })
    },
    expandRow(row, exxpandRow) {
      if (exxpandRow.length > 1)
        this.$refs.openOrder.toggleRowExpansion(exxpandRow[0], false)
    },
    selectRow(row) {
      this.$refs.openOrder.toggleRowExpansion(row, true)
    },
  },
}
</script>
