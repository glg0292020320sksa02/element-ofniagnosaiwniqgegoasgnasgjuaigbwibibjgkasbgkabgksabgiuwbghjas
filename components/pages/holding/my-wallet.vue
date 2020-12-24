<template>
  <div>
    <table-content-loader v-if="$fetchState.pending"></table-content-loader>

    <div v-else class="overflow-x-auto mt-6">
      <div class="my-wallet">
        <el-table
          ref="openOrder"
          :data="walletList"
          class="whitespace-nowrap cursor-pointer"
          @expand-change="expandRow"
          @row-click="selectRow"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <div class="bg-gray-200 p-4 pl-16">
                <strong class="mr-1">{{ $t('address') }}:</strong>
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="props.row.address"
                  placement="top-start"
                >
                  <span>{{ props.row.address }}</span>
                </el-tooltip>
                <el-button
                  v-clipboard="props.row.address"
                  class="button-fab font-bold"
                  size="mini"
                  circle
                >
                  <transition-scale-icon>
                    <i
                      v-if="isClipboardSelection(props.row)"
                      key="icon-check"
                      class="el-icon-check"
                    ></i>
                    <i v-else key="icon-copy" class="el-icon-copy-document"></i>
                  </transition-scale-icon>
                </el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            class="text-left"
            :label="$t('coin')"
            prop="coin"
            width="170px"
          >
            <template slot-scope="scope">
              <div>
                <span class="font-bold">{{ scope.row.currency.name }}</span>
                <span class="text-subtitle text-xs text-symbol mx-1">
                  ({{ scope.row.currency.symbol }})
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            class="text-left"
            :label="$t('created-at')"
            prop="created_at"
            width="200px"
          >
            <template slot-scope="scope">
              {{ formatTimeago(scope.row.created_at) }}
            </template>
          </el-table-column>
          <el-table-column
            class="text-left"
            :label="$t('balance')"
            prop="real_balance"
          >
            <template slot-scope="scope">
              <div class="flex justify-start items-center">
                <strong>{{ scope.row.real_balance | filterPrice }}</strong>
                <span class="ml-1 text-xs text-subtitle">
                  {{ scope.row.currency.symbol }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            class="text-left"
            :label="$t('reserved')"
            prop="in_order_balance"
          >
            <template slot-scope="scope">
              <div class="flex justify-start items-center">
                <strong>{{ scope.row.in_order_balance | filterPrice }}</strong>
                <span class="ml-1 text-xs text-subtitle">
                  {{ scope.row.currency.symbol }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('action')"
            width="150px"
            class="text-center"
          >
            <template slot-scope="scope">
              <div class="flex items-center justify-start space-x-4">
                <div
                  class="text-primary text-xs font-bold uppercase cursor-pointer hover:underline"
                  @click.stop="depositCoin(scope.row)"
                >
                  {{ $t('deposit') }}
                </div>
                <div
                  class="text-primary text-xs font-bold uppercase cursor-pointer hover:underline"
                  @click.stop="withdrawCoin(scope.row)"
                >
                  {{ $t('widthdraw') }}
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { clipboard } from 'vue-clipboards'
import { format as formatTimeago } from 'timeago.js'

import TransitionScaleIcon from '@/components/common/transition-scale-icon'
import TableContentLoader from '@/components/common/table-content-loader'

import clipboardSelection from '@/mixins/clipboard-selection'
import { filterPrice } from '@/filters'

export default {
  name: 'MyWallet',
  filters: { filterPrice },
  components: {
    TableContentLoader,
    TransitionScaleIcon,
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

<style lang="scss">
.my-wallet .el-table__header,
.my-wallet .el-table__body,
.my-wallet .el-table__footer {
  table-layout: auto;
}
.my-wallet .el-table__body,
.my-wallet .el-table__header {
  width: 100% !important;
}
.my-wallet .has-gutter th .cell {
  text-transform: uppercase !important;
  font-size: 0.75rem !important;
}
.my-wallet .el-table__row td,
.my-wallet .has-gutter th {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  width: fit-content !important;
  text-align: left;
}
.my-wallet .el-table__expanded-cell {
  padding: 0 !important;
}
</style>
