<template>
  <div class="container flex justify-center items-start h-screen min-h-screen">
    <div class="w-full md:w-3/5 xl:w-1/3">
      <el-card shadow="never" class="p-3 rounded-lg shadow-lg">
        <div
          class="card-header mb-12 flex flex-col justify-center align-middle text-center"
        >
          <strong class="text-3xl">{{ $t('registerTitle') }}</strong>
          <p class="text-subtitle text-sm">{{ $t('registerSubTitle') }}</p>
        </div>
        <el-form
          ref="form"
          :model="model"
          label-position="top"
          label-width="120px"
          class="form-register"
          hide-required-asterisk
          @submit.native.prevent="onSubmit"
        >
          <el-form-item prop="name" :rules="rules.name">
            <el-input
              ref="name"
              v-model="model.name"
              :placeholder="$t('fullName')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="email" :rules="rules.email">
            <el-input
              ref="email"
              v-model="model.email"
              :placeholder="$t('email')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" :rules="rules.password">
            <el-input
              ref="password"
              v-model="model.password"
              type="password"
              show-password
              :placeholder="$t('password')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword" :rules="rules.confirmPassword">
            <el-input
              ref="confirmPassword"
              v-model="model.confirmPassword"
              type="password"
              show-password
              :placeholder="$t('confirmPassword')"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="agreeTerms"
            class="mt-6"
            :rules="rules.agreeTerms"
          >
            <el-checkbox v-model="model.agreeTerms">
              <span class="text-body">{{ $t('agree') }}</span>
              <nuxt-link
                :to="{ name: 'term-and-condition' }"
                class="text-primary hover:underline"
              >
                {{ $t('readAndAgreeTerms') }}
              </nuxt-link>
            </el-checkbox>
          </el-form-item>

          <div class="mt-3">
            <div>
              <el-button
                :loading="loading"
                type="primary"
                native-type="submit"
                class="w-full"
              >
                <span class="font-bold">{{ $t('register') }}</span>
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
                  <span class="font-bold mx-2">
                    {{ $t('registerWithGoogle') }}
                  </span>
                </div>
              </el-button>
            </div>
          </div>
        </el-form>

        <div class="flex justify-end text-sm my-8">
          <nuxt-link
            :to="{ name: 'auth-login' }"
            class="text-primary hover:underline cursor-pointer"
          >
            {{ $t('alreadyAccount') }}
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
  name: 'AuthRegister',
  layout: 'auth',
  auth: false,
  mixins: [validateForm],
  data() {
    const ruleEmail = email.bind(this)()
    const rulePassword = password.bind(this)()

    const validatorAgreeTerms = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('youHaveNotAgreeTerms')))
      }

      callback()
    }

    return {
      loading: false,
      model: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: true,
      },
      rules: {
        name: [
          {
            required: true,
            message: this.$t('fullNameRequired'),
            trigger: 'blur',
          },
        ],
        email: [ruleEmail.required, ruleEmail.regex],
        password: [rulePassword.required, rulePassword.min],
        confirmPassword: [
          rulePassword.required,
          rulePassword.min,
          rulePassword.validatorConfirmPassword('password'),
        ],
        agreeTerms: [{ validator: validatorAgreeTerms, trigger: 'blur' }],
      },
    }
  },
  methods: {
    ...mapActions({
      register: 'authentications/register',
    }),
    async onSubmit() {
      const isValid = await this.validate()

      if (!isValid) return

      try {
        this.loading = true
        await this.register(this.model)
        await this.$success({
          title: this.$t('registerSuccessful'),
          subtitle: this.$t('pleaseCheckYourEmail'),
          actionMethod: () => this.$router.push({ name: 'auth-login' }),
        })
      } catch (e) {
        this.$notify({
          title: this.$t('registerFailure'),
          message: this.$t('pleaseRegisterAgain'),
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
.form-register {
  .el-checkbox + .el-form-item__error {
    margin-top: -12px;
  }
}
</style>
