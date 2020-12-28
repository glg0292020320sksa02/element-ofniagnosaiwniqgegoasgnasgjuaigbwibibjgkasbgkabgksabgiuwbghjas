<template>
  <div class="page-home container py-8 space-y-8">
    <market-trending></market-trending>
    <lazy-hydrate when-visible>
      <market-list :loading="loading"></market-list>
    </lazy-hydrate>
    <register-banner></register-banner>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import LazyHydrate from 'vue-lazy-hydration'

import MarketTrending from '@/components/pages/home/market-trending'
import MarketList from '@/components/pages/home/market-list/market-list'
import RegisterBanner from '@/components/common/promotion/register-banner'
export default {
  name: 'Home',
  auth: false,
  components: {
    LazyHydrate,
    MarketTrending,
    MarketList,
    RegisterBanner,
  },
  fetch() {
    this.loadAllOrders()
  },
  data() {
    return {
      loading: false,
      orderList: [],
      value: 0,
      price: 0,
      money: {
        decimal: ',',
        thousands: '.',
        precision: 2,
        masked: false,
      },
    }
  },
  computed: {
    moneyFormat() {
      const deci = this.getPrecision(this.price)

      return { ...this.money, precision: deci }
    },
  },
  methods: {
    ...mapActions({
      getAllOrders: 'market/getAllOrders',
    }),
    async loadAllOrders() {
      this.loading = true
      const { data } = await this.getAllOrders()

      this.loading = false
      this.orderList = data
    },
    getPrecision(num) {
      let numAsStr = num.toFixed(10)

      numAsStr = numAsStr.replace(/0+$/g, '')

      const precision =
        String(numAsStr).replace(',', '').length - num.toFixed().length

      return precision
    },
  },
}
</script>

<style lang="scss">
@import '~element-ui/packages/theme-chalk/src/tabs.scss';
@import '~element-ui/packages/theme-chalk/src/tab-pane.scss';

.page-home {
  .el-tabs__item {
    padding: 20px;
    height: 60px;
    line-height: inherit;
  }
  .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 20px;
  }
  .el-tabs--top .el-tabs__item.is-top:last-child {
    padding-right: 20px;
  }
}
</style>
