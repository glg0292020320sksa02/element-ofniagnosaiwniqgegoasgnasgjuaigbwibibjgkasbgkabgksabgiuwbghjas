<template>
  <div>
    <div class="mt-6">
      <!-- <input-form class="mb-5">
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
            :label="$t('infinitySellSetup')"
            @change="changeInfinity"
          ></el-checkbox>
        </el-tooltip>
      </input-form> -->
      <input-form :label="$t('coin')" class="mb-5">
        <select-coin
          v-model="model.wallet_id"
          :loading="$fetchState.pending"
          :filter="false"
          :include-vnds="false"
          class="text-sm"
          @input="loadCurrentCurrencyPrice"
        ></select-coin>
      </input-form>
      <input-form :label="$t('bank-account')" class="mb-5">
        <select-account-number
          v-model="model.bank_account_number_id"
          class="text-sm"
        ></select-account-number>
      </input-form>
      <input-form :label="$t('priceSell')" class="mb-5 relative">
        <input-currency v-model="model.price" class="text-sm"></input-currency>
        <span class="price-unit text-500">{{ priceUnit }}</span>
        <span class="w-full text-gray-500 text-xs">
          {{ $t('marketPrice') }}: {{ marketPrice | filterPriceMoney }}
          {{ priceUnit }}
        </span>
      </input-form>
      <input-form :label="$t('amountCoin')" class="mb-5">
        <input-currency
          v-model="model.amount"
          :disabled="model.is_infinite"
          class="text-sm"
        ></input-currency>
        <div class="select-amount-percent mt-1 flex justify-between">
          <span class="text-xs text-gray-500">
            {{ $t('your-balance') }} :
            <strong>
              {{ walletSelected.real_balance | filterPrice }}
              {{ walletSelectedWithSymbol }}
            </strong>
          </span>
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
      <input-form :label="$t('total')" class="mb-5 relative">
        <input-currency
          :value="total"
          disabled
          class="text-sm"
        ></input-currency>
        <span class="price-unit text-gray-500">
          {{ moneyReceivedDefault }}
        </span>
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
</template>

<script>
import Big from 'big.js'
import { mapActions, mapGetters } from 'vuex'
import { filterPriceMoney, filterPrice } from '@/filters'

import SelectAccountNumber from '@/components/pages/wallet-sell/select-account-number'
import SelectCoin from '@/components/pages/wallet-sell/select-coin'
import InputCurrency from '@/components/ui/input-currency'
import InputForm from '@/components/pages/binance/home/input-form'

const MONEY_RECEIVED_DEFAULT = 'VNDS'
const MONEY_SELL_DEFAULT = 'BTC'

export default {
  name: 'WalletSell',
  filters: { filterPriceMoney, filterPrice },
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
      activeCoin: 'binance/activeCoin',
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

      return this.model.amount
        ? Math.round(price.times(this.model.amount).toNumber())
        : 0
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
    priceUnit() {
      return `VNDS/${this.walletSelected?.currency?.symbol}`
    },
  },
  watch: {
    activeCoin() {
      this.loadWallets()
      this.loadCoinDefault()
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
      const coin = this.activeCoin.value

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
    changeInfinity() {
      if (this.model.is_infinite)
        this.model.amount = this.walletSelected.real_balance
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
.price-unit {
  position: absolute;
  right: 4px;
  top: 40px;
  font-size: 0.75rem;
}
</style>
