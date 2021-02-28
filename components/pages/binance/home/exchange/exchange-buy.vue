<template>
  <div class="exchange-buy h-full w-full">
    <div
      v-if="$auth.loggedIn"
      class="flex flex-col justify-between items-stretch"
    >
      <div class="flex-grow mb-6">
        <input-form
          :label="$t('IWantToPay')"
          :sub="amountFiatMinMax"
          class="mb-8"
        >
          <div class="relative">
            <input-currency
              v-model="model.fiat"
              @input="changeAmount"
            ></input-currency>
            <span class="absolute unitprice text-xs text-subtitle">
              {{ payUnit }}
            </span>
          </div>
        </input-form>
        <input-form
          :label="$t('IWillReceived')"
          :sub="amountMinMax"
          class="mb-6"
        >
          <div class="relative">
            <input-currency
              v-model="model.amount"
              @input="changeFiat"
            ></input-currency>
            <span class="absolute unitprice text-xs text-subtitle">
              {{ selectedOrder.source_symbol }}
            </span>
          </div>
          <div class="flex flex-row justify-end mt-1">
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
        </input-form>
        <input-form :label="$t('paymentMethod')" class="mb-6">
          <div
            class="rounded border border-b-0 overflow-hidden flex flex-col justify-start items-stretch"
          >
            <label
              v-for="(item, index) in paymentMethods"
              :key="index + 'paymentmethod'"
              class="p-3 border-b flex flex-row justify-start items-center"
              :class="{ 'bg-primary-50': item.value === model.payment_method }"
            >
              <input
                v-model="model.payment_method"
                type="radio"
                class="form-radio text-base text-primary"
                name="radio"
                :value="item.value"
                checked
                @change="selectPaymentMethod"
              />
              <components
                :is="item.component"
                class="mr-1 ml-2 text-xs"
              ></components>
              <span>{{ item.name }}</span>
            </label>
          </div>
        </input-form>
      </div>
      <div class="flex flex-row justify-between items-center">
        <el-button
          class="w-2/5 font-bold text-sm py-4"
          @click="$emit('cancel')"
        >
          {{ $t('Cancel') }}
        </el-button>
        <el-button
          type="success"
          class="w-3/5 font-bold text-sm py-4"
          :loading="loading"
          :disabled="!model || model.amount <= 0"
          @click="buyNow"
        >
          {{
            $t(`buyCoin`, {
              symbol: selectedOrder.source_symbol,
            })
          }}
        </el-button>
      </div>
    </div>
    <div v-else class="h-full w-full flex flex-row justify-center items-center">
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

import { mapGetters, mapActions } from 'vuex'

import { filterPriceFloat, filterPriceMoney } from '@/filters'

import InputCurrency from '@/components/ui/input-currency'
import InputForm from '@/components/pages/binance/home/input-form'
import IconVnds from '@/components/ui/icon/icon-vnds'
import IconVcb from '@/components/ui/icon/icon-vcb'
import IconTcb from '@/components/ui/icon/icon-tcb'
import IconPm from '@/components/ui/icon/icon-pm'
import IconUsdt from '@/components/ui/icon/icon-usdt'

import IconArrowRight from '@/components/ui/icon/icon-arrow-right'

export default {
  name: 'ExchangeBuy',
  components: {
    InputCurrency,
    InputForm,
    IconVnds,
    IconVcb,
    IconTcb,
    IconPm,
    IconUsdt,
    IconArrowRight,
  },
  props: {
    paymentMethods: {
      type: [Object, Array],
      required: true,
    },
  },
  data() {
    return {
      model: {
        amount: 0,
        payment_method: 'VCB',
        fiat: 0,
      },
      selectedAmountPercent: 0,
      loading: false,
      amountPercent: [25, 50, 75, 100],
      exchangeRate: 1,
    }
  },
  computed: {
    ...mapGetters({
      selectedOrder: 'binance/selectedOrder',
      walletList: 'wallet/walletList',
    }),
    orderAmount() {
      return this.selectedOrder.remaining_amount
    },
    targetWallet() {
      return this.walletList.find(
        item => item.currency.symbol === this.selectedOrder.source_symbol
      )
    },
    minAmount() {
      return 50000 / this.selectedOrder.price
    },

    maxAmount() {
      return this.selectedOrder.remaining_amount
    },
    minFiatAmount() {
      return 50000
    },
    maxFiatAmount() {
      return this.selectedOrder.remaining_total
    },
    amountMinMax() {
      return `${this.$t('Min')}:${filterPriceFloat(this.minAmount)} ${
        this.selectedOrder.source_symbol
      } | ${this.$t('Max')}: ${filterPriceFloat(this.maxAmount)} ${
        this.selectedOrder.source_symbol
      }`
    },
    amountFiatMinMax() {
      return `${this.$t('Min')}:${filterPriceMoney(this.minFiatAmount)} ${
        this.selectedOrder.target_symbol
      } | ${this.$t('Max')}: ${filterPriceMoney(this.maxFiatAmount)} ${
        this.selectedOrder.target_symbol
      }`
    },
    selectedPaymentMethod() {
      return this.paymentMethods.find(
        el => el.value === this.model.payment_method
      )
    },
    payUnit() {
      return this.selectedPaymentMethod?.unit || 'VND'
    },
  },
  methods: {
    ...mapActions({
      addExchangesBuy: 'binance/addExchangesBuy',
      getCurrentCurrencyPrice: 'market/getCurrentCurrencyPrice',
    }),
    selectAmountPercent(percent) {
      try {
        const total = Big(this.orderAmount)

        const amount = total.times(percent).div(100)

        this.model.amount = amount.toNumber()
        this.selectedAmountPercent = percent
        this.changeFiat()
      } catch (error) {}
    },
    async changeAmount() {
      try {
        const fiat = Big(this.model.fiat || 0)
        const price = Big(this.selectedOrder.price || 0)

        await this.loadCurrentRate()
        const rate = this.exchangeRate || 1

        this.model.amount = fiat.times(rate).div(price).toNumber()
      } catch (error) {}
    },
    async changeFiat() {
      try {
        const price = Big(this.selectedOrder.price)
        const amount = this.model.amount || 0

        await this.loadCurrentRate()

        const rate = this.exchangeRate || 1

        this.model.fiat = price.times(amount).div(rate).toNumber()

        if (this.payUnit === 'VND' || this.payUnit === 'VNDS') {
          this.model.fiat = this.model.fiat.toFixed()
        } else if (this.payUnit === 'USDT' || this.payUnit === 'PM') {
          this.model.fiat = this.model.fiat.toFixed(8)
        }
      } catch (error) {}
    },
    async buyNow() {
      this.$notify.closeAll()

      const body = {
        payment_method: this.model.payment_method,
        amount: this.model.amount.toString(),
        order_id: this.selectedOrder.id,
      }

      try {
        this.loading = true
        const { payment_url: paymentUrl } = await this.addExchangesBuy(body)

        if (
          this.model?.payment_method === 'VCB' ||
          this.model?.payment_method === 'TCB'
        ) {
          window.open(paymentUrl, '_blank')
        }

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
        this.$emit('cancel')
      }
    },
    redirectToLogin() {
      this.$router.push('/auth/login')
    },
    async loadCurrentRate() {
      try {
        const rate = await this.getCurrentCurrencyPrice(
          this.selectedPaymentMethod?.unit
        )

        this.exchangeRate = rate?.vnd_price
      } catch (error) {
        this.exchangeRate = 1
      }
    },
    selectPaymentMethod() {
      this.changeFiat()
    },
  },
}
</script>

<style>
.unitprice {
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
}
</style>
