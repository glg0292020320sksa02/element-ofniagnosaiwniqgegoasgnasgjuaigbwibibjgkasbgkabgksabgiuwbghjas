<template>
  <div class="nuxt-link-tabs">
    <slot></slot>
    <div class="slider-wrapper" :style="styleSlider"></div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
const SLIDER_DEFAULT = { width: '0px', left: '-100px' }

export default defineComponent({
  name: 'NuxtLinkTabs',
  data() {
    return {
      styleSlider: SLIDER_DEFAULT,
    }
  },
  computed: {
    nodeChildren() {
      const slotDefault = this.$scopedSlots.default

      if (!slotDefault) return undefined

      return slotDefault({})
    },
  },
  watch: {
    $route: {
      handler() {
        setTimeout(() => {
          this.callSlider()
        })
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    hasChildrenActive() {
      if (!this.nodeChildren) return false

      return this.nodeChildren.some(children => {
        if (!children || !children.tag) return false

        const element = children.elm

        return element.classList.contains('nuxt-link-exact-active')
      })
    },
    callSlider() {
      if (process.server) return

      const activeLink = document.querySelector('.nuxt-link-exact-active')

      if (!this.hasChildrenActive() || !activeLink) {
        this.styleSlider = { width: '0px', left: '0px' }
      } else {
        const width = `${activeLink.clientWidth}px`
        const left = `${activeLink.offsetLeft}px`

        this.styleSlider = { width, left }
      }
    },
  },
})
</script>

<style scoped lang="scss">
.nuxt-link-tabs {
  position: relative;
  display: flex;
  justify-content: flex-start;
}
.slider-wrapper {
  @apply bg-primary;

  position: absolute;
  bottom: 0;
  height: 2px;
  transition: left 0.3s;
}
</style>
