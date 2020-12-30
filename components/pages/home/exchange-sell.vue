<template>
  <div class="exchange-sell text-sm">
    <div class="flex flex-row justify-end items-end">
      <label class="block mr-2">
        <div>
          <span class="text-subtitle text-xs">Số lượng</span>
          <button
            v-for="(per, indx) in amountPercent"
            :key="indx + '_percent'"
            class="text-xxs rounded-full px-2 py-1 ml-1"
            :class="
              selectedAmountPercent === per
                ? 'bg-primary text-white'
                : 'bg-indigo-100 text-primary'
            "
            @click="selectAmountPercent(per)"
          >
            {{ per }}%
          </button>
        </div>
        <input-currency
          v-model="amount"
          class="form-input mt-1 block w-full text-sm border-indigo-600 focus:outline-indigo-100 focus:border-indigo-600"
        ></input-currency>
      </label>
      <button
        class="px-4 py-3 h-12 rounded error-btn text-white font-bold"
        @click="onCreateExchange"
      >
        Ban {{ selectedOrder.source_symbol }}
      </button>
    </div>
    <p class="text-xs text-subtitle mt-2">
      <strong>≈ {{ total | filterPriceMoney }}</strong>
      VNDS
    </p>
  </div>
</template>

<script>
import Big from 'big.js'
import { filterPriceMoney } from '@/filters'
import { mapActions, mapGetters } from 'vuex'
import InputCurrency from '@/components/ui/input-currency'
export default {
  name: 'ExchangeSell',
  filters: { filterPriceMoney },
  components: { InputCurrency },
  fetch() {
    this.loadDetailOrder()
  },
  data() {
    return {
      payment_method: 'VNDS',
      selectedAmountPercent: 0,
      amount: 0,
      amountPercent: [25, 50, 75, 100],
    }
  },
  computed: {
    ...mapGetters({
      selectedOrder: 'market/selectedOrder',
    }),
    total() {
      const price = Big(this.selectedOrder.price)

      // Big decimal: total = this.price * this.amount
      return this.amount ? price.times(this.amount).toNumber() : 0
    },
    orderAmount() {
      return this.selectedOrder.amount
    },
  },
  methods: {
    ...mapActions({
      addExchangesSell: 'market/addExchangesSell',
    }),
    loadDetailOrder() {
      this.amount = this.selectedOrder.remaining_amount
    },
    selectAmountPercent(percent) {
      const total = Big(this.orderAmount)

      const amount = total.times(percent).div(100)

      this.amount = amount.toNumber()
      this.selectedAmountPercent = percent
    },
    async onCreateExchange() {
      this.$notify.closeAll()

      const body = {
        amount: this.amount.toString(),
        order_id: this.selectedOrder.id,
      }

      try {
        this.loading = true
        await this.addExchangesSell(body)
        await this.$success({
          title: this.$t('success'),
          subtitle: this.$t('exchange-susscessful'),
          actionText: this.$t('pleaseReturnHomePage'),
          actionMethod: () => this.$router.push({ name: 'index' }),
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
  },
}
</script>
