<template>
  <el-select
    v-model="bankAccountNumberId"
    :loading="$fetchState.pending"
    placeholder=""
    class="select-account-number w-full"
  >
    <el-option
      v-for="account in bankAccountNumbers"
      :key="account.id"
      :label="account.name"
      :value="account.id"
    ></el-option>
    <el-option
      v-if="!bankAccountNumbers || bankAccountNumbers.length === 0"
      class="text-center flex justify-center"
    >
      <nuxt-link to="/setting/bank" class="cursor-pointer text-primary">
        {{ $t('addNewBankAccount') }}
      </nuxt-link>
    </el-option>
  </el-select>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SelectAccountNumber',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
  fetch() {
    this.loadBankAccountNumbers()
  },
  data() {
    return {
      bankAccountNumbers: [],
    }
  },
  computed: {
    bankAccountNumberId: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    ...mapActions({
      getBankAccountNumbers: 'bank/getBankAccountNumbers',
    }),
    async loadBankAccountNumbers() {
      this.bankAccountNumbers = await this.getBankAccountNumbers()
    },
  },
}
</script>
