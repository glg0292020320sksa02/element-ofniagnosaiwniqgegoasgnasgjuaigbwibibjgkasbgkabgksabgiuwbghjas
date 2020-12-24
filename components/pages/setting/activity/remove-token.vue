<template>
  <el-tooltip :disabled="isRevoked" content="Clear token" placement="bottom">
    <el-button
      :loading="loading"
      :disabled="isRevoked"
      icon="el-icon-close"
      size="mini"
      circle
      @click="handleRemoveToken"
    ></el-button>
  </el-tooltip>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RemoveToken',
  props: {
    id: {
      type: Number,
      default: -1,
    },
    isRevoked: {
      type: Boolean,
      default: false,
    },
    isCurrentSession: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    ...mapActions({
      removeToken: 'setting/removeToken',
    }),
    async handleRemoveToken() {
      this.$notify.closeAll()

      if (this.id === -1 || this.id === undefined) return

      if (this.isCurrentSession) {
        const isConfirm = await this.confirmRemoveCurrentSession()

        if (!isConfirm) return
      }

      try {
        this.loading = true
        await this.removeToken(this.id)

        this.$notify({
          title: this.$t('remove-token-successful'),
          type: 'success',
        })

        if (this.isCurrentSession) {
          this.$auth.logout()
        } else {
          this.$emit('update:is-revoked', true)
        }
      } catch (e) {
        this.$notify({
          title: this.$t('remove-token-failure'),
          message: this.$t('pleaseTryAgain'),
          type: 'error',
        })
      } finally {
        this.loading = false
      }
    },
    async confirmRemoveCurrentSession() {
      try {
        return await this.$confirm(
          this.$t('this-is-your-current-session'),
          this.$t('warning'),
          {
            confirmButtonText: this.$t('agree'),
            cancelButtonText: this.$t('cancel'),
            type: 'warning',
          }
        )
      } catch {
        return false
      }
    },
  },
}
</script>
