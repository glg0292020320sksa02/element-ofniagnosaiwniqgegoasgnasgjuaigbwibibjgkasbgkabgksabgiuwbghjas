<template>
  <div class="container flex justify-center items-start min-h-screen">
    <div class="w-full md:w-3/5 xl:w-1/3">
      <el-card shadow="never" class="p-3 rounded-lg shadow-lg">
        <div
          class="card-header mb-12 flex flex-col justify-center align-middle text-center"
        >
          <strong class="text-3xl">{{ $t('resetPasswordTitle') }}</strong>
          <p class="text-subtitle text-sm">{{ $t('resetPasswordSubTitle') }}</p>
        </div>
        <el-form
          ref="form"
          :model="model"
          label-position="top"
          label-width="120px"
          hide-required-asterisk
          @submit.native.prevent="onSubmit"
        >
          <el-form-item prop="password" :rules="rules.password">
            <el-input
              ref="password"
              v-model="model.password"
              type="password"
              :placeholder="$t('newPassword')"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="password_confirmation"
            :rules="rules.password_confirmation"
          >
            <el-input
              ref="password_confirmation"
              v-model="model.password_confirmation"
              type="password"
              :placeholder="$t('confirmPassword')"
              show-password
            ></el-input>
          </el-form-item>
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
        <div class="flex justify-end text-sm my-8">
          <nuxt-link
            :to="{ name: 'auth-login' }"
            class="text-primary hover:underline cursor-pointer font-bold"
          >
            {{ $t('backToLogin') }}
          </nuxt-link>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { password } from '@/utils/form-rules'
import validateForm from '@/mixins/validate-form'

export default {
  name: 'AuthResetPassword',
  layout: 'auth',
  auth: false,
  mixins: [validateForm],
  data() {
    const rulePassword = password.bind(this)()

    return {
      loading: false,
      model: {
        password: '',
        password_confirmation: '',
      },
      rules: {
        password: [rulePassword.required, rulePassword.min],
        password_confirmation: [
          rulePassword.required,
          rulePassword.min,
          rulePassword.validatorConfirmPassword('password'),
        ],
      },
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions({
      resetPassword: 'authentications/resetPassword',
    }),
    init() {
      this.model = { ...this.model, ...this.$route.query }
    },
    async onSubmit() {
      const isValid = await this.validate()

      if (!isValid) return

      try {
        this.loading = true
        await this.resetPassword(this.model)

        await this.$success({
          title: this.$t('success'),
          subtitle: this.$t('resetPasswordSuccessful'),
          actionMethod: () => this.$router.push({ name: 'index' }),
        })
      } catch (e) {
        this.$notify.closeAll()

        this.$notify({
          title: this.$t('resetPasswordFailure'),
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
