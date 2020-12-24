<template>
  <div class="p-8">
    <auth-loggings class="bg-gray-100 p-4 rounded-lg"></auth-loggings>

    <account-activity
      class="mt-16 bg-gray-100 p-4 rounded-lg"
    ></account-activity>
  </div>
</template>

<script>
import AuthLoggings from '@/components/pages/setting/activity/auth-loggings'
import AccountActivity from '@/components/pages/setting/activity/account-activity'

export default {
  name: 'SettingActivity',
  components: { AccountActivity, AuthLoggings },
}
</script>

<style scoped></style>
