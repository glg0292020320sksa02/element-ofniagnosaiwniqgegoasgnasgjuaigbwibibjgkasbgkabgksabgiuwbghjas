<template>
  <div
    class="absolute bg-transparent pt-12 top-0 left-0"
    @mouseleave="$emit('over')"
  >
    <div
      class="z-10 -ml-4 mt-6 transform px-2 max-w-md w-screen sm:px-0 lg:ml-0 lg:left-0"
    >
      <div
        class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
      >
        <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
          <nuxt-link
            v-for="(item, index) in data"
            :key="index + 'the_menu'"
            :to="item.to"
            href="#"
            class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-100"
          >
            <!-- Heroicon name: chart-bar -->
            <component
              :is="item.icon"
              class="flex-shrink-0 h-6 w-6 text-primary"
            ></component>

            <div class="ml-4">
              <p
                class="text-sm font-medium text-gray-900"
                v-html="item.title"
              ></p>
              <p
                class="p-0 text-xs font-normal text-gray-700 whitespace-normal"
              >
                {{ item.subTitle }}
              </p>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TheMenu',
  props: {
    data: {
      type: [Object, Array],
      required: true,
    },
  },
}
</script>
