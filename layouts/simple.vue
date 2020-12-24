<template>
  <div class="layout-default">
    <the-header class="the-header"></the-header>
    <div class="bg-gray-200 min-h-screen">
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
}
</script>
