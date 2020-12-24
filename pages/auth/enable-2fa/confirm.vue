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
            <el-input
              v-model="model.secret"
              :placeholder="$t('confirmSecretKey')"
            ></el-input>
          </el-form-item>

          <el-form-item prop="2fa_code">
            <el-input
              ref="2fa_code"
              v-model="model['2fa_code']"
              :placeholder="$t('6DigitaFromGoogleAuthentication')"
            ></el-input>
          </el-form-item>

          <div class="mt-12">
            <el-button
              :loading="loading"
              type="primary"
              native-type="submit"
              class="w-full"
            >
              <span class="font-bold">{{ $t('confirm') }}</span>
            </el-button>
          </div>

          <div class="my-8"></div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import validateForm from '@/mixins/validate-form'
import { twoFACode } from '@/utils/form-rules'

export default {
  name: 'AuthEnable2FA',
  layout: 'auth',
  mixins: [validateForm],
  data() {
    const twoFACodeRule = twoFACode.bind(this)()

    return {
      loading: false,
      model: {
        '2fa_code': '',
        secret: '',
      },
      rules: {
        '2fa_code': [twoFACodeRule.required],
      },
    }
  },
  methods: {
    ...mapActions({
      enable2fa: 'authentications/enable2fa',
    }),
    async onSubmit() {
      const isValid = await this.validate()

      if (!isValid) return

      try {
        this.loading = true
        await this.enable2fa(this.model)
        await this.$auth.fetchUser()
        await this.$success({
          title: this.$t('active2faSuccessful'),
          subtitle: this.$t('alwayTurnOn2fa'),
          actionMethod: () => this.$router.push({ name: 'setting-security' }),
        })
      } catch (e) {
        this.$notify.closeAll()

        this.$notify({
          type: 'error',
          title: this.$t('active2faFailure'),
          message: this.$t('pleaseCheckYour2faCode'),
        })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
