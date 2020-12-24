<template>
  <div class="container flex justify-center items-start min-h-screen">
    <div class="w-full md:w-2/3 lg:w-1/2 xl:w-2/5">
      <el-card>
        <div class="flex">
          <div class="w-1/2 p-2">
            <div
              class="text-center rounded p-4 text-primary text-base font-bold bg-disabled"
            >
              {{ $t('createBuyOrder') }}
            </div>
          </div>
          <div
            class="w-1/2 p-2 cursor-pointer"
            @click="$router.push({ name: 'wallet-sell' })"
          >
            <div class="text-center p-4 text-subtitle text-base font-bold">
              {{ $t('createSellOrder') }}
            </div>
          </div>
        </div>
        <div class="p-2">
          <div class="mt-6">
            <input-form class="mb-5">
              <el-tooltip
                class="item"
                effect="dark"
                :content="$t('infinityBuyTooltip')"
                placement="top-start"
              >
                <el-checkbox
                  v-model="isInfinite"
                  :label="$t('infinitySetup')"
                ></el-checkbox>
              </el-tooltip>
            </input-form>
            <input-form :label="$t('coin')" class="mb-5">
              <select-coin
                v-model="walletId"
                :loading="$fetchState.pending"
                @input="loadCurrentCurrencyPrice"
              ></select-coin>
            </input-form>
            <input-form :label="$t('price')" class="mb-5">
              <input-currency v-model="price">
                <template slot="append">
                  <span>{{ moneyReceivedDefault }}</span>
                  <span>/</span>
                  <span>{{ walletSelectedWithSymbol }}</span>
                </template>
              </input-currency>
              <span class="w-full text-gray-500 text-xs">
                {{ $t('marketPrice') }}: {{ marketPrice | filterPrice }}
              </span>
            </input-form>
            <input-form :label="$t('amountCoin')">
              <input-currency v-model="amount"></input-currency>
              <div class="select-amount-percent mt-1 flex justify-end">
                <el-button
                  round
                  :type="typeMaxButton"
                  class="text-xs"
                  @click="selectAmountPercent"
                >
                  MAX
                </el-button>
              </div>
            </input-form>
            <input-form :label="$t('total')" class="mb-5">
              <input-currency
                :value="total"
                :suffix="moneyReceivedDefault"
                disabled
              ></input-currency>
            </input-form>
            <input-form :label="$t('yourVNDSBalance')" class="mb-5">
              <input-currency :value="VNDS.real_balance" disabled>
                <template slot="append">VNDS</template>
              </input-currency>
            </input-form>
          </div>
          <div class="my-12">
            <el-button
              :loading="loading"
              type="primary"
              class="w-full"
              @click="onCreateOrder"
            >
              {{ $t('continue') }}
            </el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-alert, no-console */
import Big from 'big.js'
import { mapActions, mapGetters } from 'vuex'
import { filterPrice } from '@/filters'

import SelectCoin from '@/components/pages/wallet-sell/select-coin'
import InputCurrency from '@/components/ui/input-currency'
import InputForm from '@/components/common/input-form'

const MONEY_RECEIVED_DEFAULT = 'VNDS'
const MONEY_SELL_DEFAULT = 'BTC'

export default {
  name: 'WalletBuy',
  filters: { filterPrice },
  layout: 'auth',
  components: { SelectCoin, InputCurrency, InputForm },
  async fetch() {
    await this.loadWallets()

    this.loadCoinDefault()
  },
  data() {
    return {
      moneyReceivedDefault: MONEY_RECEIVED_DEFAULT,
      price: '',
      amount: 0,
      walletId: '',
      loading: false,
      isInputActive: false,
      isInfinite: false,
      marketPrice: 0,
    }
  },
  computed: {
    ...mapGetters({
      walletFiltered: 'wallet/walletFiltered',
      VNDS: 'wallet/VNDS',
    }),
    walletFilteredList() {
      return this.walletFiltered(MONEY_RECEIVED_DEFAULT)
    },
    walletSelected() {
      return (
        this.walletFilteredList.find(wallet => wallet.id === this.walletId) ||
        {}
      )
    },
    walletSelectedWithSymbol() {
      return this.walletSelected?.currency?.symbol
    },
    total() {
      const price = Big(Number(this.price))

      // Big decimal: total = this.price * this.amount
      return this.amount ? price.times(this.amount).toNumber() : 0
    },
    typeMaxButton() {
      return this.VNDS && this.VNDS.final_balance === this.total
        ? 'primary'
        : 'none'
    },
  },
  methods: {
    ...mapActions({
      getWallets: 'wallet/getWallets',
      addOrderBuy: 'market/addOrderBuy',
      getCurrentCurrencyPrice: 'market/getCurrentCurrencyPrice',
    }),

    loadWallets() {
      const hasWalletFiltered = this.walletFilteredList.length > 0

      return !hasWalletFiltered ? this.getWallets() : null
    },
    async loadCoinDefault() {
      const coin = this.getCoin()
      const wallet = this.filterWalletBySymbol(coin)
      const price = await this.getCurrentCurrencyPrice(coin)

      this.marketPrice = price.vnd_price
      this.price = price.vnd_price
      this.walletId = wallet?.id
    },
    getCoin() {
      const coin = this.$route.query.coin

      return !coin || coin === MONEY_RECEIVED_DEFAULT
        ? MONEY_SELL_DEFAULT
        : coin
    },
    filterWalletBySymbol(symbol) {
      return this.walletFilteredList.find(
        wallet => wallet.currency.symbol === symbol
      )
    },
    async onCreateOrder() {
      this.$notify.closeAll()

      const body = {
        amount: this.amount,
        price: this.price,
        wallet_id: this.walletId,
        is_infinite: this.isInfinite,
      }

      try {
        this.loading = true
        await this.addOrderBuy(body)
        await this.$success({
          title: this.$t('success'),
          subtitle: this.$t('createBuyOrderSuccessful'),
          actionText: this.$t('pleaseReturnHomePage'),
          actionMethod: () => this.$router.push({ name: 'index' }),
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
    async loadCurrentCurrencyPrice() {
      const coin = this.walletSelected
      const price = await this.getCurrentCurrencyPrice(coin.currency.name)

      this.marketPrice = price.vnd_price
      this.price = price.vnd_price
    },
    selectAmountPercent() {
      const total = Big(this.VNDS.real_balance)

      // Big decimal: amount = (this.total * percent) / 100
      const amount = total.div(this.price)

      this.amount = amount.toNumber()
    },
  },
}
</script>

<style>
.card-wallet.el-card .el-card__body {
  padding: 0 !important;
}
.select-amount-percent .el-button {
  padding: 2px 4px !important;
}
</style>
