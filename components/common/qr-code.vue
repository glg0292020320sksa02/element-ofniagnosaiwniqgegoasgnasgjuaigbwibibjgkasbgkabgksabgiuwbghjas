<template>
  <div class="relative">
    <canvas ref="canvas"></canvas>

    <el-button
      v-if="download"
      class="button-fab font-bold button-download"
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
.button-download {
  position: absolute;
  bottom: 12px;
  right: -20px;
}
</style>
