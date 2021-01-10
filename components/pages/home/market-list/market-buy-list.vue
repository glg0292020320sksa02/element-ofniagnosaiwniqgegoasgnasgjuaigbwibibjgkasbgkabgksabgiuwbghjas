<template>
  <div
    class="relative bg-gray-100 p-6 rounded-lg flex flex-col justify-start items-stretch"
  >
    <div class="flex flex-row justify-between items-baseline py-4 px-1">
      <div class="flex flex-row justify-start items-end">
        <c-tab
          :value="activeTab"
          :items="tabs"
          @change="selectActiveTab($event)"
        ></c-tab>
      </div>
      <el-button
        size="small"
        class="bg-primary-100 text-primary border-none"
        @click="onRedirectWallet"
      >
        Tạo lệnh mua mới
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
          <div class="flex justify-center">
            <div class="w-1/2 p-2">
              <div
                class="text-center p-4 text-base text-primary font-bold border-b-2 border-primary"
              >
                {{ $t('createBuyOrder') }}
              </div>
            </div>
          </div>
        </template>
        <create-buy-order></create-buy-order>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { coin, sideRequestObj, side } from '@/utils/constant'
import OrderTable from '@/components/pages/home/order-table'
import CTab from '@/components/ui/control/c-tab'
import TableContentLoader from '@/components/common/table-content-loader'
import CreateBuyOrder from '@/components/pages/home/create-buy-order'

export default {
  components: {
    OrderTable,
    CTab,
    TableContentLoader,
    CreateBuyOrder,
  },
  fetch() {
    this.loadAllOrders()
  },
  data() {
    return {
      tabs: Object.values(coin).filter(item => item !== 'VNDS'),
      sides: Object.values(sideRequestObj),
      activeSide: side.SELL,
      orders: [],
      loading: false,
      showCreateOrder: false,
    }
  },
  computed: {
    ...mapGetters({
      activeTab: 'activeTab',
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
      this.selectActiveSide(this.activeSide)
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
