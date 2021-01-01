<template>
  <div
    class="the-navigation text-sm text-gray-900 flex justify-start items-baseline"
  >
    <div
      v-for="(menu, index) in menus"
      :key="index + 'menu'"
      class="menu-item p-1 relative"
      :class="{ active: activeRouter.includes(menu.to) }"
      @mouseenter="showSubMenu(menu.name)"
    >
      <nuxt-link
        v-if="menu.authCheck"
        :to="menu.to"
        class="p-4 px-2 flex flex-row justify-start items-center whitespace-nowrap hover:text-primary"
      >
        {{ $t(menu.name) }}
        <icon-chevron-down
          v-if="menu.subMenu"
          class="h-3 w-4 font-bold"
        ></icon-chevron-down>
      </nuxt-link>
      <the-menu
        v-if="menu.subMenu && activeMenu === menu.name"
        :data="menu.subMenu"
        @over="activeMenu = ''"
      ></the-menu>
    </div>
  </div>
</template>
<script>
import TheMenu from '@/components/layouts/default/the-menu'
import IconBuy from '@/components/ui/icon/icon-buy'
import IconSell from '@/components/ui/icon/icon-sell'
import IconBuyOrder from '@/components/ui/icon/icon-buy-order'
import IconSellOrder from '@/components/ui/icon/icon-sell-order'
import IconBalance from '@/components/ui/icon/icon-balance'
import IconDepositHistory from '@/components/ui/icon/icon-deposit'
import IconWithdrawHistory from '@/components/ui/icon/icon-withdraw'
import IconChevronDown from '@/components/ui/icon/icon-chevron-down'

export default {
  name: 'TheNavigation',
  components: {
    TheMenu,
    IconChevronDown,
  },
  data() {
    return {
      activeMenu: '',
    }
  },
  computed: {
    activeRouter() {
      return this.$route.path
    },
    menus() {
      return [
        {
          name: 'navBuySell',
          to: '/dashboard',
          authCheck: true,
          subMenu: [
            {
              title: this.$t('htmlBuy'),
              subTitle: this.$t('buyMenuSubtitle'),
              to: '/dashboard/buy',
              icon: IconBuy,
            },
            {
              title: this.$t('htmlSell'),
              subTitle: this.$t('sellMenuSubtitle'),
              to: '/dashboard/sell',
              icon: IconSell,
            },
          ],
        },
        {
          name: 'navPostOfTrade',
          to: '/wallet/buy',
          authCheck: true,
          subMenu: [
            {
              title: this.$t('htmlCreateBuyOrder'),
              subTitle: this.$t('createBuyOrderMenuSubtitle'),
              to: '/wallet/buy',
              icon: IconBuyOrder,
            },
            {
              title: this.$t('htmlCreateSellOrder'),
              subTitle: this.$t('createSellOrderMenuSubtitle'),
              to: '/wallet/sell',
              icon: IconSellOrder,
            },
          ],
        },
        {
          name: 'navHolding',
          to: '/holding',
          authCheck: this.$auth.loggedIn,
          subMenu: [
            {
              title: this.$t('currentBalance'),
              subTitle: this.$t('currentBalanceMenuSubtitle'),
              to: '/holding?tab=balance',
              icon: IconBalance,
            },
            {
              title: this.$t('depositHistory'),
              subTitle: this.$t('depositMenuSubtitle'),
              to: '/holding?tab=deposit',
              icon: IconDepositHistory,
            },
            {
              title: this.$t('withdrawHistory'),
              subTitle: this.$t('withdrawMenuSubtitle'),
              to: '/holding?tab=withdraw',
              icon: IconWithdrawHistory,
            },
          ],
        },
        {
          name: 'navTradeHistory',
          to: '/trade-history',
          authCheck: this.$auth.loggedIn,
        },
        {
          name: 'navOpenOrder',
          to: '/open-order',
          authCheck: this.$auth.loggedIn,
        },
      ]
    },
  },
  methods: {
    showSubMenu(menu) {
      this.activeMenu = menu
    },
  },
}
</script>
<style lang="scss" scoped>
.the-navigation > .menu-item {
  border-bottom: 3px solid transparent;
}
.the-navigation > .active {
  border-bottom: 3px solid $--color-primary;
  @apply text-gray-900;
}
.the-navigation > .active > a {
  @apply text-primary;
}
</style>
