<template>
  <div class="container flex justify-center items-center min-h-screen">
    <div
      class="w-full md:w-3/5 xl:w-1/3 rounded-lg shadow-lg bg-white overflow-hidden"
    >
      <div class="flex flex-row justify-start items-start p-6 py-8">
        <div
          class="rounded-full w-12 h-12 bg-red-100 flex justify-center items-center"
        >
          <icon-error class="h-8 w-8 text-error"></icon-error>
        </div>
        <div class="flex flex-col justify-start items-start ml-2">
          <strong class="text-base">{{ error.statusCode }}</strong>
          <p class="m-0 text-sm text-subtitle">{{ error.message }}</p>
        </div>
      </div>
      <div class="p-6 py-4 bg-gray-100 flex justify-end">
        <nuxt-link to="/" class="px-3 py-2 text-white bg-error rounded text-xs">
          {{ $t('backToHomePage') }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import IconError from '@/components/ui/icon/icon-error'
export default {
  components: {
    IconError,
  },
  props: {
    error: {
      type: [Object, Array],
      default() {
        return {}
      },
    },
  },
  layout: 'simple',
}
</script>
