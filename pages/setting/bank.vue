<template>
  <div class="p-8">
    <!-- <bank-account
      :add-bank-method="addBankAccount"
      class="mb-16 bg-gray-100 p-4 rounded-lg"
    ></bank-account> -->
    <bank-account-number
      :add-bank-method="addBankAccount"
      class="bg-gray-100 p-4 rounded-lg"
    ></bank-account-number>
    <add-bank
      :visible.sync="visibleAddBankAccount"
      @close="refreshPage"
    ></add-bank>
  </div>
</template>

<script>
// import BankAccount from '@/components/pages/setting/bank/bank-account'
import BankAccountNumber from '@/components/pages/setting/bank/bank-account-number'

import AddBank from '@/components/pages/setting/bank/add-bank/index.vue'

export default {
  name: 'SettingWallet',
  components: {
    // BankAccount,
    BankAccountNumber,
    AddBank,
  },
  data() {
    return {
      visibleAddBankAccount: false,
    }
  },
  methods: {
    addBankAccount() {
      this.visibleAddBankAccount = true
    },
    refreshPage() {
      this.$nuxt.refresh()
    },
  },
}
</script>

<style>
.text-symbol {
  font-size: 0.5rem;
}
</style>
