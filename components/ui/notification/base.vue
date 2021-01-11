<template>
  <div
    v-if="visible"
    class="z-50 min-h-screen fixed top-0 left-0 right-0 bottom-0 overflow-hidden"
  >
    <div class="notify-mask bg-primary w-full h-full absolute"></div>
    <div class="notify-form bg-white rounded-lg shadow-lg">
      <el-button
        circle
        icon="el-icon-close"
        class="button-fab font-bold button-close"
        size="medium"
        @click="close"
      ></el-button>
      <div class="flex justify-center">
        <svg-icon :name="type" size="100"></svg-icon>
      </div>
      <div class="mt-10 text-center">
        <div class="font-black text-base">{{ title }}</div>
        <div class="text-subtitle text-sm" v-html="subtitle"></div>
      </div>
      <div class="mt-16">
        <el-button
          type="primary"
          class="w-full"
          :loading="loading"
          @click="confirm"
        >
          <span v-if="loading && loadingText">{{ loadingText }}</span>
          <span v-else>{{ submitText }}</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
const DEFAULT_TIMEOUT = -1

export default {
  name: 'Base',
  props: {
    type: {
      type: String,
      default: 'success',
      validator: value => {
        return ['success', 'error', 'warning'].includes(value)
      },
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    loadingText: {
      type: String,
      default: '',
      // example: Đang gửi lại mã xác minh
    },
    // eslint-disable-next-line vue/require-default-prop
    actionMethod: {
      type: Function,
      // example: A Promise or a callback function.
    },
    actionText: {
      type: String,
      default() {
        return this.$t('confirm')
      },
      // example: Gửi lại mã xác minh
    },
    timeoutText: {
      type: String,
      default: '',
      // example: 'notify.systemAutoRedirectHomePage'
      // -> Render code: this.$t('notify.systemAutoRedirectHomePage', { time: `${this.time}s` })
      // -> Render text: Hệ thống chuyển về trang chủ trong 3s
    },
    timeout: {
      type: Number,
      default: DEFAULT_TIMEOUT,
      // example: 3000
    },
  },
  data() {
    return {
      visible: false,
      loading: false,
      time: this.timeout / 1000,
    }
  },
  computed: {
    submitText() {
      return this.timeout === DEFAULT_TIMEOUT
        ? this.actionText
        : this.$t(this.timeoutText, { time: `${this.time}s` })
    },
  },
  mounted() {
    this.handleTimeout()
  },
  methods: {
    handleTimeout() {
      if (this.timeout === DEFAULT_TIMEOUT) return

      setTimeout(() => {
        if (this.actionMethod) this.actionMethod()

        this.close()
      }, this.timeout)
      this.interval = setInterval(() => {
        if (this.timeoutText <= 0) {
          return clearInterval(this.interval)
        }

        this.timeoutText -= 1
      }, 1000)
    },
    async confirm() {
      if (this.actionMethod) {
        this.loading = true
        await this.actionMethod()
        this.loading = false
      }

      this.close()
    },
    close() {
      this.visible = false
    },
  },
}
</script>

<style scoped lang="scss">
.notify-mask {
  // background: rgb(17, 51, 83);
  @apply bg-primary;
}
.notify-form {
  width: 400px;
  height: 500px;
  padding: 100px 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.button-close {
  position: absolute;
  top: 12px;
  right: 12px;
}
</style>
