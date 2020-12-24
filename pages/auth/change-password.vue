<template>
  <div
    class="change-password container flex justify-center items-start min-h-screen"
  >
    <div class="w-full md:w-2/3 xl:w-1/3">
      <el-card class="p-3 rounded-lg shadow-lg">
        <div
          class="card-header mb-12 flex flex-col justify-center align-middle text-center"
        >
          <strong class="text-3xl">{{ $t('changePasswordTitle') }}</strong>
          <p class="text-subtitle text-sm">
            {{ $t('changePasswordSubTitle') }}
          </p>
        </div>
        <el-form
          ref="form"
          :model="model"
          label-position="top"
          label-width="120px"
          hide-required-asterisk
          @submit.native.prevent="onSubmit"
        >
          <el-form-item prop="old_password" :rules="rules.old_password">
            <el-input
              ref="old_password"
              v-model="model.old_password"
              type="password"
              :placeholder="$t('oldPassword')"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" :rules="rules.password">
            <el-input
              ref="password"
              v-model="model.password"
              type="password"
              :placeholder="$t('newPassword')"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword" :rules="rules.confirmPassword">
            <el-input
              ref="confirmPassword"
              v-model="model.confirmPassword"
              type="password"
              :placeholder="$t('confirmPassword')"
              show-password
            ></el-input>
          </el-form-item>
          <input-form>
            <el-form-item prop="2fa_code" :rules="rules[`2fa_code`]">
              <el-input
                ref="2fa_code"
                v-model="model['2fa_code']"
                :placeholder="$t('enterCodeFromGoogle')"
                class="google-code"
                maxlength="6"
              >
                <svg-icon
                  slot="prefix"
                  class="el-input__icon"
                  name="authen"
                  size="20 25"
                ></svg-icon>
              </el-input>
            </el-form-item>
          </input-form>
          <div class="mt-12">
            <el-button
              :loading="loading"
              type="primary"
              native-type="submit"
              class="w-full"
            >
              <span class="font-bold">{{ $t('changePassword') }}</span>
            </el-button>
          </div>
        </el-form>
        <div class="my-8"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { password, twoFACode } from '@/utils/form-rules'
import validateForm from '@/mixins/validate-form'
import InputForm from '@/components/common/input-form'
export default {
  name: 'AuthChangePassword',
  layout: 'auth',
  components: {
    InputForm,
  },
  mixins: [validateForm],
  validate({ store }) {
    return store.getters.isEnable2FA
  },
  data() {
    const rulePassword = password.bind(this)()
    const twoFACodeRule = twoFACode.bind(this)()

    return {
      loading: false,
      model: {
        old_password: '',
        password: '',
        confirmPassword: '',
        '2fa_code': '',
      },
      rules: {
        old_password: [rulePassword.required, rulePassword.min],
        password: [rulePassword.required, rulePassword.min],
        confirmPassword: [
          rulePassword.required,
          rulePassword.min,
          rulePassword.validatorConfirmPassword('password'),
        ],
        '2fa_code': [twoFACodeRule.required],
      },
    }
  },
  methods: {
    ...mapActions({
      changePassword: 'authentications/changePassword',
    }),
    async onSubmit() {
      const isValid = await this.validate()

      if (!isValid) return

      try {
        this.loading = true
        await this.changePassword(this.model)
        await this.$success({
          title: this.$t('notify.changePasswordSuccess'),
          subtitle: this.$t('pleaseReturnHomePage'),
          actionText: this.$t('goBackHomePageNow'),
          actionMethod: () => this.$router.push({ name: 'index' }),
        })
      } catch (e) {
        this.$notify.closeAll()
        this.$refs.form.resetFields()

        this.$notify({
          title: this.$t('notify.changePasswordError'),
          message: this.$t('pleaseCheckYourPassword'),
          type: 'error',
        })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss">
.change-password {
  .google-code.el-input {
    .el-input__inner {
      padding-left: 50px;
    }
    .el-input__prefix {
      left: 10px;
      top: 3px;
    }
  }
}
</style>
