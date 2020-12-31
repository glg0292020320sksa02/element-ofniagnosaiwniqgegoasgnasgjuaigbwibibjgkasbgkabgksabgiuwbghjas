<template>
  <div class="relative">
    <canvas ref="canvas"></canvas>

    <el-button
      v-if="download"
      class="button-fab absolute font-bold button-download"
      :class="position"
      icon="el-icon-download"
      size="mini"
      circle
      @click="onDownload"
    ></el-button>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import QRCode from 'qrcode'

export default defineComponent({
  name: 'QrCode',
  props: {
    value: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 200,
    },
    errorCorrectionLevel: {
      type: String,
      default: 'H',
    },
    color: {
      type: Object,
      default: () => ({
        dark: '#000000',
        light: '#ffffff',
      }),
    },
    download: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'bottom-right',
    },
  },
  data() {
    return {
      base64: '',
    }
  },
  watch: {
    value: 'genCanvas',
  },
  mounted() {
    this.genCanvas()
  },
  methods: {
    async genCanvas() {
      const canvas = this.$refs.canvas
      const options = {
        width: this.size,
        errorCorrectionLevel: this.errorCorrectionLevel,
        color: this.color,
      }

      this.base64 = await QRCode.toDataURL(canvas, this.value, options)
    },
    onDownload() {
      const a = document.createElement('a')
      const email = this.$auth.user?.email || ''

      a.href = this.base64
      a.download = `Qr_code_${email}.png`
      a.click()
    },
  },
})
</script>

<style scoped>
.bottom-right {
  bottom: 6px;
  right: -20px;
}
.bottom-left {
  bottom: 6px;
  left: -20px;
}
.top-right {
  top: 6px;
  right: -20px;
}
.top-left {
  top: 6px;
  left: -20px;
}
</style>
