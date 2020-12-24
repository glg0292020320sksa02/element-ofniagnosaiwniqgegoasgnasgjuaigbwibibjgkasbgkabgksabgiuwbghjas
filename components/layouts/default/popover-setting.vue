<template>
  <el-popover
    v-model="visible"
    popper-class="popover-setting"
    placement="bottom"
    width="250"
    trigger="click"
  >
    <div slot="reference" class="relative">
      <el-button circle class="button-user text-base text-primary">
        <icon-user class="text-primary text-2xl w-5 h-5"></icon-user>
      </el-button>
      <i class="notification el-icon-warning text-red-600"></i>
    </div>
    <div>
      <div class="px-3 py-4">
        <div class="font-bold">{{ userName }}</div>
        <div class="text-subtitle">{{ userEmail }}</div>
      </div>
      <hr />
      <div class="flex flex-col">
        <div
          v-for="(route, key) in routeList"
          :key="key"
          class="p-3 w-full cursor-pointer hover:bg-gray-100"
        >
          <div
            class="flex justify-between items-center"
            @click="redirect(route.to)"
          >
            <span class="font-bold">
              {{ $t(route.name) }}
            </span>
            <i
              v-if="route.notification"
              class="el-icon-warning text-red-600"
            ></i>
          </div>
        </div>
      </div>
      <hr />
      <div
        class="px-3 py-4 w-full cursor-pointer hover:bg-gray-100"
        @click="onLogout"
      >
        <span class="font-bold text-error">{{ $t('signOut') }}</span>
      </div>
    </div>
  </el-popover>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import IconUser from '@/components/ui/icon/icon-user'
const ROUTES_DEFAULT = [
  {
    name: 'setting',
    to: { name: 'setting-profile' },
    notification: true,
  },
  { name: 'myWallet', to: { name: 'holding' } },
  { name: 'myOrder', to: { name: 'open-order' } },
]

export default defineComponent({
  components: { IconUser },
  name: 'PopoverSetting',
  data() {
    return {
      visible: false,
      routeList: ROUTES_DEFAULT,
    }
  },
  computed: {
    userName() {
      return this.$auth.user?.name || ''
    },
    userEmail() {
      return this.$auth.user?.email || ''
    },
  },
  methods: {
    async onLogout() {
      await this.$auth.logout()
      this.resetStore()
      this.$router.push({ name: 'index' })
    },
    resetStore() {
      this.$store.commit('wallet/SET_WALLET_LIST', [])
    },
    redirect(to) {
      this.$router.push(to)
      this.visible = false
    },
  },
})
</script>

<style scoped>
.notification {
  position: absolute;
  top: 0;
  right: -4px;
}
</style>
