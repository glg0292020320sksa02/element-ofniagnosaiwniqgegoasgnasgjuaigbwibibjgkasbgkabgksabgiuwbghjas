<template>
  <div class="layout-auth">
    <the-header class="the-header"></the-header>
    <div
      class="bg-gray-200 min-h-screen layout-body"
      :style="genStyleContainer"
    >
      <div class="body-content">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/layouts/auth/the-header'
const HEADER_HEIGHT_DEFAULT = 100

export default {
  name: 'LayoutAuth',
  components: { TheHeader },
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
  margin-top: 4rem;
}
</style>
