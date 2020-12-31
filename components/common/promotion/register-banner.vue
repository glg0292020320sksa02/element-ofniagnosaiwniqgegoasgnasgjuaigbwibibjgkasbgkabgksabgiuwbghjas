<template>
  <div class="register-banner rounded-lg">
    <div
      class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
    >
      <h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-3xl">
        <span class="block">{{ $t('promotionSignup') }}</span>
        <span class="block text-base font-normal text-gray-200">
          {{ $t('promotionSignupSubtitle') }}
        </span>
      </h2>
      <div class="mt-8 lex lg:mt-0 lg:flex-shrink-0">
        <div class="inline-flex rounded-md shadow">
          <nuxt-link
            to="/auth/register"
            class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-bold rounded-md text-primary bg-white hover:bg-primary-50"
          >
            {{ $t('registerNow') }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RegisterBanner',
}
</script>
<style scoped>
.register-banner {
  background-image: url('../../../assets/images/mainbackground.jpg');
}
</style>
