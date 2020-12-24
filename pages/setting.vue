<template>
  <div class="setting container py-10">
    <div class="bg-white rounded-lg shadow-lg">
      <nuxt-link-tabs class="border-b px-4 pt-6">
        <nuxt-link
          v-for="(tab, index) in tabs"
          :key="'tab_' + index"
          :to="tab.to"
          class="p-4 text-sm"
        >
          <div class="relative">
            <span>{{ $t(tab.name) }}</span>
            <i
              v-if="tab.notification && !isEnable2FA"
              class="notification el-icon-warning text-red-600"
            ></i>
          </div>
        </nuxt-link>
      </nuxt-link-tabs>
      <div class="py-4">
        <nuxt-child></nuxt-child>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NuxtLinkTabs from '@/components/common/nuxt-link-tabs'
export default {
  name: 'Setting',
  components: { NuxtLinkTabs },
  data() {
    return {
      tabs: [
        { name: 'profile', to: { name: 'setting-profile' } },
        { name: 'emailNotification', to: { name: 'setting-notification' } },
        { name: 'activity', to: { name: 'setting-activity' } },
        {
          name: 'security',
          to: { name: 'setting-security' },
          notification: true,
        },
        { name: 'paymentMethod', to: { name: 'setting-bank' } },
      ],
    }
  },
  computed: {
    ...mapGetters(['isEnable2FA']),
  },
}
</script>

<style scoped lang="scss">
.notification {
  position: absolute;
  top: 0;
  right: -15px;
}
</style>
