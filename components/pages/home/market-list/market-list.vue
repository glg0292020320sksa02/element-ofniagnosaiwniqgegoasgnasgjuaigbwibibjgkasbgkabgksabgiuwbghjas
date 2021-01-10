<template>
  <div
    class="relative bg-gray-100 p-6 rounded-lg flex flex-col justify-start items-stretch"
  >
    <div class="flex flex-row justify-between items-baseline py-4 px-1">
      <div class="flex flex-row justify-start items-end">
        <c-group-button
          :value="activeSide"
          class="mr-8"
          :items="sides"
          object
          @change="selectActiveSide($event)"
        ></c-group-button>
        <c-tab
          :value="activeTab"
          :items="tabsBySide"
          @change="selectActiveTab($event)"
        ></c-tab>
      </div>
      <el-button
        size="small"
        class="bg-primary-100 text-primary border-none"
        @click="onRedirectWallet"
      >
        {{ createOrderButtonLabel }}
      </el-button>
    </div>
    <table-content-loader
      v-if="$fetchState.pending || loading"
    ></table-content-loader>
    <div v-else>
      <order-table :orders="orderListFiltered" :side="activeSide"></order-table>
    </div>
    <div class="create-order">
      <el-dialog
        :visible.sync="showCreateOrder"
        :modal-append-to-body="false"
        width="450px"
        :show-close="false"
      >
        <template #title>
          <div class="flex">
            <div class="w-1/2 p-2" @click="selectActiveSide(side.SELL)">
              <div
                class="text-center p-4 text-subtitle text-base"
                :class="{
                  'text-primary font-bold border-b-2 border-primary': !isBuySide,
                  'text-subtitle cursor-pointer': isBuySide,
                }"
              >
                {{ $t('createBuyOrder') }}
              </div>
            </div>
            <div class="w-1/2 p-2" @click="selectActiveSide(side.BUY)">
              <div
                class="text-center p-4 text-base"
                :class="{
                  'text-primary font-bold border-b-2 border-primary': isBuySide,
                  'text-subtitle cursor-pointer': !isBuySide,
                }"
              >
                {{ $t('createSellOrder') }}
              </div>
            </div>
          </div>
        </template>
        <create-sell-order v-if="isBuySide"></create-sell-order>
        <create-buy-order v-else></create-buy-order>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { coin, sideRequestObj, side } from '@/utils/constant'
import OrderTable from '@/components/pages/home/order-table'
import CGroupButton from '@/components/ui/control/c-group-button'
import CTab from '@/components/ui/control/c-tab'
import TableContentLoader from '@/components/common/table-content-loader'
import CreateSellOrder from '@/components/pages/home/create-sell-order'
import CreateBuyOrder from '@/components/pages/home/create-buy-order'

export default {
  components: {
    OrderTable,
    CGroupButton,
    CTab,
    TableContentLoader,
    CreateSellOrder,
    CreateBuyOrder,
  },
  fetch() {
    this.loadAllOrders()
  },
  data() {
    return {
      tabs: Object.values(coin),
      sides: Object.values(sideRequestObj),
      side,
      orders: [],
      loading: false,
      showCreateOrder: false,
    }
  },
  computed: {
    ...mapGetters({
      activeTab: 'activeTab',
      activeSide: 'activeSide',
    }),
    orderListFiltered() {
      if (!this.orders.length) return []

      return this.orders
        .filter(order => order.type === this.activeSide)
        .filter(order => {
          const symbol = order?.wallet?.currency?.symbol

          return symbol === this.activeTab
        })
        .sort((a, b) => {
          return b.price - a.price
        })
    },
    createOrderButtonLabel() {
      return this.activeSide === 'BUY'
        ? this.$t('create-a-new-sell-order')
        : this.$t('create-a-new-buy-order')
    },
    tabsBySide() {
      return this.activeSide === 'BUY'
        ? this.tabs.filter(item => item !== 'VNDS')
        : this.tabs
    },
    isBuySide() {
      return this.activeSide === side.BUY
    },
  },
  methods: {
    ...mapActions({
      getAllOrders: 'market/getAllOrders',
      setActiveSide: 'setActiveSide',
      setActiveTab: 'setActiveTab',
    }),
    async loadAllOrders() {
      this.loading = true
      const { data } = await this.getAllOrders()

      this.loading = false
      this.orders = data
    },
    onRedirectWallet() {
      const targetSide = this.isBuySide ? side.BUY : side.SELL

      this.setActiveSide(targetSide)
      this.showCreateOrder = true
    },
    selectActiveSide(payload) {
      this.setActiveSide(payload)
    },
    selectActiveTab(payload) {
      this.setActiveTab(payload)
    },
  },
}
</script>
<style>
.create-order .el-dialog__body {
  padding-top: 0 !important;
}
</style>
