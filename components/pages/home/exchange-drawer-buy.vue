<template>
  <div
    class="exchange-drawer-buy p-6 flex flex-col justify-start items-stretch text-sm"
  >
    <div class="form">
      <div class="form-field mb-8">
        <label for="coin" class="font-bold text-gray-800 mb-1 inline-block">
          Price
        </label>
        <div class="relative">
          <el-input
            v-model="model.coin"
            name="coin"
            placeholder="Please input"
            class="text-sm"
          ></el-input>
          <span class="text-subtitle text-xs absolute price-unit">
            VNDS/BTC
          </span>
        </div>
      </div>
      <div class="form-field mb-8">
        <label for="coin" class="font-bold text-gray-800 mb-1 inline-block">
          Amount
        </label>
        <div class="relative">
          <el-input
            v-model="model.coin"
            name="coin"
            placeholder="Please input"
            class="text-sm"
          ></el-input>
          <span class="text-subtitle text-xs absolute price-unit">BTC</span>
        </div>
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
      <div class="form-field mb-8">
        <label for="coin" class="font-bold text-gray-800 mb-1 inline-block">
          Payment method
        </label>
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
            />
            <components
              :is="item.component"
              class="mr-1 ml-2 text-xs"
            ></components>
            <span>{{ item.name }}</span>
          </label>
        </div>
      </div>
    </div>
    <div class="action my-4 w-full">
      <el-button type="success" class="font-bold w-full shadow-lg">
        BUY BTC
      </el-button>
    </div>
  </div>
</template>
<script>
import { paymentMethods } from '@/utils/constant'

import IconVnds from '@/components/ui/icon/icon-vnds'
import IconVcb from '@/components/ui/icon/icon-vcb'
import IconTcb from '@/components/ui/icon/icon-tcb'
import IconPm from '@/components/ui/icon/icon-pm'
export default {
  name: 'ExchangeDrawerBuy',
  components: {
    IconVnds,
    IconVcb,
    IconTcb,
    IconPm,
  },
  data() {
    return {
      model: {
        coin: '',
        payment_method: '',
        amount: '',
      },
      paymentMethods,
      amountPercent: [25, 50, 75, 100],
      selectedAmountPercent: '',
    }
  },
}
</script>
<style>
.price-unit {
  top: 50%;
  right: 4px;
  transform: translateY(-50%);
}
</style>
