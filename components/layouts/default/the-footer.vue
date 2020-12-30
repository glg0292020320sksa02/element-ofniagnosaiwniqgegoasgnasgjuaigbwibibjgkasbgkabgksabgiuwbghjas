<template>
  <footer class="the-footer text-xs pt-6 text-white bg-primary">
    <div class="container mx-auto">
      <div class="top-footer flex flex-row justify-between items-start py-6">
        <div>
          <the-logo class="text-white text-3xl"></the-logo>
          <p class="text-white">
            Digital platform for exchange crypto currency
          </p>
          <ul class="mt-4">
            <li class="flex flex-row justify-start items-center mb-1">
              <icon-email class="h-3 w-3 mr-1"></icon-email>
              support@cta.com
            </li>
            <li class="flex flex-row justify-start items-center mb-1">
              <icon-address class="h-3 w-3 mr-1"></icon-address>
              No 102, Gate-3, Singapore
            </li>
          </ul>
        </div>
        <div
          v-for="(menu, index) in menus"
          :key="index + '_footermenu'"
          class="menu flex flex-col justify-start items-stretch"
        >
          <strong class="uppercase text-white">{{ menu.title }}</strong>
          <nuxt-link
            v-for="(sub, indexSub) in menu.subMenu"
            :key="indexSub + '_submenu'"
            :to="sub.to"
            class="py-1 hover:text-gray-300"
          >
            {{ sub.name }}
          </nuxt-link>
        </div>
        <div class="language flex flex-col justify-end items-stretch">
          <el-button
            type="primary"
            size="small"
            class="m-0 mb-2 w-32 text-primary bg-indigo-100"
            @click="changeLocales"
          >
            {{ $i18n.locale === 'en' ? 'English' : 'Tiếng việt' }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            class="m-0 mb-2 w-32 text-primary bg-indigo-100"
          >
            VND
          </el-button>
        </div>
      </div>
      <div
        class="bottom-footer flex flex-row justify-between items-center py-6 border-t border-indigo-400 border-opacity-80"
      >
        <div class="bottom-left">
          <span class="text-xs">© 2020 by CoinToATM</span>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import TheLogo from '@/components/layouts/default/the-logo'
import IconEmail from '@/components/ui/icon/icon-email'
import IconAddress from '@/components/ui/icon/icon-address'

export default {
  name: 'TheFooter',
  components: {
    TheLogo,
    IconEmail,
    IconAddress,
  },
  data() {
    return {
      socials: [
        { name: 'facebook', image: 'social-facebook.png', link: '/' },
        { name: 'skype', image: 'social-skype.png', link: '/' },
      ],
      menus: [
        {
          title: 'Solution',
          subMenu: [
            {
              name: 'Buy',
              to: '/wallet/buy',
            },
            {
              name: 'Sell',
              to: '/wallet/sell',
            },
            {
              name: 'Exchange',
              to: '/exchange',
            },
            {
              name: 'Deposit',
              to: '/wallet/deposit',
            },
            {
              name: 'Withdraw',
              to: '/wallet/withdraw',
            },
          ],
        },
        {
          title: 'Company',
          subMenu: [
            {
              name: 'About us',
              to: '/about/about-us',
            },
            {
              name: 'Contact us',
              to: '/about/contact',
            },
            {
              name: 'Help',
              to: '/about/help',
            },
          ],
        },
        {
          title: 'Legal',
          subMenu: [
            {
              name: 'Term of use',
              to: '/policy/term-of-use',
            },
            {
              name: 'Privacy policy',
              to: '/policy/privacy-policy',
            },
            {
              name: 'Cookies policy',
              to: '/policy/cookies-policy',
            },
          ],
        },
      ],
    }
  },
  methods: {
    changeLocales() {
      if (this.$i18n.locale === 'en') {
        this.$i18n.setLocale('vi')
      } else this.$i18n.setLocale('en')
    },
  },
}
</script>
