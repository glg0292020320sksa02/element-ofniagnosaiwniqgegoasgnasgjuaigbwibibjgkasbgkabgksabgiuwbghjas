<template>
  <span
    class="text-primary cursor-pointer text-sm hover:underline"
    :class="{ 'text-disabled cursor-wait': disabled }"
    @click="handleRemoveAllToken"
  >
    {{ $t('sign-out-all-other-sessions') }}
  </span>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RemoveAllToken',
  data() {
    return {
      disabled: false,
    }
  },
  methods: {
    ...mapActions({
      removeAllToken: 'setting/removeAllToken',
    }),
    async handleRemoveAllToken() {
      if (this.disabled) return

      this.$notify.closeAll()

      try {
        this.disabled = true
        await this.removeAllToken()

        this.$notify({
          title: this.$t('removeAllTokenSuccessful'),
          type: 'success',
        })

        this.$emit('success')
      } catch (e) {
        this.$notify({
          title: this.$t('removeAllTokenFailure'),
          message: this.$t('pleaseTryAgain'),
          type: 'error',
        })
      } finally {
        this.disabled = false
      }
    },
  },
}
</script>
