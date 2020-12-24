<template>
  <div class="relative">
    <div
      class="bg-error text-white text-center p-3 min-w-32 rounded-t-lg inline-block"
    >
      <strong class="uppercase font-bold text-sm">{{ $t('buyList') }}</strong>
    </div>
    <div class="market-buy-list bg-white p-5 rounded">
      <div class="flex flex-row justify-between items-center">
        <el-tabs :value="activeTab" @input="setActiveTab($event)">
          <el-tab-pane
            v-for="crypto in cryptoList"
            :key="crypto"
            :label="crypto"
            :name="crypto"
            class="text-sm"
          ></el-tab-pane>
        </el-tabs>
        <el-button
          type="text"
          size="small"
          class="text-error px-4"
          @click="onRedirectWallet"
        >
          {{ $t('create-a-new-sell-order') }}
        </el-button>
      </div>
      <div>
        <el-tab-pane-crypto type="buy" :orders="orderListFiltered">
          <template v-slot:paymentMethod>
            <div class="flex flex-col justify-center items-center">
              <el-radio class="flex flex-col justify-center items-center">
                <img
                  class="w-4 h-full cursor-pointer pl-0"
                  :src="require('~/assets/images/banks/vnds.png')"
                  alt=""
                />
              </el-radio>
            </div>
          </template>
          <template v-slot:action="{ order, index }">
            <el-button
              type="danger"
              size="mini"
              :plain="index > 0"
              @click="onSell(order)"
            >
              {{ $t('sell') }}
            </el-button>
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
import { mapActions, mapGetters } from 'vuex'

const CRYPTO_LIST = ['BTC', 'ETH', 'ETC', 'XRP', 'USDT']
const DEFAULT_TYPE = 'BUY'

export default {
  name: 'MarketBuyList',
  components: { ElTabPaneCrypto, ElTabs, ElTabPane },
  props: {
    orders: {
      type: Array,
      default: () => [],
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
        path: `exchanges/sell/${order.id}`,
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
