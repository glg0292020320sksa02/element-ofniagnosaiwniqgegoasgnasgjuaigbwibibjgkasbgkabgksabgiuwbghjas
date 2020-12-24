<template>
  <el-select
    ref="bank_id"
    v-model="bankId"
    :loading="$fetchState.pending"
    placeholder=""
    filterable
    class="w-full"
  >
    <el-option
      v-for="bank in listBankSupported"
      :key="bank.id"
      :value="bank.id"
      :label="bank.alias ? bank.alias + ' - ' + bank.name : bank.name"
      class="h-16"
    >
      <div class="flex flex-col justify-start items-start py-4 text-xs">
        <strong class="leading-4">{{ bank.name }}</strong>
        <span v-if="bank.alias" class="text-subtitle leading-4">
          {{ bank.alias }}
        </span>
      </div>
    </el-option>
  </el-select>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'ElSelectBank',
  props: {
    value: {
      type: [Number, String],
      default: '',
    },
    supportBank: {
      type: [Boolean],
      default: true,
    },
  },
  fetch() {
    this.loadBanks()
  },
  data() {
    return {
      listBank: [],
    }
  },
  computed: {
    bankId: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    listBankSupported() {
      return !this.supportBank
        ? this.listBank
        : this.listBank.filter(bank => bank.is_support)
    },
  },
  methods: {
    ...mapActions({
      getBanks: 'bank/getBanks',
    }),
    async loadBanks() {
      this.listBank = await this.getBanks()
    },
  },
})
</script>
