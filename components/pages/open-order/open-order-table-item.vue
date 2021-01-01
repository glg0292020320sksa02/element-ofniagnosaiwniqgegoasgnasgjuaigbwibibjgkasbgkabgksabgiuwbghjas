<template>
  <div
    class="order-item border-b bg-white border-b-gray-200 transform transition-all duration-75 ease-in-out text-sm"
    :class="{ 'my-4 shadow-xl rounded-lg border': isExpand }"
  >
    <div
      class="flex flex-row justify-between items-stretch p-6 cursor-pointer"
      @click.stop="selectOrder(item)"
    >
      <div class="order-column w-1/12 flex items-center">
        <strong class="text-sm">#{{ item.id }}</strong>
      </div>
      <div class="order-column w-2/12 flex items-center">
        {{ item.created_at }}
      </div>
      <div class="order-column w-1/12 flex items-center">
        <strong class="text-sm">#{{ item.pair }}</strong>
      </div>
      <div class="order-column w-2/12 flex items-center justify-center">
        <span
          class="px-4 rounded-full font-bold"
          :class="getColorSide(item.side)"
        >
          {{ item.side }}
        </span>
      </div>
      <div class="order-column w-2/12 flex items-start flex-col justify-center">
        <div class="flex justify-start items-center">
          <strong>{{ item.amount | filterPrice }}</strong>
          <span class="ml-1 text-xs text-subtitle">
            {{ sourceSymbol(item.source_symbol) }}
          </span>
        </div>
        <div class="flex justify-start items-center text-xs">
          <span>{{ item.price | filterPriceMoney }}</span>
          <span class="ml-1 text-xs text-subtitle">
            {{
              `${targetSymbol(item.target_symbol)}/${sourceSymbol(
                item.source_symbol
              )}`
            }}
          </span>
        </div>
      </div>
      <div class="order-column w-1/12 flex items-center">
        <div class="w-24">
          <el-progress
            :percentage="Number(item.filled)"
            :width="100"
          ></el-progress>
        </div>
      </div>
      <div class="order-column w-2/12 flex items-center">
        <div class="flex justify-end items-center">
          <strong :class="getColorTotal(item.side)">
            {{ item.total | filterPrice }}
          </strong>
          <span class="ml-1 text-xs text-subtitle">
            {{ targetSymbol(item.target_symbol) }}
          </span>
        </div>
      </div>
      <div class="order-column w-1/12 flex items-center justify-end">
        <button
          class="rounded px-4 py-2 text-white font-bold text-xs bg-warning-50 text-warning"
          @click.stop="onCancelOrder(item.id)"
        >
          {{ $t('Cancel') }}
        </button>
      </div>
    </div>
    <div
      v-if="isExpand"
      class="expand border-t bg-gray-100 p-6 flex justify-center"
    >
      <div v-if="transTotal && transTotal > 0">
        {{ listTransactions }}
      </div>
      <div
        v-else
        class="flex flex-col justify-center items-center p-8 text-gray-300 w-full"
      >
        <div class="p-2 rounded-full bg-primary-50 mb-1">
          <icon-empty class="w-6 h-6 text-gray-300"></icon-empty>
        </div>
        <span class="text-xs">{{ $t('transNotFound') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { filterPrice, filterPriceMoney } from '@/filters'

import HoldingDeposit from '@/components/pages/holding/holding-deposit'
import HoldingWithdraw from '@/components/pages/holding/holding-withdraw'
import IconEmpty from '@/components/ui/icon/icon-empty'

export default {
  name: 'WalletsTableItem',
  filters: { filterPrice, filterPriceMoney },
  components: {
    IconEmpty,
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      loadTransaction: false,
      listTransactions: [],
      transTotal: 0,
    }
  },
  computed: {
    ...mapGetters({
      selectedOrder: 'market/selectedOrder',
    }),
    isExpand() {
      return this.selectedOrder?.id === this.item?.id
    },
  },
  methods: {
    ...mapActions({
      deleteOrder: 'market/deleteOrder',
      setSelectedOrder: 'market/setSelectedOrder',
      getAllOrderTransactions: 'market/getAllOrderTransactions',
    }),
    async selectOrder(payload) {
      if (this.isExpand) {
        this.setSelectedOrder(null)

        return
      }

      this.setSelectedOrder(payload)
      this.loadTransaction = true
      const { data, total } = await this.getAllOrderTransactions(payload.id)

      this.loadTransaction = false
      this.listTransactions = data
      this.transTotal = total
    },
    getColorSide(side) {
      return side.toLowerCase() === 'buy'
        ? 'text-success bg-success-100'
        : 'text-error bg-error-100'
    },
    sourceSymbol(source_symbol) {
      return source_symbol || ''
    },
    targetSymbol(target_symbol) {
      return target_symbol || ''
    },
    getColorTotal(side) {
      return side.toLowerCase() === 'buy' ? 'text-success' : 'text-error'
    },
    async onCancelOrder(id) {
      this.$notify.closeAll()

      const isConfirm = await this.confirmCancelOrder()

      if (!isConfirm) return

      try {
        await this.deleteOrder(id)
        this.$emit('reload')
        this.$notify({
          title: this.$t('cancel-order-success'),
          type: 'success',
        })
      } catch (e) {
        this.$notify({
          title: this.$t('cancel-order-failure'),
          message: this.$t('pleaseTryAgain'),
          type: 'error',
        })
      }
    },
    async confirmCancelOrder() {
      try {
        return await this.$confirm(
          this.$t('confirm-cancel-order'),
          this.$t('warning'),
          {
            confirmButtonText: this.$t('agree'),
            cancelButtonText: this.$t('cancel'),
            type: 'warning',
          }
        )
      } catch {
        return false
      }
    },
  },
}
</script>

<style></style>
