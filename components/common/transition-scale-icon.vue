<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TransitionScaleIcon',
  functional: true,
  render(createElement, context) {
    const props = {
      name: 'scale-icon',
      mode: 'out-in',
    }

    return createElement('transition', { props }, context.children)
  },
})
</script>

<style lang="scss">
.scale-icon-enter-active,
.scale-icon-leave-active {
  transition: 60ms;
}
.scale-icon-enter,
.scale-icon-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
</style>
