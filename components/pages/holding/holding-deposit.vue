<template>
  <div class="exchange-sell text-sm">
    <div v-if="$auth.loggedIn" class="flex flex-col justify-center items-end">
      <div class="flex flex-col items-center justify-center mb-2">
        <qr-code
          v-if="!qrLink"
          value="QR Code Content loader - XXXXXXXXXXXXXXXXX"
          :size="120"
        ></qr-code>
        <qr-code
          v-else
          :value="qrLink"
          download
          position="bottom-left"
          :size="100"
        ></qr-code>
      </div>
      <div>
        <span>{{ selectedWallets.address }}</span>
        <el-button
          v-clipboard="selectedWallets.address"
          class="button-fab font-bold"
          size="mini"
          circle
        >
          <transition-scale-icon>
            <i
              v-if="isClipboardSelection(selectedWallets)"
              key="icon-check"
              class="el-icon-check"
            ></i>
            <i v-else key="icon-copy" class="el-icon-copy-document"></i>
          </transition-scale-icon>
        </el-button>
      </div>
    </div>
    <div v-else>
      <button
        class="rounded px-4 py-2 text-primary text-xs bg-primary-50 flex flex-nowrap"
        @click="redirectToLogin"
      >
        Bạn cần đăng nhập trước khi bán
        <icon-arrow-right class="w-4 h-4 ml-1"></icon-arrow-right>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import clipboardSelection from '@/mixins/clipboard-selection'
import { clipboard } from 'vue-clipboards'

import TransitionScaleIcon from '@/components/common/transition-scale-icon'
import IconArrowRight from '@/components/ui/icon/icon-arrow-right'
import QrCode from '@/components/common/qr-code'

export default {
  name: 'HoldingDeposit',
  components: {
    QrCode,
    IconArrowRight,
    TransitionScaleIcon,
  },
  directives: { clipboard },
  mixins: [clipboardSelection],
  computed: {
    ...mapGetters({
      selectedWallets: 'wallet/selectedWallets',
    }),
    qrLink() {
      const link = 'otpauth://totp/{{NAME}}?secret={{KEY}}&issuer={{ISSUER}}'
      const issuer = 'C2A'
      const name = `${issuer}:${this.selectedWallets.address}`

      return link
        .replace(/{{NAME}}/g, name)
        .replace(/{{KEY}}/g, this.secretKey)
        .replace(/{{ISSUER}}/g, issuer)
    },
  },
  methods: {
    isClipboardSelection({ address }) {
      return address === this.clipboardSelection
    },
  },
}
</script>
