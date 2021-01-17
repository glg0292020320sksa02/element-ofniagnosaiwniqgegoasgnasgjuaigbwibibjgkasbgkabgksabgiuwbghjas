<template>
  <div
    class="exchange-drawer-buy p-6 flex flex-col justify-start items-stretch text-sm"
  >
    <div class="form">
      <div class="form-field mb-8">
        <label for="price" class="font-bold text-gray-700 mb-2 inline-block">
          Price
        </label>
        <div class="relative">
          <el-input
            v-model="model.price"
            name="price"
            placeholder="Please input"
            class="text-sm"
          ></el-input>
          <span class="text-subtitle text-xs absolute price-unit">
            {{ targetSymbolByPaymentMethod }}/{{ selectedOrder.source_symbol }}
          </span>
        </div>
      </div>
      <div class="form-field mb-8">
        <label for="amount" class="font-bold text-gray-700 mb-2 inline-block">
          Amount
        </label>
        <div class="relative">
          <el-input
            v-model="model.amount"
            name="amount"
            placeholder="Please input"
            class="text-sm"
          ></el-input>
          <span class="text-subtitle text-xs absolute price-unit">
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
      </div>
      <div class="form-field mb-8">
        <label for="payment" class="font-bold text-gray-700 mb-2 inline-block">
          Payment method
        </label>
        <div
          class="rounded border border-b-0 overflow-hidden flex flex-col justify-start items-stretch"
        >
          <label
            v-for="(item, index) in activePaymentMethods"
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
            />
            <components
              :is="item.component"
              class="mr-1 ml-2 text-xs"
            ></components>
            <span>{{ item.name }}</span>
          </label>
        </div>
        <div class="text-subtitle text-right text-xs">
          Total:
          <strong>23,02920,20202 {{ targetSymbolByPaymentMethod }}</strong>
        </div>
      </div>
    </div>
    <div class="action my-4 w-full">
      <el-button type="danger" class="font-bold w-full shadow-lg">
        SELL BTC
      </el-button>
    </div>
  </div>
</template>
<script>
import Big from 'big.js'

import { mapGetters } from 'vuex'
import { paymentMethods } from '@/utils/constant'

import IconVnds from '@/components/ui/icon/icon-vnds'
import IconVcb from '@/components/ui/icon/icon-vcb'
import IconTcb from '@/components/ui/icon/icon-tcb'
import IconPm from '@/components/ui/icon/icon-pm'
export default {
  name: 'ExchangeDrawerSell',
  components: {
    IconVnds,
    IconVcb,
    IconTcb,
    IconPm,
  },
  fetch() {
    this.loadDefaultModel()
  },
  data() {
    return {
      model: {
        price: 0,
        amount: 0,
        payment_method: '',
      },
      amountPercent: [25, 50, 75, 100],
      paymentMethods,
      selectedAmountPercent: '',
    }
  },
  computed: {
    ...mapGetters({ selectedOrder: 'market/selectedOrder' }),
    activePaymentMethods() {
      return this.paymentMethods.filter(item => item.accept === 'ALL')
    },
    targetSymbolByPaymentMethod() {
      const selectedPaymentMethod = this.activePaymentMethods.find(
        item => item.value === this.model.payment_method
      )

      return selectedPaymentMethod?.symbol || 'VNDS'
    },
  },
  methods: {
    loadDefaultModel() {
      this.model.price = this.selectedOrder.price
      this.model.amount = this.selectedOrder.amount
      this.model.payment_method = this.activePaymentMethods[0].value
      this.selectedAmountPercent = 100
    },
    selectAmountPercent(percent) {
      const total = Big(this.selectedOrder.amount)

      const amount = total.times(percent).div(100)

      this.model.amount = amount.toNumber()
      this.selectedAmountPercent = percent
    },
  },
}
</script>
<style>
.price-unit {
  bottom: -75%;
  right: 4px;
}
</style>
