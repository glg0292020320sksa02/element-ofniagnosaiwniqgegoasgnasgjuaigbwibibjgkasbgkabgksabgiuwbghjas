<template>
  <el-dialog
    :visible="visible"
    :show-close="false"
    :modal-append-to-body="false"
    width="400px"
    class="add-bank-component"
    @update:visible="onClose"
  >
    <template #title>
      <div v-if="currentStep === 1">
        <div class="flex justify-center items-center p-4">
          <div
            class="card-header flex flex-col justify-center align-middle text-center"
          >
            <strong class="text-3xl">{{ $t('BankingTitle') }}</strong>
            <p class="text-subtitle text-sm">{{ $t('BankingSubTitle') }}</p>
          </div>
        </div>
        <div class="mt-2 px-4 pt-2 bg-red-100 rounded">
          <div class="text-xs text-error">
            {{
              selectedPaymentType === 'bankAccount'
                ? 'Lưu ý: Quý khách có thể nhận được thanh toán từ bất kì ngân hàng nào của Việt Nam'
                : 'Lưu ý: Quý khách có thể nhận thanh toán từ ngân hàng Vietcombank hoặc Techcombank'
            }}
          </div>
        </div>
      </div>
      <div v-else>
        <el-button
          size="small"
          icon="el-icon-back"
          circle
          @click="currentStep = 1"
        ></el-button>
      </div>
    </template>
    <div v-if="currentStep === 1" class="add-bank">
      <input-form label="Hình thức nhận thanh toán" class="my-4">
        <el-radio-group v-model="selectedPaymentType">
          <el-radio label="BANKACCOUNT" class="m-0 mt-2" border>
            <span class="text-xs">{{ $t('internetBankingVCB') }}</span>
          </el-radio>
          <el-radio label="BANKACCOUNTNUMBER" class="m-0 mt-2 text-xs" border>
            <span class="text-xs">{{ $t('receivedByBankAccountNumber') }}</span>
          </el-radio>
        </el-radio-group>
      </input-form>
      <input-form label="Ngân hàng" class="my-4">
        <el-radio-group
          v-model="selectedBank"
          class="w-full h-48 overflow-y-scroll"
        >
          <el-radio
            v-for="(bank, index) in acceptBanks"
            :key="index + '_bank'"
            :label="bank"
            class="m-0 mt-2 flex flex-row justify-start items-start"
            border
          >
            <div class="flex flex-col justify-start items-stretch text-xs">
              <span class="w-11/12 overflow-hidden truncate">
                {{ bank.name }}
              </span>
              <span class="text-subtitle py-1">
                {{ bank.alias }}
              </span>
            </div>
          </el-radio>
        </el-radio-group>
      </input-form>
      <div class="mt-6">
        <el-button type="primary" class="w-full" @click="currentStep = 2">
          <span class="font-bold">Next</span>
        </el-button>
      </div>
    </div>
    <div v-else>
      <add-bank-account-number
        v-if="isAddBankAccountNumber"
        :bank="selectedBank"
      ></add-bank-account-number>
      <add-bank-account-techcombank
        v-else-if="isAddBankAccountTCB"
        :bank="selectedBank"
      ></add-bank-account-techcombank>
      <add-bank-account-vietcombank
        v-else-if="isAddBankAccountVCB"
        :bank="selectedBank"
      ></add-bank-account-vietcombank>
      <add-bank-account-vietinbank
        v-else-if="isAddBankAccountVTB"
        :bank="selectedBank"
      ></add-bank-account-vietinbank>
      <add-bank-account v-else :bank="selectedBank"></add-bank-account>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import InputForm from '@/components/common/input-form'
import AddBankAccountTechcombank from '@/components/pages/setting/bank/add-bank/add-bank-account-techcombank.vue'
import AddBankAccountVietcombank from '@/components/pages/setting/bank/add-bank/add-bank-account-vietcombank.vue'
import AddBankAccount from '@/components/pages/setting/bank/add-bank/add-bank-account.vue'
import AddBankAccountNumber from '@/components/pages/setting/bank/add-bank/add-bank-account-number.vue'
import AddBankAccountVietinbank from '@/components/pages/setting/bank/add-bank/add-bank-account-vietinbank.vue'
export default {
  name: 'AddBank',
  components: {
    InputForm,
    AddBankAccountTechcombank,
    AddBankAccountVietcombank,
    AddBankAccount,
    AddBankAccountNumber,
    AddBankAccountVietinbank,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  fetch() {
    this.loadBanks()
  },
  data() {
    return {
      selectedPaymentType: 'BANKACCOUNT',
      selectedBank: null,
      banks: [],
      currentStep: 1,
    }
  },
  computed: {
    isAddBankAccount() {
      return this.selectedPaymentType === 'BANKACCOUNT'
    },
    isAddBankAccountNumber() {
      return this.selectedPaymentType === 'BANKACCOUNTNUMBER'
    },
    isAddBankAccountVCB() {
      return (
        this.selectedPaymentType === 'BANKACCOUNT' &&
        this.selectedBank.alias === 'VCB'
      )
    },
    isAddBankAccountTCB() {
      return (
        this.selectedPaymentType === 'BANKACCOUNT' &&
        this.selectedBank.alias === 'TCB'
      )
    },
    isAddBankAccountVTB() {
      return (
        this.selectedPaymentType === 'BANKACCOUNT' &&
        this.selectedBank.alias === 'VTB'
      )
    },
    acceptBanks() {
      return this.selectedPaymentType !== 'BANKACCOUNT'
        ? this.banks
        : this.banks.filter(bank => bank.is_support)
    },
  },
  methods: {
    ...mapActions({
      getBanks: 'bank/getBanks',
    }),
    onClose() {
      this.currentStep = 1
      this.$emit('update:visible', false)
    },
    onRefresh() {
      this.onClose()
      this.$nuxt.refresh()
    },
    async loadBanks() {
      this.banks = await this.getBanks()
      this.selectedBank = this.banks[0]
    },
  },
}
</script>

<style lang="scss">
.add-bank-component .el-dialog__body {
  padding-top: 0 !important;
}
.add-bank .el-radio__label {
  width: 70%;
  flex-grow: 1 !important;
}
.add-bank .el-radio.is-bordered {
  height: 48px;
}
</style>
