<template>
  <div class="container flex flex-col justify-start items-center h-screen">
    <div class="w-full md:w-2/3 lg:w-1/2 xl:w-2/5">
      <el-card class="w-full min-w-full">
        <div class="flex">
          <div
            class="w-1/2 p-2 cursor-pointer"
            @click="
              $router.push({ name: 'wallet-withdraw', query: $route.query })
            "
          >
            <div class="text-center p-4 text-subtitle text-base font-bold">
              {{ $t('widthdraw') }}
            </div>
          </div>
          <div class="w-1/2 p-2">
            <div
              class="text-center rounded p-4 text-primary text-base font-bold bg-disabled"
            >
              {{ $t('deposit') }}
            </div>
          </div>
        </div>
        <div class="p-2">
          <input-form :label="$t('selectPaymentMethod')" class="mb-6">
            <select-coin
              v-model="walletId"
              :value="depositCoin.id"
              :loading="$fetchState.pending"
            ></select-coin>
          </input-form>
          <div class="flex flex-col items-center justify-center mb-6">
            <span class="text-xs text-subtitle">{{ $t('scanToPay') }}</span>
            <qr-code
              v-if="$fetchState.pending"
              value="QR Code Content loader - XXXXXXXXXXXXXXXXX"
              :size="212"
            ></qr-code>
            <qr-code v-else :value="qrLink" download :size="212"></qr-code>
          </div>
          <input-form :label="$t('address')" class="mb-6">
            <el-input
              v-model="walletSelected.address"
              class="input-with-select"
              realonly
            >
              <el-button slot="append" v-clipboard="walletSelected.address">
                <transition-scale-icon>
                  <i
                    v-if="isClipboardSelection(walletSelected)"
                    key="icon-check"
                    class="el-icon-check"
                  ></i>
                  <i v-else key="icon-copy" class="el-icon-copy-document"></i>
                </transition-scale-icon>
              </el-button>
            </el-input>
          </input-form>
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
        <deposit-history :data="listTransactions"></deposit-history>
      </div>
    </div>
  </div>
</template>

<script>
import QrCode from '@/components/common/qr-code'
import { clipboard } from 'vue-clipboards'
import SelectCoin from '@/components/pages/wallet-sell/select-coin'
import TransitionScaleIcon from '@/components/common/transition-scale-icon'
import DepositHistory from '@/components/pages/holding/deposit-history'
import TableContentLoader from '@/components/common/table-content-loader'
import InputForm from '@/components/common/input-form'
import clipboardSelection from '@/mixins/clipboard-selection'
import { mapActions, mapGetters } from 'vuex'

const MONEY_RECEIVED_DEFAULT = 'VNDS'
const MONEY_SELL_DEFAULT = 'BTC'

export default {
  name: 'WalletDeposit',
  layout: 'auth',
  components: {
    QrCode,
    SelectCoin,
    TransitionScaleIcon,
    InputForm,
    DepositHistory,
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
      walletId: '',
      total: 0,
      options: {
        page: 1,
        type: 'DEPOSIT',
        status: '',
        currency: '',
      },
    }
  },
  computed: {
    ...mapGetters({
      walletFiltered: 'wallet/walletFiltered',
      depositCoin: 'wallet/depositCoin',
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
        : { address: '' }
    },
    walletSelectedWithSymbol() {
      return this.walletSelected?.currency?.symbol
    },
    qrLink() {
      const link = 'otpauth://totp/{{NAME}}?secret={{KEY}}&issuer={{ISSUER}}'
      const issuer = 'C2A'
      const name = `${issuer}:${this.walletSelected.address}`

      return link
        .replace(/{{NAME}}/g, name)
        .replace(/{{KEY}}/g, this.secretKey)
        .replace(/{{ISSUER}}/g, issuer)
    },
  },
  methods: {
    ...mapActions({
      getWallets: 'wallet/getWallets',
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
    getCoin() {
      let coin = this.$route.query.coin

      coin = !coin ? this.depositCoin.currency.symbol : coin

      return !coin || coin === MONEY_RECEIVED_DEFAULT
        ? MONEY_SELL_DEFAULT
        : coin
    },
    filterWalletBySymbol(symbol) {
      return this.walletFilteredList.find(
        wallet => wallet.currency.symbol === symbol
      )
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
.copybtn {
  bottom: 0;
  right: 0;
}
</style>
