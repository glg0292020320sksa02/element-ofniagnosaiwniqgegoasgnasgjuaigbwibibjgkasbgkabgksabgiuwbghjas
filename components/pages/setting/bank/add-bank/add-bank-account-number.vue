<template>
  <div>
    <div class="flex justify-center items-center pb-4">
      <div
        class="card-header flex flex-col justify-center align-middle text-center"
      >
        <strong class="text-3xl">{{ $t('BankingTitle') }}</strong>
        <p class="text-subtitle text-sm">{{ $t('BankingNumberSubTitle') }}</p>
      </div>
    </div>
    <el-form
      ref="form"
      :model="model"
      label-position="top"
      label-width="120px"
      hide-required-asterisk
    >
      <el-form-item :label="$t('bank')" prop="bank_id">
        <el-select-bank
          ref="bank_id"
          v-model="model.bank_id"
          :support-bank="false"
        ></el-select-bank>
      </el-form-item>

      <el-form-item :label="$t('bankAccountNumber')" prop="number">
        <el-input ref="number" v-model="model.number"></el-input>
      </el-form-item>
      <div class="mt-12">
        <el-button
          :loading="loading"
          type="primary"
          class="w-full"
          @click="onSubmit"
        >
          <span class="font-bold">Add bank account</span>
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import ElSelectBank from '@/components/pages/account-banking/el-select-bank'

export default {
  name: 'AddBankAccountNumber',
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
      model: {
        bank_id: this.bank.id,
        number: '',
      },
    }
  },
  methods: {
    ...mapActions({
      addBankAccountNumber: 'bank/addBankAccountNumber',
    }),

    async onSubmit() {
      try {
        this.loading = true

        await this.addBankAccountNumber(this.model)

        this.$notify({
          title: 'Lưu số tài khoản thành công.',
          type: 'success',
        })
        this.$emit('success')
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
  },
}
</script>

<style lang="scss" scoped></style>
