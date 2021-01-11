<template>
  <div class="exchange-sell text-sm">
    <div v-if="$auth.loggedIn">
      <div class="flex flex-row justify-end items-start">
        <label class="block mr-8">
          <div>
            <span class="text-subtitle text-xs">
              {{ $t('payment_method') }}
            </span>
          </div>
          <div class="flex flex-row justify-start items-end pt-6">
            <div
              v-for="(bank, index) in acceptPayment"
              :key="index + '_bank'"
              class="mr-4"
            >
              <el-tooltip
                class="item"
                effect="dark"
                :content="
                  $t('selectPaymentMethodInstruction', {
                    symbol: bank.name,
                  })
                "
                placement="top-start"
              >
                <label class="inline-flex items-center">
                  <input
                    v-model="payment_method"
                    type="radio"
                    class="form-radio text-base text-primary"
                    name="radio"
                    :value="bank.value"
                    checked
                  />
                  <span class="ml-2">{{ bank.name }}</span>
                </label>
              </el-tooltip>
            </div>
          </div>
        </label>
        <div>
          <div class="flex flex-row justify-end items-end">
            <label class="block mr-2">
              <div>
                <span class="text-subtitle text-xs">
                  Số lượng {{ selectedOrder.source_symbol }}
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
                class="form-input mt-1 block w-full text-sm border-subtitle focus:outline-primary-100 focus:border-body"
              ></input-currency>
            </label>
            <el-button
              type="success"
              class="uppercase font-bold text-xs py-4"
              :loading="loading"
              @click="onCreateExchange"
            >
              {{
                $t(`buyCoin`, {
                  symbol: selectedOrder.source_symbol,
                })
              }}
            </el-button>
          </div>
          <p class="text-xs text-subtitle mt-2">
            <strong>≈ {{ total | filterPriceMoney }}</strong>
            {{
              payment_method === 'VNDS' ? selectedOrder.target_symbol : 'VND'
            }}
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <button
        class="rounded px-4 py-2 text-primary text-xs bg-primary-50 flex flex-nowrap"
        @click="redirectToLogin"
      >
        {{ $t('requiredLogin') }}
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
  name: 'ExchangeSell',
  filters: { filterPriceMoney },
  components: { InputCurrency, IconArrowRight },
  fetch() {
    this.loadDetailOrder()
  },
  data() {
    return {
      payment_method: 'VCB',
      selectedAmountPercent: 0,
      amount: 0,
      paymentMethods: [
        { name: 'Vietcombank', value: 'VCB', icon: 'vietcom-bank.png' },
        { name: 'Techcombank', value: 'TCB', icon: 'techcom-bank.png' },
        { name: 'VNDS', value: 'VNDS', icon: 'vnds.png' },
        { name: 'PerfectMoney', value: 'PM', icon: 'vnds.png' },
      ],
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
    acceptPayment() {
      return this.paymentMethods.filter(item => {
        if (this.selectedOrder.source_symbol === 'VNDS') {
          return item.value !== 'VNDS'
        }

        return true
      })
    },
  },
  methods: {
    ...mapActions({
      addExchangesBuy: 'market/addExchangesBuy',
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
        payment_method: this.payment_method,
        amount: this.amount.toString(),
        order_id: this.selectedOrder.id,
      }

      try {
        this.loading = true
        const { payment_url: paymentUrl } = await this.addExchangesBuy(body)

        window.open(paymentUrl, '_blank')
        this.$router.push({ name: 'index' })
        this.$notify({
          title: this.$t('success'),
          message: this.$t('exchange-susscessful'),
          type: 'success',
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
