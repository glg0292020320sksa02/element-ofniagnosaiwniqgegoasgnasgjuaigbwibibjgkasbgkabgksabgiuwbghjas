/* eslint-disable vue/no-v-html */
<template>
  <div class="rounded-lg bg-white p-2 text-sm">
    <div class="title flex flex-col justify-center items-center">
      <strong>
        <img
          src="~/assets/images/vietcombank-digibank.svg"
          alt=""
          class="h-6"
        />
      </strong>
      <span class="my-2">{{ $t('vcbWelcome') }}</span>
    </div>
    <div
      class="notification shadow-lg rounded border-l-2 border-success p-4 text-xs my-2"
      v-html="$t('vcbNotice')"
    ></div>
    <div v-if="step === 'VERIFY'" class="form my-4">
      <input-form :label="$t('vcbFormName')" class="mb-4">
        <input
          v-model="model.username"
          type="text"
          class="py-1 border-b border-gray-600 w-full outline-none"
        />
      </input-form>
      <input-form :label="$t('vcbFormPassword')" class="mb-4">
        <div class="flex flex-row justify-start item-center relative">
          <input
            v-model="model.password"
            :type="isShowPassword ? 'text' : 'password'"
            class="py-1 border-b border-gray-600 w-full outline-none flex-grow"
          />
          <button
            class="px-2 rounded bg-white absolute right-0 top-10"
            @click="isShowPassword = !isShowPassword"
          >
            <i class="el-icon-view"></i>
          </button>
        </div>
      </input-form>
      <button
        class="p-4 font-bold text-white rounded-lg w-full btn-login"
        @click="onVerify"
      >
        {{ $t('vcbLogin') }}
      </button>
    </div>
    <div v-else class="form my-4">
      <input-form :label="$t('accountHolder')" class="mb-4">
        <div class="flex flex-row justify-start item-center relative">
          <input
            v-model="accountName"
            disabled
            type="text"
            class="py-1 border-b border-gray-600 w-full outline-none"
          />
          <i class="el-icon-check text-success font-bold absolute checked"></i>
        </div>
      </input-form>
      <button
        class="p-4 font-bold text-white rounded-lg w-full btn-login"
        @click="onSubmit"
      >
        {{ $t('confirmAndSave') }}
      </button>
    </div>
    <div class="my-4 flex flex-col justify-center items-center text-xs">
      <a
        href="https://vcbdigibank.vietcombank.com.vn/#/resetpassword"
        target="_blank"
        class="text-success"
      >
        {{ $t('vcbvcbForgotPassword') }}
      </a>
      <a
        href="https://digibankm5.vietcombank.com.vn/get_file/ibomni/html/chuyen-doi-ib.pdf"
        target="_blank"
        class="text-success"
      >
        {{ $t('vcbInstruction') }}
      </a>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

import InputForm from '@/components/common/input-form'
export default {
  name: 'AddBankAccountVietcombank',
  components: {
    InputForm,
  },
  props: {
    bank: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isShowPassword: false,
      model: {
        bank_id: this.bank.id,
        username: '',
        password: '',
      },
      step: 'VERIFY',
      accountName: '',
    }
  },
  methods: {
    ...mapActions({
      addBankAccount: 'bank/addBankAccount',
    }),

    async onVerify() {
      try {
        this.loading = true
        const model = { ...this.model, create: 0 }

        const { name } = await this.addBankAccount(model)

        this.accountName = name || ''
        this.step = 'FINAL'
      } catch (e) {
        this.$notify.closeAll()
        this.$notify({
          title: 'Xác thực tài khoản thất bại',
          message: 'Vui lòng kiểm tra lại thông tin ngân hàng của bạn.',
          type: 'error',
        })
      } finally {
        this.loading = false
      }
    },
    async onSubmit() {
      try {
        this.loading = true
        const model = { ...this.model, create: 1 }

        await this.addBankAccount(model)

        this.$notify({
          title: 'Lưu tài khoản ngân hàng thành công.',
          type: 'success',
        })
        this.$emit('success')
      } catch (e) {
        this.$notify.closeAll()

        this.$notify({
          title: 'Lưu tài khoản ngân hàng thất bại.',
          message: 'Có 1 lỗi đã xảy ra, vui lòng thực hiện lại.',
          type: 'error',
        })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
<style scoped>
.btn-login {
  background: linear-gradient(120deg, rgb(95, 182, 33), rgb(0, 124, 48));
}
.checked {
  top: 40% !important;
  right: 0.25rem !important;
}
</style>
