<template>
  <div class="relative">
    <div
      class="bg-success text-white text-center p-3 min-w-32 rounded-t-lg inline-block"
    >
      <strong class="uppercase font-bold text-sm">{{ $t('sellList') }}</strong>
    </div>
    <div class="market-sell-list bg-white p-5 rounded">
      <div class="flex flex-row justify-between items-center">
        <el-tabs
          :value="activeTab"
          @input="setActiveTab($event)"
          @edit="updateSelectedCurrencyTab"
        >
          <el-tab-pane
            v-for="crypto in cryptoList"
            :key="crypto"
            :label="crypto"
            :name="crypto"
          ></el-tab-pane>
        </el-tabs>
        <el-button
          type="text"
          size="small"
          class="text-success px-4"
          @click="onRedirectWallet"
        >
          {{ $t('create-a-new-buy-order') }}
        </el-button>
      </div>
      <div>
        <el-tab-pane-crypto type="sell" :orders="orderListFiltered">
          <template v-slot:paymentMethod="order">
            <el-radio-group v-model="selectedPayment">
              <div class="flex justify-center items-start space-x-2">
                <div
                  v-for="paymentMethod in paymentMethodsFiltered"
                  :key="paymentMethod.value"
                  class="flex flex-col justify-center align-middle p-1"
                >
                  <el-radio
                    :label="paymentMethod.value"
                    class="flex flex-col justify-center align-middle"
                  >
                    <img
                      class="h-4 w-4 cursor-pointer pl-0"
                      :src="
                        require('~/assets/images/banks/' + paymentMethod.icon)
                      "
                      alt=""
                      @click="
                        onBuy({
                          orderId: order.id,
                          paymentMethod: paymentMethod.value,
                        })
                      "
                    />
                  </el-radio>
                </div>
              </div>
            </el-radio-group>
          </template>
          <template v-slot:action="{ order, index }">
            <el-button
              type="success"
              :plain="index > 0"
              size="mini"
              @click="onBuy({ orderId: order.id })"
            >
              {{ $t('buy') }}
            </el-button>
          </template>
        </el-tab-pane-crypto>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ElTabs from 'element-ui/lib/tabs'
import ElTabPane from 'element-ui/lib/tab-pane'
import ElTabPaneCrypto from '@/components/pages/home/market-list/el-tab-pane-crypto'

const CRYPTO_LIST = ['BTC', 'ETH', 'ETC', 'XRP', 'USDT', 'VNDS']
const DEFAULT_TYPE = 'SELL'

export default {
  name: 'MarketSellList',
  components: { ElTabPaneCrypto, ElTabs, ElTabPane },
  props: {
    orders: {
      type: Array,
      default: () => [],
    },
  },
  async fetch() {
    await this.loadBankAccount()
  },
  data() {
    return {
      cryptoList: CRYPTO_LIST,
      selectedTab: CRYPTO_LIST[0],
      paymentMethods: [
        { value: 'VCB', icon: 'vietcom-bank.png' },
        { value: 'TCB', icon: 'techcom-bank.png' },
        { value: 'VNDS', icon: 'vnds.png' },
        { value: 'ALL_BANK', icon: 'all-bank.png' },
      ],
      selectedPayment: null,
      listBankAccount: [],
      listBankAccountNumber: [],
    }
  },
  computed: {
    ...mapGetters({
      activeTab: 'activeTab',
    }),
    orderListFiltered() {
      if (!this.orders.length) return []

      return this.orders
        .filter(order => order.type === DEFAULT_TYPE)
        .filter(order => {
          const symbol = order?.wallet?.currency?.symbol

          return symbol === this.activeTab
        })
    },
    paymentMethodsFiltered() {
      return this.paymentMethods
        .filter(paymentMethod => paymentMethod.value !== this.activeTab)
        .filter(paymentMethod => {
          if (
            !this.listBankAccountNumber ||
            this.listBankAccountNumber.length === 0
          )
            return paymentMethod.value !== 'ALL_BANK'

          return paymentMethod.value
        })
        .filter(paymentMethod => {
          if (!this.listBankAccount || this.listBankAccount.length === 0)
            return (
              paymentMethod.value !== 'VCB' && paymentMethod.value !== 'TCB'
            )

          return paymentMethod.value
        })
    },
  },
  methods: {
    ...mapActions({
      changeSelectedCurrency: 'wallet/changeSelectedCurrency',
      setSelectedBuyOrder: 'market/setSelectedBuyOrder',
      setActiveTab: 'setActiveTab',
      getBankAccount: 'bank/getBankAccount',
      getBankAccountNumbers: 'bank/getBankAccountNumbers',
    }),
    onRedirectWallet() {
      this.$router.push({ name: 'wallet-buy', query: { coin: this.activeTab } })
    },

    onBuy({ paymentMethod, orderId }) {
      // this.setSelectedBuyOrder(order)
      this.$router.push({
        path: `exchanges/buy/${orderId}`,
        query: { payment_method: paymentMethod },
      })
    },
    updateSelectedCurrencyTab() {},
    async loadBankAccount() {
      this.listBankAccount = await this.getBankAccount()
      this.listBankAccountNumber = await this.getBankAccountNumbers()
    },
  },
}
</script>
<style>
.market-sell-list .el-radio__label {
  padding-left: 0 !important;
}
</style>
