<template>
  <div
    class="relative bg-gray-100 p-6 rounded-lg flex flex-col justify-start items-stretch"
  >
    <div class="flex flex-row justify-between items-baseline py-4 px-1">
      <div class="flex flex-row justify-start items-end">
        <c-group-button
          v-model="activeSide"
          class="mr-8"
          :items="sides"
          object
        ></c-group-button>
        <c-tab v-model="activeTab" :items="tabs"></c-tab>
      </div>
      <el-button
        size="small"
        class="bg-indigo-100 text-primary border-none"
        @click="onRedirectWallet"
      >
        {{ $t('create-a-new-buy-order') }}
      </el-button>
    </div>
    <order-table></order-table>
  </div>
</template>
<script>
import OrderTable from '@/components/pages/home/order-table'
import CGroupButton from '@/components/ui/control/c-group-button'
import CTab from '@/components/ui/control/c-tab'

export default {
  components: {
    OrderTable,
    CGroupButton,
    CTab,
  },
  data() {
    return {
      tabs: ['BTC', 'ETH', 'XRP', 'USDT', 'VNDS'],
      sides: [
        { text: 'Buy', value: 'BUY' },
        { text: 'Sell', value: 'SELL' },
      ],
      activeSide: ' BUY',
      activeTab: 'BTC',
    }
  },
  methods: {
    onRedirectWallet() {},
  },
}
</script>
