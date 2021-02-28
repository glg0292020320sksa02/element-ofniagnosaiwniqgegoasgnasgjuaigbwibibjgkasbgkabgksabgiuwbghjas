<template>
  <div class="exchange-sell text-sm">
    <div v-if="$auth.loggedIn">
      <div>
        <div class="flex flex-row justify-end items-end">
          <label class="block mr-2">
            <span class="text-subtitle inline-block text-xs mb-2">
              {{ $t('ToAddressPm') }}
            </span>
            <el-input v-model="address"></el-input>
          </label>
          <label class="block mr-2">
            <div>
              <span class="text-subtitle text-xs">
                Số lượng {{ selectedWallets.currency.symbol }}
              </span>
              <button
                v-for="(per, indx) in amountPercent"
                :key="indx + '_percent'"
                class="text-xxs rounded-full px-2 py-1 ml-1"
                :class="
                  selectedAmountPercent === per
                    ? 'bg-primary text-white'
                    : 'bg-primary-100 text-primary'
                "
                @click="selectAmountPercent(per)"
              >
                {{ per }}%
              </button>
            </div>
            <input-currency
              v-model="amount"
              class="form-input mt-1 block w-full text-sm focus:outline-primary-100 focus:border-body"
            ></input-currency>
          </label>
          <button
            class="px-6 py-3 h-12 rounded error-btn text-white font-bold"
            @click="onWithdraw"
          >
            Rút {{ selectedWallets.currency.symbol }}
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <button
        class="rounded px-4 py-2 text-primary text-xs bg-primary-50 flex flex-nowrap"
        @click="redirectToLogin"
      >
        Bạn cần đăng nhập trước khi bán
        <icon-arrow-right class="w-4 h-4 ml-1"></icon-arrow-right>
      </button>
    </div>
  </div>
</template>

<script>
import Big from 'big.js'
import { filterPriceMoney } from '@/filters'
import { mapActions, mapGetters } from 'vuex'
import InputCurrency from '@/components/ui/input-currency'
import IconArrowRight from '@/components/ui/icon/icon-arrow-right'

export default {
  name: 'HoldingWithdraw',
  filters: { filterPriceMoney },
  components: { InputCurrency, IconArrowRight },
  fetch() {
    this.loadDetailWallet()
  },
  data() {
    return {
      amountPercent: [25, 50, 75, 100],
      selectedAmountPercent: 0,
      amount: 0,
      address: '',
    }
  },
  computed: {
    ...mapGetters({
      selectedWallets: 'wallet/selectedWallets',
    }),
    orderAmount() {
      return this.selectedWallets.real_balance
    },
    walletId() {
      return this.selectedWallets.id
    },
  },
  methods: {
    ...mapActions({
      withdraw: 'wallet/withdraw',
    }),
    loadDetailWallet() {
      this.amount = this.selectedWallets.real_balance
    },
    selectAmountPercent(percent) {
      try {
        const total = Big(this.orderAmount)

        const amount = total.times(percent).div(100)

        this.amount = amount.toNumber()
        this.selectedAmountPercent = percent
      } catch (error) {}
    },
    async onWithdraw() {
      this.$notify.closeAll()

      const body = {
        amount: this.amount.toString(),
        address: this.address.toString(),
      }

      try {
        this.loading = true
        await this.withdraw({ target: this.walletId, body })
        await this.$success({
          title: this.$t('success'),
          subtitle: this.$t('createBuyOrderSuccessful'),
          actionText: this.$t('pleaseReturnHomePage'),
          actionMethod: () => this.$router.go(-1),
        })
      } catch (e) {
        this.$notify({
          title: this.$t('failure'),
          message: e.exception,
          type: 'error',
        })
      } finally {
        this.loading = false
      }
    },
    redirectToLogin() {
      this.$router.push('/auth/login')
    },
  },
}
</script>
