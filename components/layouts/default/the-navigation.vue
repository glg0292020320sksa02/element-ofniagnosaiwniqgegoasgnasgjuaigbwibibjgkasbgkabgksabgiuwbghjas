<template>
  <div
    class="the-navigation text-sm text-gray-900 flex justify-start items-baseline"
  >
    <div
      v-for="(menu, index) in menus"
      :key="index + 'menu'"
      class="menu-item p-1"
      :class="{ active: activeRouter.includes(menu.to) }"
    >
      <nuxt-link
        v-if="menu.authCheck"
        :to="menu.to"
        class="p-4 px-2 inline-block hover:text-primary"
      >
        {{ $t(menu.name) }}
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TheNavigation',
  computed: {
    activeRouter() {
      return this.$route.path
    },
    menus() {
      return [
        {
          name: 'navBuySell',
          to: '/buy-sell',
          authCheck: true,
        },
        {
          name: 'navPostOfTrade',
          to: '/wallet/buy',
          authCheck: true,
        },
        {
          name: 'navAffiliate',
          to: '/affiliate',
          authCheck: this.$auth.loggedIn,
        },
        {
          name: 'navHolding',
          to: '/holding',
          authCheck: this.$auth.loggedIn,
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
