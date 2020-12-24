<template>
  <div class="container flex justify-center items-start min-h-screen">
    <div class="w-full md:w-3/5 xl:w-1/3">
      <el-card shadow="never" class="p-3">
        <div
          class="card-header mb-12 flex flex-col justify-center align-middle text-center"
        >
          <strong class="text-3xl">{{ $t('enable2FATitle') }}</strong>
          <p class="text-subtitle text-sm">{{ $t('enable2FASubTitle') }}</p>
        </div>
        <el-form
          ref="form"
          :model="model"
          :rules="rules"
          label-position="top"
          label-width="120px"
          hide-required-asterisk
          class="form-google"
          @submit.native.prevent="onSubmit"
        >
          <el-form-item>
            <div class="flex justify-center">
              <qr-code
                v-if="$fetchState.pending"
                value="QR Code Content loader - XXXXXXXXXXXXXXXXX"
                :color="{ dark: '#929292', light: '#ffffff' }"
              ></qr-code>
              <qr-code v-else :value="qrLink" download></qr-code>
            </div>
          </el-form-item>

          <el-form-item :label="$t('notice2FALabel')">
            <el-input v-model="secretKey" readonly>
              <el-button
                slot="suffix"
                v-clipboard="secretKey"
                class="button-fab font-bold"
                size="mini"
                circle
              >
                <transition-scale-icon>
                  <i
                    v-if="isClipboardSelection"
                    key="icon-check"
                    class="el-icon-check"
                  ></i>
                  <i v-else key="icon-copy" class="el-icon-copy-document"></i>
                </transition-scale-icon>
              </el-button>
            </el-input>
          </el-form-item>

          <div class="mt-12">
            <el-button
              :loading="loading"
              type="primary"
              native-type="submit"
              class="w-full"
            >
              <span class="font-bold">{{ $t('next') }}</span>
            </el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { clipboard } from 'vue-clipboards'

import QrCode from '@/components/common/qr-code'
import TransitionScaleIcon from '@/components/common/transition-scale-icon'

import clipboardSelection from '@/mixins/clipboard-selection'
import validateForm from '@/mixins/validate-form'
import { twoFACode } from '@/utils/form-rules'

export default {
  name: 'AuthEnable2FA',
  layout: 'auth',
  directives: { clipboard },
  components: {
    QrCode,
    TransitionScaleIcon,
  },
  mixins: [validateForm, clipboardSelection],
  async fetch() {
    const { data } = await this.generate2fa()

    this.secretKey = data.google2fa_secret
  },
  data() {
    const twoFACodeRule = twoFACode.bind(this)()

    return {
      loading: false,
      secretKey: 'XXXXXXXXXXXXXXXXX',
      model: {
        '2fa_code': '',
      },
      rules: {
        '2fa_code': [twoFACodeRule.required],
      },
    }
  },
  computed: {
    userEmail() {
      return this.$auth.user?.email || ''
    },
    qrLink() {
      const link = 'otpauth://totp/{{NAME}}?secret={{KEY}}&issuer={{ISSUER}}'
      const issuer = 'C2A'
      const name = `${issuer}:${this.userEmail}`

      return link
        .replace(/{{NAME}}/g, name)
        .replace(/{{KEY}}/g, this.secretKey)
        .replace(/{{ISSUER}}/g, issuer)
    },
    isClipboardSelection() {
      return this.secretKey === this.clipboardSelection
    },
  },
  methods: {
    ...mapActions({
      enable2fa: 'authentications/enable2fa',
      generate2fa: 'authentications/generate2fa',
    }),
    onSubmit() {
      this.$router.push('/auth/enable-2fa/confirm')
    },
  },
}
</script>

<style lang="scss"></style>
