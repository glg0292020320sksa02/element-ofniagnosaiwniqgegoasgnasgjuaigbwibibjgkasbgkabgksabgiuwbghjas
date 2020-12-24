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
  </div>
</template>

<script>
import Pusher from 'pusher-js'

import TheHeader from '@/components/layouts/default/the-header'
import TheFooter from '@/components/layouts/default/the-footer'

const HEADER_HEIGHT_DEFAULT = 100

export default {
  name: 'LayoutDefault',
  components: {
    TheHeader,
    TheFooter,
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
.layout-body {
  position: relative;
  z-index: 1;
}
.layout-body::before {
  content: ' ';
  height: 400px;
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  background-color: #0052cc;
  z-index: 0;
}
.body-content {
  position: relative;
  z-index: 1;
  margin-top: 5rem;
}
</style>
