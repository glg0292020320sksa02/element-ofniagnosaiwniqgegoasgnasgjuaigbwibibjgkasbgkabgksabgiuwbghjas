<template>
  <div class="fixed the-support">
    <div class="relative inline-block text-left">
      <div>
        <button
          type="button"
          class="flex justify-center items-center w-12 h-12 rounded-full shadow-sm bg-primary text-xs font-medium text-white border-2 border-primary-100 hover:bg-primary focus:outline-none"
          aria-haspopup="true"
          aria-expanded="true"
          @click="showMenu = !showMenu"
        >
          <icon-support class="h-6 w-6 text-white"></icon-support>
        </button>
      </div>
      <div
        v-if="showMenu"
        class="origin-top-right border border-gray-200 absolute mt-2 w-56 rounded-lg shadow-lg bg-white p-2"
      >
        <div
          class="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          @click="showMenu = false"
        >
          <a
            href="https://t.me/c2a"
            target="_blank"
            class="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-200 hover:text-primary"
            role="menuitem"
          >
            Telegram
          </a>
          <a
            href="skype:c2a?chat"
            target="_blank"
            class="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-200 hover:text-primary"
            role="menuitem"
          >
            Skype
          </a>
          <a
            href="https://www.messenger.com/t/c2a"
            target="_blank"
            class="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-200 hover:text-primary"
            role="menuitem"
          >
            Messenger
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconSupport from '@/components/ui/icon/icon-support'
export default {
  name: 'TheSupport',
  components: {
    IconSupport,
  },
  data() {
    return {
      showMenu: false,
    }
  },
}
</script>
<style scoped>
.the-support {
  bottom: 1rem;
  right: 1rem;
  z-index: 100;
}
.origin-top-right {
  bottom: 50px;
  right: 0;
}
</style>
