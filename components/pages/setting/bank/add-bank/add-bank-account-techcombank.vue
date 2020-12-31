/* eslint-disable vue/no-v-html */
<template>
  <div class="bg-white p-2 text-sm">
    <div class="title flex flex-col justify-center items-center">
      <strong class="w-full text-center pb-4">
        <img
          src="~/assets/images/techcombank-digibank.gif"
          alt=""
          class="h-6 mx-auto"
        />
      </strong>
      <span class="my-2 text-base font-bold text-error">
        {{ $t('tcbWelcome') }}
      </span>
    </div>
    <div
      v-if="step === 'VERIFY'"
      class="form my-4 flex flex-col justify-center items-stretch"
    >
      <input-form class="mb-4">
        <div
          class="flex flex-row justify-start items-center border-b border-gray-400 outline-none"
        >
          <i class="el-icon-user-solid text-error"></i>
          <input
            v-model="model.username"
            type="text"
            class="py-2 px-1 flex-grow outline-none"
            :placeholder="$t('tcbFormName')"
          />
        </div>
      </input-form>
      <input-form class="mb-4">
        <el-tooltip class="item" effect="light" placement="right">
          <div
            class="flex flex-row justify-start items-center border-b border-gray-400 outline-none"
          >
            <i class="el-icon-lock text-error"></i>
            <input
              v-model="model.password"
              :type="isShowPassword ? 'text' : 'password'"
              class="py-2 px-1 w-full flex-grow outline-none"
              :placeholder="$t('tcbFormPassword')"
            />
          </div>
          <div slot="content" v-html="$t('tcbNotice')"></div>
        </el-tooltip>
      </input-form>
      <button
        class="p-3 font-bold bg-error text-white w-2/3 mx-auto my-4 rounded-sm"
        @click="onVerify"
      >
        {{ $t('tcbLogin') }}
      </button>
    </div>
    <div v-else class="form my-4 flex flex-col justify-center items-stretch">
      <input-form class="mb-4" :label="$t('accountHolder')">
        <div
          class="flex flex-row justify-start items-center border-b border-gray-400 outline-none relative"
        >
          <input
            v-model="accountName"
            type="text"
            class="py-2 px-1 flex-grow outline-none"
          />
          <i class="el-icon-check text-success font-bold absolute checked"></i>
        </div>
      </input-form>
      <button
        class="p-3 font-bold bg-error text-white w-2/3 mx-auto my-4 rounded-sm"
        @click="onSubmit"
      >
        {{ $t('confirmAndSave') }}
      </button>
    </div>
    <div class="my-4 flex flex-col justify-center items-center text-xs">
      <a
        href="https://www.techcombank.com.vn/zerofee4"
        target="_blank"
        class="text-error"
      >
        {{ $t('tcbRegister') }}
      </a>
      <a
        href="https://ib.techcombank.com.vn/ebankreset/input.jsp"
        target="_blank"
        class="text-error"
      >
        {{ $t('tcbForgotPassword') }}
      </a>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

import InputForm from '@/components/common/input-form'
export default {
  name: 'AddBankAccountTechcombank',
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
  top: 50% !important;
  right: 0.25rem !important;
}
</style>
