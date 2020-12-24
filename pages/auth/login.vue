<template>
  <div class="container flex justify-center items-start min-h-screen">
    <div class="w-full md:w-3/5 xl:w-1/3">
      <el-card shadow="never" class="p-3">
        <div
          class="card-header mb-12 flex flex-col justify-center align-middle text-center"
        >
          <strong class="text-3xl">{{ $t('loginTitle') }}</strong>
          <p class="text-subtitle text-sm">{{ $t('loginSubTitle') }}</p>
        </div>
        <el-form
          ref="form"
          :model="model"
          hide-required-asterisk
          @submit.native.prevent="onSubmit"
        >
          <template v-if="step === 'base'">
            <el-form-item :rules="rules.email" prop="email">
              <el-input
                ref="email"
                v-model="model.email"
                :placeholder="$t('email')"
              ></el-input>
            </el-form-item>

            <el-form-item :rules="rules.password" prop="password">
              <el-input
                ref="password"
                v-model="model.password"
                :placeholder="$t('password')"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
            <div class="flex justify-end text-sm">
              <nuxt-link
                :to="{ name: 'auth-forgot-password' }"
                class="text-error hover:underline cursor-pointer"
              >
                {{ $t('forgotPassword') }}?
              </nuxt-link>
            </div>
          </template>

          <template v-else>
            <el-form-item
              :rules="rules['2fa_code']"
              :label="$t('googleAuthentication')"
              prop="2fa_code"
            >
              <el-input
                ref="2fa_code"
                v-model="model['2fa_code']"
                maxlength="6"
              ></el-input>
            </el-form-item>
          </template>

          <div class="mt-6">
            <div>
              <el-button
                :loading="loading"
                type="primary"
                native-type="submit"
                class="w-full"
              >
                <span class="font-bold">{{ $t('signin') }}</span>
              </el-button>
            </div>

            <div class="mt-2">
              <el-button
                type="primary"
                plain
                class="w-full border-0 border-white hover:bg-indigo-100 hover:text-primary"
                @click="$auth.loginWith('google')"
              >
                <div class="flex justify-center items-center">
                  <svg-icon
                    name="google"
                    size="14"
                    class="w-5 inline"
                  ></svg-icon>
                  <span class="font-bold mx-1">
                    {{ $t('signinWithGoogle') }}
                  </span>
                </div>
              </el-button>
            </div>
          </div>
        </el-form>

        <div class="flex justify-end text-sm my-8">
          <nuxt-link
            :to="{ name: 'auth-register' }"
            class="text-primary hover:underline cursor-pointer"
          >
            {{ $t('createNewAccount') }}
          </nuxt-link>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { email, password } from '@/utils/form-rules'
import validateForm from '@/mixins/validate-form'

export default {
  name: 'AuthLogin',
  layout: 'auth',
  mixins: [validateForm],
  data() {
    const ruleEmail = email.bind(this)()
    const rulePassword = password.bind(this)()

    return {
      loading: false,
      step: 'base',
      model: {
        email: '',
        password: '',
      },
      rules: {
        email: [ruleEmail.required, ruleEmail.regex],
        password: [rulePassword.required, rulePassword.min],
        '2fa_code': [
          {
            required: true,
            message: this.$t('googleCodeIsRequired'),
            trigger: 'blur',
          },
          {
            min: 6,
            message: this.$t('googleCodeIsIncorrect'),
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    ...mapActions({
      resendVerification: 'authentications/resendVerification',
    }),
    async onSubmit() {
      const isValid = await this.validate()

      if (!isValid) return

      try {
        this.loading = true

        await this.$auth.loginWith('local', {
          data: this.model,
        })

        this.$router.push({ name: 'index' })
      } catch (error) {
        this.$notify.closeAll()

        if (error.errorCode === 'yourEmailAddressIsNotVerified') {
          return await this.handleErrorResendVerification()
        }

        if (error.errorCode === 'cannotVerify2FACode') {
          if (this.step === 'base') {
            return this.handleErrorNeedVerify2FACode()
          }

          if (this.step === 'googleCode') {
            return this.handleErrorCannotVerify2FACode()
          }
        }

        return this.handleErrorUnauthenticated()
      } finally {
        this.loading = false
      }
    },
    async handleErrorResendVerification() {
      try {
        const isConfirm = await this.$error({
          title: this.$t('emailIsNotVerified'),
          subtitle: this.$t('pleaseCheckYourEmail'),
          actionText: this.$t('resendVerificationCode'),
          loadingText: this.$t('resendingVerificationCode'),
          actionMethod: this.resendVerification,
        })

        if (isConfirm) {
          this.$notify({
            title: this.$t('resendVerificationCodeSuccessful'),
            message: this.$t('pleaseCheckYourEmailAndCompleteRegistration'),
            type: 'success',
          })
        }
      } catch {
        this.$notify({
          title: this.$t('resendVerificationFailure'),
          message: this.$t('pleaseContactAdministrator'),
          type: 'error',
        })
      }
    },
    handleErrorNeedVerify2FACode() {
      this.step = 'googleCode'
    },
    handleErrorCannotVerify2FACode() {
      this.model['2fa_code'] = ''
      this.$notify({
        title: this.$t('failure'),
        message: this.$t('pleaseCheckYourGoogleCode'),
        type: 'error',
      })
    },
    handleErrorUnauthenticated() {
      this.$notify({
        title: this.$t('loginFailure'),
        type: 'error',
      })
    },
  },
}
</script>
