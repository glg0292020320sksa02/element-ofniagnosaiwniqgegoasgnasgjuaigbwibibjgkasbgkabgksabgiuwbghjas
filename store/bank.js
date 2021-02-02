export const actions = {
  getBanks() {
    return this.$axios.$get('/api/banks')
  },
  getBankAccount() {
    return this.$axios.$get('/api/bank_accounts')
  },
  getBankAccountNumbers() {
    return this.$axios.$get('/api/bank_account_numbers')
  },
  addBankAccount({}, data) {
    console.log(this.$axios)

    return this.$axios.$post('/api/bank_accounts', data)
  },
  addBankAccountNumber({}, data) {
    console.log(this.$axios)

    return this.$axios.$post('/api/bank_account_numbers', data)
  },
  deleteBankAccount({}, id) {
    return this.$axios.$delete(`/api/bank_accounts/${id}`)
  },
  deleteBankAccountNumber({}, id) {
    return this.$axios.$delete(`/api/bank_account_numbers/${id}`)
  },
}
