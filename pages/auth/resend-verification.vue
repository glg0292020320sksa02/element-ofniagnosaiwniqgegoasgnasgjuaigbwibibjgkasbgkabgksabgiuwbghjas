<template>
  <div class="container flex justify-center items-start h-screen min-h-screen">
    <div class="w-full md:w-3/5 xl:w-1/3">
      <el-card shadow="never" class="p-3 rounded-lg shadow-lg">
        <div
          class="card-header mb-12 flex flex-col justify-center align-middle text-center"
        >
          <strong class="text-3xl">{{ $t('resendVerificationTitle') }}</strong>
          <p class="text-subtitle text-sm">
            {{ $t('resendVerificationSubTitle') }}
          </p>
        </div>
        <el-form
          ref="form"
          :model="model"
          :rules="rules"
          label-position="top"
          label-width="120px"
          hide-required-asterisk
          @submit.native.prevent="onSubmit"
        >
          <el-form-item prop="email">
            <el-input
              ref="email"
              v-model="model.email"
              :placeholder="$t('yourEmailAddress')"
            ></el-input>
          </el-form-item>
          <div class="mt-6">
            <el-button
              :loading="loading"
              type="primary"
              native-type="submit"
              class="w-full"
            >
              <span class="font-bold">{{ $t('Send') }}</span>
            </el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { email } from '@/utils/form-rules'
import validateForm from '@/mixins/validate-form'

export default {
  name: 'AuthResendVerification',
  layout: 'auth',
  auth: false,
  mixins: [validateForm],
  data() {
    const ruleEmail = email.bind(this)()

    return {
      loading: false,
      isValid: true,
      model: {
        email: '',
      },
      rules: {
        email: [ruleEmail.required, ruleEmail.regex],
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
        await this.resendVerification(this.model)

        await this.$success({
          title: this.$t('success'),
          subtitle: this.$t('pleaseCheckYourEmailHtml', {
            email: this.model.email,
          }),
          actionMethod: () => this.$router.push({ name: 'index' }),
        })
      } catch (e) {
        this.$notify.closeAll()

        this.$notify({
          title: this.$t('failure'),
          message: this.$t('pleaseCheckYourEmailAddress'),
          type: 'error',
        })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss"></style>
