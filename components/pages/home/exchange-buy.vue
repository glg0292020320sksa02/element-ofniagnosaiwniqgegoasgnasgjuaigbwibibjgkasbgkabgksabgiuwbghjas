<template>
  <div class="exchange-sell text-sm">
    <div class="flex flex-row justify-end items-start">
      <label class="block mr-8">
        <div>
          <span class="text-subtitle text-xs">Phương thức thanh toán</span>
        </div>
        <div class="flex flex-row justify-start items-end pt-6">
          <div
            v-for="(bank, index) in paymentMethods"
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
                  class="form-radio text-primary"
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
              <span class="text-subtitle text-xs">Số lượng</span>
              <button
                class="text-xxs rounded-full px-2 bg-indigo-100 text-primary"
              >
                25%
              </button>
              <button
                class="text-xxs rounded-full px-2 bg-indigo-100 text-primary"
              >
                50%
              </button>
              <button
                class="text-xxs rounded-full px-2 bg-indigo-100 text-primary"
              >
                75%
              </button>
              <button
                class="text-xxs rounded-full px-2 bg-indigo-100 text-primary"
              >
                MAX
              </button>
            </div>
            <input
              class="form-input mt-1 block w-full text-sm border-indigo-600 focus:outline-indigo-100 focus:border-indigo-600"
              placeholder="0,0000 BTC"
            />
          </label>
          <button class="px-4 py-2 rounded success-btn text-white font-bold">
            Xác nhận
          </button>
        </div>
        <p class="text-xs text-subtitle mt-2">
          <strong>≈ 23,0290101.02020</strong>
          VNDS
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExchangeSell',
  data() {
    return {
      payment_method: 'VCB',
      paymentMethods: [
        { name: 'Vietcombank', value: 'VCB', icon: 'vietcom-bank.png' },
        { name: 'Techcombank', value: 'TCB', icon: 'techcom-bank.png' },
        { name: 'VNDS', value: 'VNDS', icon: 'vnds.png' },
      ],
    }
  },
}
</script>
