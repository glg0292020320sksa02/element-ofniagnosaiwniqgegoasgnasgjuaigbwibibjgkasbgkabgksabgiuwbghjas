<template>
  <div class="container flex flex-col justify-start items-center h-screen">
    <div class="w-full md:w-2/3 lg:w-1/2 xl:w-2/5">
      <el-card class="p-3 rounded-lg shadow-lg">
        <div class="flex">
          <div class="w-1/2 p-2">
            <div
              class="text-center p-4 text-primary text-base font-bold border-b-2 border-primary"
            >
              {{ $t('widthdraw') }}
            </div>
          </div>
          <div
            class="w-1/2 p-2 cursor-pointer"
            @click="
              $router.push({ name: 'wallet-deposit', query: $route.query })
            "
          >
            <div class="text-center p-4 text-subtitle text-base font-bold">
              {{ $t('deposit') }}
            </div>
          </div>
        </div>
        <div class="p-2">
          <div class="mt-6">
            <input-form :label="$t('coin')" class="mb-4">
              <select-coin
                v-model="walletId"
                :loading="$fetchState.pending"
              ></select-coin>
            </input-form>
            <input-form :label="$t('ToAddress')" class="mb-4">
              <el-input v-model="address"></el-input>
            </input-form>
            <input-form :label="$t('amountCoin')" class="mb-4">
              <input-currency v-model="amount"></input-currency>
              <div class="select-amount-percent mt-1 flex justify-between">
                <span class="text-xs text-subtitle">
                  Current balance:
                  {{ walletSelected.real_balance | filterPrice }}
                  {{ walletSelected.currency.symbol || 'BTC' }}
                </span>
                <el-button
                  round
                  :type="isMaxSelected"
                  class="text-xs"
                  @click="selectAmountPercent"
                >
                  MAX
                </el-button>
              </div>
            </input-form>
          </div>
          <div class="my-6">
            <el-button
              :loading="loading"
              type="primary"
              class="w-full"
              @click="onWithdraw"
            >
              {{ $t('continue') }}
            </el-button>
          </div>
        </div>
      </el-card>
    </div>
    <div class="mt-6">
      <table-content-loader v-if="$fetchState.pending"></table-content-loader>

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
</template>

<script>
import Big from 'big.js'
import { clipboard } from 'vue-clipboards'
import { filterPrice } from '@/filters'

import SelectCoin from '@/components/pages/wallet-sell/select-coin'
import InputCurrency from '@/components/ui/input-currency'
import InputForm from '@/components/common/input-form'
import WithdrawHistory from '@/components/pages/holding/withdraw-history'
import TableContentLoader from '@/components/common/table-content-loader'

import clipboardSelection from '@/mixins/clipboard-selection'

import { mapActions, mapGetters } from 'vuex'

const MONEY_RECEIVED_DEFAULT = 'VNDS'
const MONEY_SELL_DEFAULT = 'BTC'

export default {
  name: 'WalletOuput',
  filters: { filterPrice },
  layout: 'auth',
  components: {
    SelectCoin,
    InputCurrency,
    InputForm,
    WithdrawHistory,
    TableContentLoader,
  },
  directives: { clipboard },
  mixins: [clipboardSelection],
  async fetch() {
    await this.loadWallets()
    this.loadTransactions()
    this.loadCoinDefault()
  },
  data() {
    return {
      listTransactions: [],
      moneyReceivedDefault: MONEY_RECEIVED_DEFAULT,
      address: '',
      amount: '0',
      walletId: '',
      total: 0,
      loading: false,
      options: {
        page: 1,
        type: 'WITHDRAWAL',
        status: '',
        currency: '',
      },
    }
  },
  computed: {
    ...mapGetters({
      walletFiltered: 'wallet/walletFiltered',
      withdrawCoin: 'wallet/withdrawCoin',
    }),
    disabledInfinitiScroll() {
      return this.listTransactions.length === this.total
    },
    walletFilteredList() {
      return this.walletFiltered(MONEY_RECEIVED_DEFAULT)
    },
    walletSelected() {
      return this.walletFilteredList.find(wallet => wallet.id === this.walletId)
        ? this.walletFilteredList.find(wallet => wallet.id === this.walletId)
        : { address: '', currency: {} }
    },
    walletSelectedWithSymbol() {
      return this.walletSelected?.currency?.symbol
    },
    isMaxSelected() {
      return this.walletSelected.real_balance &&
        this.amount.toString() === this.walletSelected.real_balance.toString()
        ? 'primary'
        : 'none'
    },
  },
  methods: {
    ...mapActions({
      getWallets: 'wallet/getWallets',
      withdraw: 'wallet/withdraw',
      getCurrentCurrencyPrice: 'market/getCurrentCurrencyPrice',
      getTransactions: 'setting/getTransactions',
    }),

    loadWallets() {
      const hasWalletFiltered = this.walletFilteredList.length > 0

      return !hasWalletFiltered ? this.getWallets() : null
    },
    loadCoinDefault() {
      const coin = this.getCoin()
      const wallet = this.filterWalletBySymbol(coin)

      this.walletId = wallet?.id
    },

    async onWithdraw() {
      this.$notify.closeAll()

      const body = {
        amount: this.amount,
        address: this.address,
      }

      try {
        this.loading = true
        await this.withdraw({ target: this.walletId, body })
        await this.$success({
          title: this.$t('success'),
          subtitle: this.$t('createBuyOrderSuccessful'),
          actionText: this.$t('pleaseReturnHomePage'),
          actionMethod: () => this.$router.go(-1),
        })
      } catch (e) {
        this.$notify({
          title: this.$t('failure'),
          message: e.exception,
          type: 'error',
        })
      } finally {
        this.loading = false
      }
    },
    getCoin() {
      let coin = this.$route.query.coin

      coin = !coin ? this.withdrawCoin.currency.symbol : coin

      return !coin || coin === MONEY_RECEIVED_DEFAULT
        ? MONEY_SELL_DEFAULT
        : coin
    },
    filterWalletBySymbol(symbol) {
      return this.walletFilteredList.find(
        wallet => wallet.currency.symbol === symbol
      )
    },
    selectAmountPercent() {
      const total = Big(this.walletSelected.real_balance)

      // Big decimal: amount = (this.total * percent) / 100
      const amount = total

      this.amount = amount.toNumber()
    },

    isClipboardSelection({ address }) {
      return address === this.clipboardSelection
    },
    async loadMoreTransactions() {
      if (this.loading) return

      try {
        this.loading = true
        this.options.page += 1
        const { data } = await this.getTransactions(this.options)

        this.listTransactions = [...this.listTransactions, ...data]
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    async loadTransactions() {
      const { data, total } = await this.getTransactions(this.options)

      this.listTransactions = data
      this.total = total
    },
  },
}
</script>

<style>
.card-wallet.el-card .el-card__body {
  @apply p-0 !important;
}
.select-amount-percent .el-button {
  padding: 2px 4px !important;
}
</style>
