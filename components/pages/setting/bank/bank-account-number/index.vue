<template>
  <div>
    <div class="flex justify-between items-center text-sm">
      <div>
        <div class="font-bold text-primary">{{ $t('bankAccountNumber') }}</div>
        <div>
          <span class="text-subtitle text-sm">
            {{ $t('use-to-receive-money-from-crypto') }}
          </span>
        </div>
      </div>
      <div v-if="hasBankAccount || $fetchState.pending">
        <el-button size="small" type="primary" @click="addBankMethod">
          {{ $t('addAPaymentMethod') }}
        </el-button>
      </div>
    </div>
    <div class="mt-6">
      <table-content-loader v-if="$fetchState.pending"></table-content-loader>

      <template v-else>
        <el-card v-if="!hasBankAccount" class="shadow-sm rounded-lg text-xs">
          <div class="text-center p-6">
            <div class="mb-3">
              {{ $t('youHaveNotSetUpAnyPaymentMethods') }}
            </div>
            <el-button type="primary" size="small" @click="addBankMethod">
              {{ $t('addAPaymentMethod') }}
            </el-button>
          </div>
        </el-card>

        <div v-else class="overflow-x-auto mt-6">
          <div class="table table-hover whitespace-no-wrap">
            <table>
              <thead class="text-sm text-subtitle">
                <tr>
                  <th class="text-left">{{ $t('bankCode') }}</th>
                  <th class="text-left">{{ $t('bankName') }}</th>
                  <th class="text-left">{{ $t('bankNumber') }}</th>
                  <th class="text-left">{{ $t('accountName') }}</th>
                  <th class="text-left">{{ $t('status') }}</th>
                  <th class="text-left">{{ $t('action') }}</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr
                  v-for="(bankAccount, key) in listBankAccount"
                  :key="bankAccount.id"
                >
                  <td>{{ bankAccount.bank.alias }}</td>
                  <td>{{ bankAccount.bank.name }}</td>
                  <td>{{ bankAccount.number }}</td>
                  <td>{{ bankAccount.name }}</td>
                  <td>
                    <span
                      class="px-4 py-1 rounded-full text-success bg-teal-100"
                    >
                      <span
                        class="text-xs text-success font-bold leading-none uppercase"
                      >
                        {{ $t('verified') }}
                      </span>
                    </span>
                  </td>
                  <td>
                    <delete-bank-account
                      :id="bankAccount.id"
                      @success="handleDeleteBankAccountSuccess(key)"
                    ></delete-bank-account>
                  </td>
                </tr>
              </tbody>
              <tfoot v-if="!listBankAccount.length">
                <tr>
                  <td colspan="5" class="text-center p-8 font-bold text-base">
                    {{ $t('bankNotFound') }}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import TableContentLoader from '@/components/common/table-content-loader'

import DeleteBankAccount from './delete-bank-account'

export default {
  name: 'BankAccount',
  components: { TableContentLoader, DeleteBankAccount },
  props: {
    addBankMethod: {
      type: Function,
      required: true,
    },
  },
  async fetch() {
    await this.loadBankAccount()
  },
  data() {
    return {
      listBankAccount: [],
    }
  },
  computed: {
    hasBankAccount() {
      return this.listBankAccount.length > 0
    },
  },
  methods: {
    ...mapActions({
      getBankAccountNumbers: 'bank/getBankAccountNumbers',
    }),

    async loadBankAccount() {
      this.listBankAccount = await this.getBankAccountNumbers()
    },
    handleDeleteBankAccountSuccess(index) {
      this.listBankAccount.splice(index, 1)
    },
  },
}
</script>
