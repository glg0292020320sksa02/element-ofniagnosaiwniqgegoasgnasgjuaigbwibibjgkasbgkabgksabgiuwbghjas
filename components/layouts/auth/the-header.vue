<template>
  <header
    class="fixed top-0 w-full bg-white z-50 shadow font-bold whitespace-no-wrap py-3"
  >
    <div class="container">
      <div class="flex justify-between items-center">
        <div class="flex justify-start items-center">
          <button-home></button-home>
        </div>

        <client-only>
          <div class="flex items-center justify-end">
            <div v-if="$auth.loggedIn" class="flex items-center space-x-4">
              <popover-setting></popover-setting>
            </div>
            <div v-else class="flex items-center space-x-8">
              <el-button
                type="text"
                @click="$router.push({ name: 'auth-login' })"
              >
                {{ $t('signin') }}
              </el-button>
              <el-button
                type="primary"
                size="small"
                class="text-sm py-2"
                @click="$router.push({ name: 'auth-register' })"
              >
                {{ $t('register') }}
              </el-button>
            </div>
            <button class="locale-btn ml-4" @click="changeLocales">
              <img
                :src="require('~/assets/images/' + currentLocale.img)"
                alt=""
              />
            </button>
          </div>
        </client-only>
      </div>
    </div>
  </header>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

import PopoverSetting from '@/components/layouts/default/popover-setting.vue'
import ButtonHome from '@/components/pages/auth/button-home.vue'

export default defineComponent({
  name: 'TheHeader',
  components: { PopoverSetting, ButtonHome },
  computed: {
    currentLocale() {
      return this.$i18n.locale === 'en'
        ? {
            name: 'English',
            img: 'locale-english.png',
          }
        : {
            name: 'Tiếng Việt',
            img: 'locale-vietnamese.png',
          }
    },
  },
  methods: {
    changeLocales() {
      if (this.$i18n.locale === 'en') {
        this.$i18n.setLocale('vi')
      } else this.$i18n.setLocale('en')
    },
  },
})
</script>

<style lang="scss">
.logo {
  @apply cursor-pointer;
}

.dashboard-group {
  display: flex;
  font-size: 12px;
  line-height: 14px;

  button {
    @apply bg-white text-primary border border-primary border-solid;

    box-sizing: border-box;
    padding: 10px 30px;
    font-weight: bold;
  }

  .button-buy {
    @apply rounded-l;
  }
  .button-sell {
    @apply rounded-r border-l-0;
  }
}

.button-notification,
.button-user {
  padding: 10px !important;
}
.button-user {
  border: none;
}
.popover-setting {
  padding: 0 !important;
}
</style>
