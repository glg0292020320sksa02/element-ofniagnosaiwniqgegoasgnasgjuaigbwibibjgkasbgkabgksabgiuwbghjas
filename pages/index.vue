<template>
  <div class="page-home container py-8 space-y-8">
    <market-trending></market-trending>
    <lazy-hydrate when-visible>
      <market-list></market-list>
    </lazy-hydrate>
    <register-banner></register-banner>
    <trade-history></trade-history>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import LazyHydrate from 'vue-lazy-hydration'

import MarketTrending from '@/components/pages/home/market-trending'
import MarketList from '@/components/pages/home/market-list/market-list'
import TradeHistory from '@/components/pages/home/trade-history'
import RegisterBanner from '@/components/common/promotion/register-banner'
export default {
  name: 'Home',
  auth: false,
  components: {
    LazyHydrate,
    MarketTrending,
    MarketList,
    RegisterBanner,
    TradeHistory,
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
