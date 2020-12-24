<template>
  <div class="p-8">
    <div class="pb-1">
      <div class="text-sm text-subtitle">{{ $t('email-me-when') }}</div>
    </div>
    <div>
      <div class="mb-2">
        <el-checkbox
          v-model="model.buy_or_sell_notification"
          :disabled="isDisabled"
        >
          <span
            class="text-body"
            :class="{ 'font-bold': model.buy_or_sell_notification }"
          >
            {{ $t('i-send-or-received-digital-curency') }}
          </span>
        </el-checkbox>
      </div>
      <div class="mb-2">
        <el-checkbox
          v-model="model.receive_order_notification"
          :disabled="isDisabled"
        >
          <span
            class="text-body"
            :class="{ 'font-bold': model.receive_order_notification }"
          >
            {{ $t('i-received-merchant-orders') }}
          </span>
        </el-checkbox>
      </div>
      <div class="mb-2">
        <el-checkbox :value="true" :disabled="isDisabled">
          <span class="text-body font-bold">
            {{ $t('there-are-recomended-actions-in-my-account') }}
          </span>
        </el-checkbox>
      </div>
    </div>
    <div class="mt-4">
      <el-button
        type="primary"
        :loading="loading"
        class="px-8"
        @click="updateSetting"
      >
        {{ $t('Save') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Notification',
  fetch() {
    this.loadSettings()
  },
  data() {
    return {
      loading: false,
      model: {
        buy_or_sell_notification: false,
        receive_order_notification: false,
      },
    }
  },
  computed: {
    isDisabled() {
      return this.$fetchState.pending || this.loading
    },
  },
  methods: {
    ...mapActions({
      getSettings: 'setting/getSettings',
      changeSetting: 'setting/changeSetting',
    }),
    async loadSettings() {
      const setting = await this.getSettings()

      this.model.buy_or_sell_notification = setting.buy_or_sell_notification
      this.model.receive_order_notification = setting.receive_order_notification
    },
    async updateSetting() {
      this.$notify.closeAll()

      try {
        this.loading = true

        const model = this.formatModel()

        await this.changeSetting(model)
        this.$notify({
          title: this.$t('settingNotificationSuccessful'),
          type: 'success',
        })
      } catch (e) {
        this.$notify({
          title: this.$t('settingNotificationFailure'),
          message: this.$t('pleaseTryAgain'),
          type: 'error',
        })
      } finally {
        this.loading = false
      }
    },
    formatModel() {
      return {
        buy_or_sell_notification: Number(this.model.buy_or_sell_notification),
        receive_order_notification: Number(
          this.model.receive_order_notification
        ),
      }
    },
  },
}
</script>

<style scoped></style>
