<template>
  <div class="bg-white p-2 text-sm">
    <div class="title flex flex-col justify-center items-center">
      <strong class="w-full text-center pb-4">
        <img
          src="~/assets/images/vietinbank-digibank.png"
          alt=""
          class="mx-auto"
        />
      </strong>
      <div
        class="my-2 w-full text-base text-left text-blue-500"
        v-html="$t('vtbWelcome')"
      ></div>
    </div>
    <div
      v-if="step === 'VERIFY'"
      class="form my-4 flex flex-col justify-center items-stretch"
    >
      <div
        class="flex flex-col justify-start items-stretch border border-gray-400 outline-none"
      >
        <input
          v-model="model.username"
          type="text"
          class="py-4 px-1 flex-grow outline-none"
          :placeholder="$t('vtbFormName')"
        />
        <hr />
        <input
          v-model="model.password"
          :type="isShowPassword ? 'text' : 'password'"
          class="py-4 px-1 w-full flex-grow outline-none"
          :placeholder="$t('vtbFormPassword')"
        />
      </div>
      <button
        class="p-3 font-bold bg-blue-500 text-white w-full mx-auto my-4 rounded-sm"
        @click="onVerify"
      >
        {{ $t('vtbLogin') }}
      </button>
    </div>
    <div v-else class="form my-4 flex flex-col justify-center items-stretch">
      <div
        class="flex flex-col justify-start items-stretch border border-gray-400 outline-none relative"
      >
        <input
          v-model="accountName"
          type="text"
          class="py-4 px-1 flex-grow outline-none"
          :placeholder="$t('vtbFormName')"
        />
        <i class="el-icon-check text-success font-bold absolute checked"></i>
      </div>
      <button
        class="p-3 font-bold bg-blue-500 text-white w-full mx-auto my-4 rounded-sm"
        @click="onSubmit"
      >
        {{ $t('confirmAndSave') }}
      </button>
    </div>
    <div class="my-4 flex flex-row justify-between items-start text-xs">
      <div class="flex flex-col justify-start items-start">
        <a
          href="https://www.techcombank.com.vn/zerofee4"
          target="_blank"
          class="text-blue-500"
        >
          {{ $t('vtbSupport') }}
        </a>
        <a
          href="https://ib.techcombank.com.vn/ebankreset/input.jsp"
          target="_blank"
          class="text-blue-500"
        >
          {{ $t('vtbSync') }}
        </a>
        <a
          href="https://ib.techcombank.com.vn/ebankreset/input.jsp"
          target="_blank"
          class="text-blue-500"
        >
          {{ $t('vtbForgotPassword') }}
        </a>
      </div>
      <div class="flex flex-col justify-start text-right items-end">
        <a
          href="https://www.techcombank.com.vn/zerofee4"
          target="_blank"
          class="text-blue-500"
        >
          {{ $t('vtbSecurity') }}
        </a>
        <a
          href="https://ib.techcombank.com.vn/ebankreset/input.jsp"
          target="_blank"
          class="text-blue-500"
        >
          {{ $t('vtbRegister') }}
        </a>
        <a
          href="https://ib.techcombank.com.vn/ebankreset/input.jsp"
          target="_blank"
          class="text-blue-500"
        >
          {{ $t('vtbForgotUsername') }}
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'AddBankAccountVietinbank',
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
