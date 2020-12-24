<template>
  <el-button
    class="delete-bank-account text-xs uppercase"
    type="text"
    :loading="loading"
    @click="removeBankAccount"
  >
    {{ $t('remove') }}
  </el-button>
</template>

<script>
import { mapActions } from 'vuex'
import ElMessageBox from 'element-ui/lib/message-box'

export default {
  name: 'DeleteBankAccount',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    ...mapActions({
      deleteBankAccountNumber: 'bank/deleteBankAccountNumber',
    }),
    async removeBankAccount() {
      this.$notify.closeAll()

      const isConfirm = await this.confirmRemoveBankAccount()

      if (!isConfirm) return

      try {
        this.loading = true

        await this.deleteBankAccountNumber(this.id)

        this.$notify({
          title: this.$t('remove-account-successful'),
          type: 'success',
        })

        this.$emit('success')
      } catch (e) {
        this.$notify({
          title: this.$t('remove-account-failure'),
          type: 'error',
        })
      } finally {
        this.loading = false
      }
    },
    async confirmRemoveBankAccount() {
      try {
        return await ElMessageBox.confirm(
          this.$t('are-you-sure-delete-bank-account'),
          this.$t('warning'),
          {
            confirmButtonText: this.$t('agree'),
            cancelButtonText: this.$t('cancel'),
            type: 'warning',
          }
        )
      } catch (e) {
        return false
      }
    },
  },
}
</script>

<style lang="scss">
@import '~element-ui/packages/theme-chalk/src/message-box.scss';
</style>
<style scoped>
.delete-bank-account {
  @apply text-error !important;
}
</style>
