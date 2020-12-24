<template>
  <div class="change-password flex justify-start items-center">
    <div
      circle
      disabled
      class="w-16 h-16 rounded-full bg-blue-100 flex justify-center items-center"
    >
      <svg-icon name="key" size="18" class="text-primary"></svg-icon>
    </div>
    <div class="ml-2">
      <div class="text-body font-bold">{{ $t('changePassword') }}</div>
      <div class="text-xs">
        {{ $t('enable-2fa-in') }}
        <nuxt-link class="text-primary" to="/setting/security">
          {{ $t('security-tab') }}
        </nuxt-link>
      </div>
    </div>
    <div class="ml-8">
      <el-button @click="onChangePassword">
        <span class="font-bold">{{ $t('changePassword') }}</span>
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ChangePassword',
  computed: {
    ...mapGetters(['isEnable2FA']),
  },
  methods: {
    onChangePassword() {
      if (this.isEnable2FA) {
        return this.$router.push({ name: 'auth-change-password' })
      }

      return this.$router.push({ name: 'auth-enable-2fa' })
    },
  },
}
</script>

<style scoped>
.button-key {
  @apply cursor-text bg-disabled !important;
}
</style>
