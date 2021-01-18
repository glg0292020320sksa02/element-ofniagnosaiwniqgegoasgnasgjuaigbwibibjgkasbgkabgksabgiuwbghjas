<template>
  <div class="layout-default">
    <the-header class="the-header"></the-header>
    <div
      class="bg-gray-200 min-h-screen layout-body"
      :style="genStyleContainer"
    >
      <div class="body-content">
        <nuxt />
      </div>
    </div>
    <the-footer></the-footer>
    <the-support></the-support>
  </div>
</template>

<script>
import Pusher from 'pusher-js'

import TheHeader from '@/components/layouts/default/the-header'
import TheFooter from '@/components/layouts/default/the-footer'
import TheSupport from '@/components/layouts/default/the-support'

const HEADER_HEIGHT_DEFAULT = 100

export default {
  name: 'LayoutDefault',
  components: {
    TheHeader,
    TheFooter,
    TheSupport,
  },
  data() {
    return {
      headerHeight: HEADER_HEIGHT_DEFAULT,
    }
  },
  computed: {
    genStyleContainer() {
      return { paddingTop: `${this.headerHeight}px` }
    },
  },
  created() {
    this.subscribe()
  },
  mounted() {
    this.getHeaderHeight()
  },
  methods: {
    getHeaderHeight() {
      const header = document.querySelector('.the-header')

      this.headerHeight = header ? header.clientHeight : HEADER_HEIGHT_DEFAULT
    },

    subscribe() {
      const pusher = new Pusher('742d2b238a8ae1a8100d', {
        cluster: 'ap1',
        encrypted: true,
      })

      const channel = pusher.subscribe('ALL_USERS')

      channel.bind('my-event', data => {
        this.$notify.closeAll()

        this.$notify({
          title: data.title,
          message: data.message,
          type: data.type || 'info',
        })
      })
    },
  },
}
</script>
<style scoped>
.layout-default {
  font-family: 'Inter', sans-serif;
}
.layout-body {
  position: relative;
  z-index: 1;
  background-color: #f9f9fa;
}
.layout-body::before {
  content: ' ';
  height: 400px;
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  background-color: #0052cc;
  background-image: url('../assets/images/main-background.svg');
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 0;
}
.body-content {
  position: relative;
  z-index: 1;
  margin-top: 3rem;
}
</style>
