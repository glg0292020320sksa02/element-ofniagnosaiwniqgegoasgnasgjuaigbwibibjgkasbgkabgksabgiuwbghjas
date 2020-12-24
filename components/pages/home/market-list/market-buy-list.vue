<template>
  <div
    class="relative bg-gray-100 p-6 rounded-lg flex flex-col justify-start items-stretch"
  >
    <div class="flex flex-row justify-between items-baseline py-4 px-1">
      <strong
        class="font-bold text-base px-4 py-1 rounded-full bg-gray-200 text-gray-900 relative"
      >
        {{ $t('buyList') }}
        <span
          class="h-1 w-1 p-1 inline-block rounded-full bg-error border-4 border-red-200 absolute top-0 left-0"
        ></span>
      </strong>

      <el-button size="small" @click="onRedirectWallet">
        {{ $t('create-a-new-sell-order') }}
      </el-button>
    </div>
    <div class="market-buy-list bg-white m-1 p-6 rounded-lg shadow-sm">
      <div
        class="flex flex-row justify-between items-center border-b border-b-gray-100"
      >
        <el-tabs :value="activeTab" @input="setActiveTab($event)">
          <el-tab-pane
            v-for="crypto in cryptoList"
            :key="crypto"
            :label="crypto"
            :name="crypto"
            class="text-sm"
          ></el-tab-pane>
        </el-tabs>
      </div>
      <div class="mt-12">
        <table-content-loader v-if="loading"></table-content-loader>
        <el-tab-pane-crypto v-else type="buy" :orders="orderListFiltered">
          <template v-slot:paymentMethod="order">
            <div class="flex flex-col justify-center items-center">
              <el-tooltip
                class="item"
                effect="dark"
                :content="
                  order.user_id !== $auth.user.id
                    ? $t('quickPayTooltip', { symbol: 'VNDS' })
                    : $t('yourOrderCanNotBuySell')
                "
                placement="top-start"
              >
                <el-radio class="flex flex-col justify-center items-center">
                  <img
                    class="w-4 h-full cursor-pointer pl-0"
                    :src="require('~/assets/images/banks/vnds.png')"
                    alt=""
                  />
                </el-radio>
              </el-tooltip>
            </div>
          </template>
          <template v-slot:action="{ order, index }">
            <el-tooltip
              class="item"
              effect="dark"
              :content="
                order.user_id !== $auth.user.id
                  ? $t('selectToSellNow')
                  : $t('yourOrderCanNotBuySell')
              "
              placement="top-start"
            >
              <el-button
                type="danger"
                size="mini"
                :plain="index > 0"
                :disabled="order.user_id === $auth.user.id"
                @click="onSell(order)"
              >
                {{ $t('sell') }}
              </el-button>
            </el-tooltip>
          </template>
        </el-tab-pane-crypto>
      </div>
    </div>
  </div>
</template>
<script>
import ElTabs from 'element-ui/lib/tabs'
import ElTabPane from 'element-ui/lib/tab-pane'
import ElTabPaneCrypto from '@/components/pages/home/market-list/el-tab-pane-crypto'
import TableContentLoader from '@/components/common/table-content-loader'

import { mapActions, mapGetters } from 'vuex'

const CRYPTO_LIST = ['BTC', 'ETH', 'ETC', 'XRP', 'USDT']
const DEFAULT_TYPE = 'BUY'

export default {
  name: 'MarketBuyList',
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
  data() {
    return {
      cryptoList: CRYPTO_LIST,
      selectedTab: CRYPTO_LIST[0],
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
        .sort((a, b) => {
          return b.price - a.price
        })
    },
  },
  methods: {
    ...mapActions({
      setActiveTab: 'setActiveTab',
      setSelectedSellOrder: 'market/setSelectedSellOrder',
    }),
    onRedirectWallet() {
      this.$router.push({
        name: 'wallet-sell',
        query: { coin: this.activeTab },
      })
    },
    onSell(order) {
      // this.setSelectedSellOrder(order)
      this.$router.push({
        path: `/exchanges/sell/${order.id}`,
      })
    },
  },
}
</script>
<style>
.market-buy-list .el-radio__label {
  padding-left: 0 !important;
}
</style>
