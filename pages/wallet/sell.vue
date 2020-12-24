<template>
  <div class="container flex justify-center items-start min-h-screen">
    <div class="w-full md:w-2/3 lg:w-1/2 xl:w-2/5">
      <el-card>
        <div class="flex">
          <div
            class="w-1/2 p-2 cursor-pointer"
            @click="$router.push({ name: 'wallet-buy' })"
          >
            <div class="text-center p-4 text-subtitle text-base font-bold">
              {{ $t('createBuyOrder') }}
            </div>
          </div>
          <div class="w-1/2 p-2">
            <div
              class="text-center rounded p-4 text-primary text-base font-bold bg-disabled"
            >
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
                :content="
                  $t('infinitySellTooltip', {
                    symbol: walletSelectedWithSymbol,
                  })
                "
                placement="top-start"
              >
                <el-checkbox
                  v-model="model.is_infinite"
                  :label="$t('infinitySetup')"
                ></el-checkbox>
              </el-tooltip>
            </input-form>
            <input-form :label="$t('coin')" class="mb-5">
              <select-coin
                v-model="model.wallet_id"
                :loading="$fetchState.pending"
                :filter="false"
                @input="loadCurrentCurrencyPrice"
              ></select-coin>
            </input-form>
            <input-form :label="$t('payment_method')" class="mb-5">
              <el-select
                v-model="model.payment_method"
                placeholder=""
                class="select-payment-method w-full"
              >
                <el-option
                  :label="$t('vcb-or-tcb')"
                  value="VCB_OR_TCB"
                ></el-option>
                <el-option :label="$t('all-bank')" value="ALL_BANK"></el-option>
              </el-select>
            </input-form>
            <input-form :label="$t('bank-account')" class="mb-5">
              <select-account-number
                v-model="model.bank_account_number_id"
              ></select-account-number>
            </input-form>
            <input-form :label="$t('price')" class="mb-5">
              <input-currency v-model="model.price">
                <template slot="append">
                  <span>{{ moneyReceivedDefault }}</span>
                  <span>/</span>
                  <span>
                    {{
                      walletSelectedWithSymbol === 'VNDS'
                        ? 'VND'
                        : walletSelectedWithSymbol
                    }}
                  </span>
                </template>
              </input-currency>
              <span class="w-full text-gray-500 text-xs">
                {{ $t('marketPrice') }}: {{ marketPrice | filterPrice }}
              </span>
            </input-form>
            <input-form :label="$t('amountCoin')">
              <input-currency v-model="model.amount"></input-currency>
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
              <input-currency v-model="total" disabled>
                <template slot="append">
                  {{ moneyReceivedDefault }}
                </template>
              </input-currency>
            </input-form>
            <input-form :label="$t('your-balance')" class="mb-5">
              <input-currency :value="walletSelected.real_balance" disabled>
                <template slot="append">
                  {{ walletSelectedWithSymbol }}
                </template>
              </input-currency>
            </input-form>
          </div>
          <div class="my-12">
            <el-button
              type="primary"
              class="w-full"
              :loading="loading"
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
import Big from 'big.js'
import { mapActions, mapGetters } from 'vuex'
import { filterPrice } from '@/filters'

import SelectAccountNumber from '@/components/pages/wallet-sell/select-account-number'
import SelectCoin from '@/components/pages/wallet-sell/select-coin'
import InputCurrency from '@/components/ui/input-currency'
import InputForm from '@/components/common/input-form'

const MONEY_RECEIVED_DEFAULT = 'VNDS'
const MONEY_SELL_DEFAULT = 'BTC'

export default {
  name: 'WalletSell',
  filters: { filterPrice },
  layout: 'auth',
  components: { SelectAccountNumber, SelectCoin, InputCurrency, InputForm },
  async fetch() {
    await this.loadWallets()
    this.loadCoinDefault()
  },
  data() {
    return {
      loading: false,
      moneyReceivedDefault: MONEY_RECEIVED_DEFAULT,
      model: {
        price: 0,
        amount: 0,
        wallet_id: '',
        bank_account_number_id: '',
        payment_method: 'VCB_OR_TCB',
        is_infinite: false,
      },
      marketPrice: 0,
    }
  },
  computed: {
    ...mapGetters({
      walletFiltered: 'wallet/walletFiltered',
    }),
    walletFilteredList() {
      return this.walletFiltered()
    },
    walletSelected() {
      return (
        this.walletFilteredList.find(
          wallet => wallet.id === this.model.wallet_id
        ) || {}
      )
    },
    walletSelectedWithSymbol() {
      return this.walletSelected?.currency?.symbol
    },
    total() {
      const price = Big(Number(this.model.price))

      // Big decimal: total = this.price * this.amount
      return this.model.amount ? price.times(this.model.amount).toNumber() : 0
    },
    typeMaxButton() {
      return this.walletSelected.real_balance &&
        Math.round(this.model.amount * 10000000) / 10000000 ===
          Math.round(
            Big(this.walletSelected.real_balance).toNumber() * 10000000
          ) /
            10000000
        ? 'primary'
        : 'none'
    },
  },
  methods: {
    ...mapActions({
      getWallets: 'wallet/getWallets',
      addOrderSell: 'market/addOrderSell',
      getCurrentCurrencyPrice: 'market/getCurrentCurrencyPrice',
    }),

    loadWallets() {
      const hasWalletFiltered = this.walletFilteredList.length > 0

      return !hasWalletFiltered && this.getWallets()
    },
    async loadCoinDefault() {
      const coin = this.getCoin()
      const wallet = this.filterWalletBySymbol(coin)
      const price = await this.getCurrentCurrencyPrice(coin)

      this.marketPrice = price.vnd_price
      this.model.price = price.vnd_price
      this.model.wallet_id = wallet?.id
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
        ...this.model,
      }

      try {
        this.loading = true
        await this.addOrderSell(body)

        await this.$success({
          title: this.$t('success'),
          subtitle: this.$t('createSellOrderSuccessful'),
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
      this.model.price = price.vnd_price
    },
    selectAmountPercent() {
      // Big decimal: amount = (this.total * percent) / 100
      const amount = this.walletSelected.real_balance

      this.model.amount = amount
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
