<template>
  <el-select
    v-model="walletId"
    :loading="loading"
    placeholder=""
    class="select-coin w-full text-sm"
  >
    <el-option
      v-for="wallet in walletFilteredList"
      :key="wallet.id"
      :label="wallet.currency.name"
      :value="wallet.id"
    >
      <div class="flex justify-start items-center text-sm py-2">
        <img
          :src="`https://s2.coinmarketcap.com/static/img/coins/32x32/${wallet.currency.id}.png`"
          alt=""
          class="rounded-full avatar w-4 h-4 mr-2"
        />
        <span class="text-gray-900 text-sm">{{ wallet.currency.name }}</span>
      </div>
    </el-option>
  </el-select>
</template>

<script>
import { mapGetters } from 'vuex'

const MONEY_RECEIVED_DEFAULT = 'VNDS'

export default {
  name: 'SelectCoin',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    routChange: {
      type: Boolean,
      default: false,
    },
    filter: {
      type: [Boolean, String],
      default: MONEY_RECEIVED_DEFAULT,
    },
    includeVnds: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters({
      walletFiltered: 'wallet/walletFiltered',
      walletWithoutVNDS: 'wallet/walletWithoutVNDS',
    }),
    walletFilteredList() {
      return this.includeVnds
        ? this.walletFiltered(this.filter)
        : this.walletWithoutVNDS
    },
    walletSelected() {
      return this.walletFilteredList.find(wallet => wallet.id === this.walletId)
    },
    walletId: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)

        if (this.routChange) {
        }
      },
    },
  },
}
</script>
