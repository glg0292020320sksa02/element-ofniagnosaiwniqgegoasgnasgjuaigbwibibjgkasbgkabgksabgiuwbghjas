<template>
  <div class="border rounded">
    <div class="border-b p-5 flex justify-between items-center">
      <h1 class="text-headline text-xl font-bold">
        {{ $t('bestPriceForYou') }}
      </h1>
      <div class="text-subtitle text-sm">
        {{ $t('min-buy') }} / {{ $t('max-sell') }}
      </div>
    </div>

    <div class="overflow-x-auto">
      <div class="table table-hover">
        <table>
          <thead class="text-sm">
            <tr>
              <th class="text-left">{{ $t('assets') }}</th>
              <th class="text-left">{{ $t('min-buy-price') }} ( VND)</th>
              <th class="text-left">{{ $t('max-sell-price') }} (VND)</th>
              <th class="text-center" width="200">{{ $t('action') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in sortedOrderList" :key="order.id">
              <td>
                <div class="flex flex-row justify-start align-baseline">
                  <img
                    src="https://s2.coinmarketcap.com/static/img/coins/32x32/1.png"
                    alt=""
                  />
                  <div class="pl-2">
                    <span>Bitcoin</span>
                    <span class="text-xs text-subtitle">BTC</span>
                  </div>
                </div>
              </td>
              <td>12.227.568,772</td>
              <td>16.227.568,772</td>
              <td class="text-center">
                <el-button type="success" size="mini" @click="onBuy">
                  {{ $t('buy') }}
                </el-button>
                <el-button type="danger" size="mini">
                  {{ $t('sell') }}
                </el-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MarketBestPrice',
  props: {
    orders: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    sortedOrderList() {
      return [...this.orders].sort((a, b) => Number(a.price) - Number(b.price))
    },
  },
  methods: {
    onBuy() {
      console.log('buy')
    },
  },
}
</script>
