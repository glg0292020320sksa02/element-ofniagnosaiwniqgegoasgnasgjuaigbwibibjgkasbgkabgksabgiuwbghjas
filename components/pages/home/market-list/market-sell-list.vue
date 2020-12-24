<template>
  <div
    class="relative bg-gray-100 p-6 rounded-lg flex flex-col justify-start items-stretch"
  >
    <div class="flex flex-row justify-between items-baseline py-4 px-1">
      <strong
        class="font-bold text-base px-4 py-1 rounded-full bg-gray-200 text-gray-900 relative"
      >
        {{ $t('sellList') }}
        <span
          class="h-1 w-1 p-1 inline-block rounded-full bg-success border-4 border-green-200 absolute top-0 left-0"
        ></span>
      </strong>
      <el-button size="small" @click="onRedirectWallet">
        {{ $t('create-a-new-buy-order') }}
      </el-button>
    </div>
    <div class="market-sell-list bg-white m-1 p-6 rounded-lg shadow-sm">
      <div
        class="flex flex-row justify-between items-center border-b border-b-gray-100"
      >
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
      </div>
      <div class="mt-12">
        <table-content-loader v-if="loading"></table-content-loader>
        <el-tab-pane-crypto v-else type="sell" :orders="orderListFiltered">
          <template v-slot:paymentMethod="order">
            <el-radio-group v-model="selectedPayment">
              <div class="flex justify-center items-start space-x-2">
                <div
                  v-for="paymentMethod in paymentMethods"
                  :key="paymentMethod.value"
                  class="flex flex-col justify-center align-middle p-1"
                >
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="
                      order.user_id !== $auth.user.id
                        ? $t('quickPayTooltip', { symbol: paymentMethod.value })
                        : $t('yourOrderCanNotBuySell')
                    "
                    placement="top-start"
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
                            userId: order.user_id,
                          })
                        "
                      />
                    </el-radio>
                  </el-tooltip>
                </div>
              </div>
            </el-radio-group>
          </template>
          <template v-slot:action="{ order, index }">
            <el-tooltip
              class="item"
              effect="dark"
              :content="
                order.user_id !== $auth.user.id
                  ? $t('selectToBuyNow')
                  : $t('yourOrderCanNotBuySell')
              "
              placement="top-start"
            >
              <el-button
                type="success"
                :plain="index > 0"
                size="mini"
                :disabled="order.user_id === $auth.user.id"
                @click="onBuy({ orderId: order.id, userId: order.user_id })"
              >
                {{ $t('buy') }}
              </el-button>
            </el-tooltip>
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
import TableContentLoader from '@/components/common/table-content-loader'

const CRYPTO_LIST = ['BTC', 'ETH', 'ETC', 'XRP', 'USDT', 'VNDS']
const DEFAULT_TYPE = 'SELL'

export default {
  name: 'MarketSellList',
  components: { ElTabPaneCrypto, ElTabs, ElTabPane, TableContentLoader },
  props: {
    orders: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
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
        // { value: 'ALL_BANK', icon: 'all-bank.png' },
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

    onBuy({ paymentMethod, orderId, userId }) {
      // this.setSelectedBuyOrder(order)
      if (this.$auth.user.id === userId) {
        return
      }

      this.$router.push({
        path: `/exchanges/buy/${orderId}`,
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
