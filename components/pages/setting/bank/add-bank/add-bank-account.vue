<template>
  <div>
    <div class="flex justify-center items-center pb-4">
      <div
        class="card-header flex flex-col justify-center align-middle text-center"
      >
        <strong class="text-3xl">{{ $t('BankingTitle') }}</strong>
        <p class="text-subtitle text-sm">{{ $t('BankingSubTitle') }}</p>
      </div>
    </div>
    <el-form
      ref="form"
      :model="model"
      label-position="top"
      label-width="120px"
      hide-required-asterisk
    >
      <el-form-item label="Ngân hàng" prop="bank_id">
        <el-select-bank
          ref="bank_id"
          v-model="model.bank_id"
          disabled
        ></el-select-bank>
      </el-form-item>

      <el-form-item label="Username" prop="username">
        <el-input ref="username" v-model="model.username">
          <template v-if="step === 'finnal'" slot="suffix">
            <i class="el-icon-check text-success font-bold"></i>
          </template>
        </el-input>
      </el-form-item>

      <template v-if="step === 'verify'">
        <el-form-item label="Mật khẩu" prop="password">
          <el-input
            ref="password"
            v-model="model.password"
            type="password"
          ></el-input>
        </el-form-item>
        <div class="mt-12">
          <el-button
            :loading="loading"
            type="primary"
            class="w-full"
            @click="onVerify"
          >
            <span class="font-bold">{{ $t('verifyBankAccount') }}</span>
          </el-button>
        </div>
      </template>
      <template v-else>
        <el-form-item label="Chủ tài khoản">
          <el-input :value="accountName" disabled>
            <template slot="suffix">
              <i class="el-icon-check text-success font-bold"></i>
            </template>
          </el-input>
        </el-form-item>

        <div class="mt-12">
          <el-button
            :loading="loading"
            type="primary"
            class="w-full"
            @click="onSubmit"
          >
            <span class="font-bold">{{ $t('save') }}</span>
          </el-button>
        </div>
      </template>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import ElSelectBank from '@/components/pages/account-banking/el-select-bank'

export default {
  name: 'AddBankAccount',
  components: { ElSelectBank },
  props: {
    bank: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      step: 'verify',
      model: {
        bank_id: this.bank.id,
        username: '',
        password: '',
      },
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
        this.step = 'finnal'
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

<style lang="scss" scoped></style>
